"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Loader2, ArrowLeft, Mail, Lock, User, CreditCard } from "lucide-react";
import { sendOtpToEmail, verifyOtpCode } from "@/actions/otp";
import { processCheckout } from "@/actions/subscriptions";
import { processMpesaCheckoutPayment } from "@/actions/mpesa";
import { getMsisdnValidationMessage } from "@/lib/mpesa-validation";
import { signIn } from "next-auth/react";

const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    price: 15000,
    currency: "MZN",
    features: ["1 Event", "Up to 50 guests", "Basic customization"],
  },
  {
    id: "professional",
    name: "Professional",
    price: 30000,
    currency: "MZN",
    features: ["3 Events", "Up to 200 guests", "Advanced customization"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 60000,
    currency: "MZN",
    features: ["Unlimited Events", "Unlimited guests", "Full customization"],
  },
];

type Step = "package" | "verify" | "account" | "payment" | "complete";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const [step, setStep] = useState<Step>("package");
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[1]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await sendOtpToEmail(email);
      if (result.success) {
        setOtpSent(true);
      } else {
        setError(result.error || "Failed to send OTP");
      }
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await verifyOtpCode(email, otp);
      if (result.success) {
        setOtpVerified(true);
        setStep("account");
      } else {
        setError(result.error || "Invalid or expired code");
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    const phoneError = getMsisdnValidationMessage(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }
    setError(null);
    setStep("payment");
  }

  async function handleMpesaPayment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentResult = await processMpesaCheckoutPayment({
        phone,
        amount: selectedPackage.price,
        packageName: selectedPackage.name,
        email,
      });

      if (!paymentResult.success) {
        throw new Error(paymentResult.error || "Payment failed");
      }

      await processCheckout({
        name,
        email,
        passwordRaw: password,
        packageName: selectedPackage.name,
        mpesaTransactionId: paymentResult.transactionId,
      });

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error("Account created but failed to auto-login. Please login manually.");
      }

      router.push(`/${locale}/admin/onboarding`);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress steps */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { key: "package", label: "Package" },
              { key: "verify", label: "Verify Email" },
              { key: "account", label: "Account" },
              { key: "payment", label: "Payment" },
            ].map((s, index) => {
              const isCurrent = step === s.key;
              const isPast = ["package", "verify", "account", "payment", "complete"].indexOf(step) > index;
              return (
                <div key={s.key} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${
                        isCurrent
                          ? "bg-amber-500 text-white"
                          : isPast
                          ? "bg-emerald-500 text-white"
                          : "bg-stone-200 text-stone-500"
                      }`}
                    >
                      {isPast ? <Check size={16} /> : index + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isCurrent ? "text-amber-600" : isPast ? "text-emerald-600" : "text-stone-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 ${
                        isPast ? "bg-emerald-500" : "bg-stone-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Package Selection */}
        {step === "package" && (
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Package</CardTitle>
              <CardDescription>
                Select the perfect package for your special day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPackage.id === pkg.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{pkg.name}</h3>
                    <p className="text-2xl font-bold text-stone-900 mb-4">
                      {pkg.currency} {pkg.price.toLocaleString()}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="text-sm text-stone-600 flex items-center gap-2">
                          <Check size={14} className="text-emerald-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => setStep("verify")}
                className="w-full bg-amber-500 hover:bg-amber-600"
                size="lg"
              >
                Continue to Email Verification
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Email Verification */}
        {step === "verify" && (
          <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Mail className="text-amber-500" />
                Verify Your Email
              </CardTitle>
              <CardDescription>
                We'll send a verification code to your email
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    size="lg"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Send Verification Code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <Label htmlFor="otp">Verification Code</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="mt-2 text-center text-2xl tracking-widest"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600"
                    size="lg"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : "Verify Code"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOtpSent(false)}
                    className="w-full"
                  >
                    Change email
                  </Button>
                </form>
              )}
              {error && (
                <Alert className="mt-4 bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Account Creation */}
        {step === "account" && (
          <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <User className="text-amber-500" />
                Create Your Account
              </CardTitle>
              <CardDescription>
                Set up your account details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number (for M-Pesa)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="258841234567 or 841234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Package:</strong> {selectedPackage.name}<br />
                    <strong>Amount:</strong> {selectedPackage.currency} {selectedPackage.price.toLocaleString()}
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600"
                  size="lg"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Continue to Payment"}
                </Button>
              </form>
              {error && (
                <Alert className="mt-4 bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Payment */}
        {step === "payment" && (
          <Card className="shadow-xl max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="text-amber-500" />
                Complete Payment
              </CardTitle>
              <CardDescription>
                Pay via M-Pesa to activate your subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleMpesaPayment} className="space-y-4">
                <div className="bg-stone-50 p-6 rounded-lg text-center">
                  <p className="text-sm text-stone-600 mb-2">Amount to Pay</p>
                  <p className="text-4xl font-bold text-stone-900">
                    {selectedPackage.currency} {selectedPackage.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-stone-500 mt-2">{selectedPackage.name} Package</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>M-Pesa Payment Instructions:</strong>
                  </p>
                  <ol className="text-sm text-green-700 mt-2 space-y-1 list-decimal list-inside">
                    <li>Check your phone for the M-Pesa prompt</li>
                    <li>Enter your M-Pesa PIN</li>
                    <li>Wait for payment confirmation</li>
                  </ol>
                </div>

                <div>
                  <Label htmlFor="payment-phone">M-Pesa Phone Number</Label>
                  <Input
                    id="payment-phone"
                    type="tel"
                    value={phone}
                    disabled
                    className="mt-2 bg-stone-50"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  {loading ? <Loader2 className="animate-spin" /> : "Pay with M-Pesa"}
                </Button>
              </form>
              {error && (
                <Alert className="mt-4 bg-red-50 border-red-200">
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}

        {/* Complete */}
        {step === "complete" && (
          <Card className="shadow-xl max-w-md mx-auto text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Check className="text-emerald-600" size={32} />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
              <CardDescription>
                Your account is now active
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-stone-50 p-4 rounded-lg">
                <p className="text-sm text-stone-600">
                  Welcome, {name}! Your {selectedPackage.name} package is now active.
                </p>
              </div>
              <Button
                onClick={() => router.push(`/${locale}/admin/dashboard`)}
                className="w-full bg-amber-500 hover:bg-amber-600"
                size="lg"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
