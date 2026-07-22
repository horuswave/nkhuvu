"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Check, Loader2, ArrowLeft, CalendarDays, MapPin, Clock, Palette, User } from "lucide-react";

const FONT_DISPLAY_OPTIONS = [
  "Cormorant Garamond",
  "Playfair Display",
  "EB Garamond",
  "Libre Baskerville",
];
const FONT_BODY_OPTIONS = ["Jost", "Lato", "DM Sans", "Nunito"];

export default function CreateEventPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "branding" | "review">("details");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Event fields
  const [title, setTitle] = useState("");
  const [coupleNames, setCoupleNames] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("6:00 PM");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [dressCode, setDressCode] = useState("");
  const [message, setMessage] = useState("");
  const [rules, setRules] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportPhone, setSupportPhone] = useState("");

  // Branding
  const [primaryColor, setPrimaryColor] = useState("#c8890e");
  const [accentColor, setAccentColor] = useState("#0e0b07");
  const [bgStyle, setBgStyle] = useState<"DARK" | "LIGHT" | "IMAGE">("DARK");
  const [fontDisplay, setFontDisplay] = useState("Cormorant Garamond");
  const [fontBody, setFontBody] = useState("Jost");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      // This will be replaced with actual API call to create event
      // For now, simulate the creation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // After successful creation, redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Header */}
      <header className="bg-white border-b border-stone-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <h1 className="text-xl font-semibold text-stone-900">Create Your Event</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {[
              { key: "details", label: "Details", icon: CalendarDays },
              { key: "branding", label: "Branding", icon: Palette },
              { key: "review", label: "Review", icon: Check },
            ].map((s, index) => {
              const isCurrent = step === s.key;
              const isPast = ["details", "branding", "review"].indexOf(step) > index;
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
                      {isPast ? <Check size={16} /> : <s.icon size={18} />}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isCurrent ? "text-amber-600" : isPast ? "text-emerald-600" : "text-stone-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {index < 2 && (
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

        <form onSubmit={handleSubmit}>
          {/* Details Step */}
          {step === "details" && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CalendarDays className="text-amber-500" />
                  Event Details
                </CardTitle>
                <CardDescription>
                  Tell us about your special day
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Golden Anniversary Celebration"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="coupleNames">Couple Names *</Label>
                    <Input
                      id="coupleNames"
                      value={coupleNames}
                      onChange={(e) => setCoupleNames(e.target.value)}
                      placeholder="João & Maria"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="6:00 PM"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Quinta das Flores"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Rua das Rosas 123, Lisboa"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="mapUrl">Google Maps URL</Label>
                    <Input
                      id="mapUrl"
                      value={mapUrl}
                      onChange={(e) => setMapUrl(e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dressCode">Dress Code</Label>
                    <Input
                      id="dressCode"
                      value={dressCode}
                      onChange={(e) => setDressCode(e.target.value)}
                      placeholder="Black tie optional"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={supportEmail}
                      onChange={(e) => setSupportEmail(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input
                      id="supportPhone"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Invitation Message</Label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="The message guests will read on their invitation…"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 bg-white mt-2"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="rules">Rules / Good to Know</Label>
                    <textarea
                      id="rules"
                      rows={4}
                      value={rules}
                      onChange={(e) => setRules(e.target.value)}
                      placeholder="• One rule per line"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 bg-white mt-2"
                      style={{ resize: "vertical" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Branding Step */}
          {step === "branding" && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Palette className="text-amber-500" />
                  Branding
                </CardTitle>
                <CardDescription>
                  Customize the look and feel of your invitation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Colour</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-10 h-10 rounded border border-stone-200 cursor-pointer"
                      />
                      <Input
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        placeholder="#c8890e"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent / Background Colour</Label>
                    <div className="flex items-center gap-3 mt-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-10 h-10 rounded border border-stone-200 cursor-pointer"
                      />
                      <Input
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        placeholder="#0e0b07"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bgStyle">Background Style</Label>
                    <select
                      id="bgStyle"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 bg-white mt-2"
                      value={bgStyle}
                      onChange={(e) => setBgStyle(e.target.value as any)}
                    >
                      <option value="DARK">Dark (coloured background)</option>
                      <option value="LIGHT">Light (white / cream)</option>
                      <option value="IMAGE">Image (hero photo)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="fontDisplay">Display Font (headings)</Label>
                    <select
                      id="fontDisplay"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 bg-white mt-2"
                      value={fontDisplay}
                      onChange={(e) => setFontDisplay(e.target.value)}
                    >
                      {FONT_DISPLAY_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="fontBody">Body Font</Label>
                    <select
                      id="fontBody"
                      className="w-full px-4 py-2.5 border border-stone-200 rounded text-sm focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-200 bg-white mt-2"
                      value={fontBody}
                      onChange={(e) => setFontBody(e.target.value)}
                    >
                      {FONT_BODY_OPTIONS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Live preview */}
                <div className="rounded-lg overflow-hidden border border-stone-200">
                  <div
                    className="px-8 py-12 text-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <p
                      style={{
                        fontFamily: fontBody,
                        color: primaryColor,
                        fontSize: "0.65rem",
                        letterSpacing: "0.3em",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                      }}
                    >
                      You are cordially invited
                    </p>
                    <p
                      style={{
                        fontFamily: fontDisplay,
                        color: bgStyle !== "LIGHT" ? "#faf7ef" : "#1a1a1a",
                        fontSize: "2.5rem",
                        fontWeight: 400,
                        lineHeight: 1.1,
                      }}
                    >
                      {coupleNames || "Names Here"}
                    </p>
                    <p
                      style={{
                        fontFamily: fontDisplay,
                        color: primaryColor,
                        fontSize: "1.1rem",
                        fontStyle: "italic",
                        marginTop: "0.5rem",
                      }}
                    >
                      {title || "Event Title"}
                    </p>
                  </div>
                  <div className="px-8 py-4 bg-white text-center border-t border-stone-100">
                    <p
                      style={{
                        fontFamily: fontBody,
                        color: "#888",
                        fontSize: "0.75rem",
                      }}
                    >
                      {venue || "Venue"} · {date || "Date"} · {time}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Step */}
          {step === "review" && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Check className="text-amber-500" />
                  Review & Create
                </CardTitle>
                <CardDescription>
                  Review your event details before creating
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-stone-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Event Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-stone-600">Title:</span>
                        <span className="font-medium">{title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Couple:</span>
                        <span className="font-medium">{coupleNames}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Date:</span>
                        <span className="font-medium">{date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Time:</span>
                        <span className="font-medium">{time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-600">Venue:</span>
                        <span className="font-medium">{venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-stone-200 pt-4">
                    <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wide mb-2">
                      Branding
                    </h3>
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-lg border border-stone-200"
                        style={{ backgroundColor: primaryColor }}
                        title="Primary"
                      />
                      <div
                        className="w-12 h-12 rounded-lg border border-stone-200"
                        style={{ backgroundColor: accentColor }}
                        title="Accent"
                      />
                      <div>
                        <p className="text-sm font-medium">{fontDisplay}</p>
                        <p className="text-xs text-stone-500">{fontBody}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="bg-amber-50 border-amber-200">
                  <AlertDescription className="text-amber-800">
                    After creating your event, you'll be able to add guests, manage RSVPs, and customize further settings from your dashboard.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8">
            {step !== "details" && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (step === "branding") setStep("details");
                  if (step === "review") setStep("branding");
                }}
              >
                Back
              </Button>
            )}
            <div className="flex-1" />
            {step === "details" && (
              <Button
                type="button"
                onClick={() => setStep("branding")}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Continue to Branding
              </Button>
            )}
            {step === "branding" && (
              <Button
                type="button"
                onClick={() => setStep("review")}
                className="bg-amber-500 hover:bg-amber-600"
              >
                Review & Create
              </Button>
            )}
            {step === "review" && (
              <Button
                type="submit"
                disabled={saving}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? <Loader2 className="animate-spin mr-2" /> : null}
                Create Event
              </Button>
            )}
          </div>

          {error && (
            <Alert className="mt-4 bg-red-50 border-red-200">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </main>
    </div>
  );
}
