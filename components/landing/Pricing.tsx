import { Check } from "lucide-react";
import Link from "next/link";

const PACKAGES = [
  {
    name: "Starter",
    price: 15000,
    currency: "MZN",
    description: "Perfect for intimate celebrations",
    features: [
      "1 Event",
      "Up to 50 guests",
      "Basic customization",
      "Email invitations",
      "RSVP tracking",
      "1 month support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 30000,
    currency: "MZN",
    description: "Ideal for medium-sized weddings",
    features: [
      "3 Events",
      "Up to 200 guests",
      "Advanced customization",
      "Email & SMS invitations",
      "RSVP tracking",
      "Table management",
      "Gift registry",
      "3 months support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 60000,
    currency: "MZN",
    description: "For large-scale celebrations",
    features: [
      "Unlimited Events",
      "Unlimited guests",
      "Full white-label customization",
      "Email, SMS & WhatsApp invitations",
      "Advanced RSVP analytics",
      "Table & seating management",
      "Gift registry",
      "Priority support",
      "Custom domain",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 px-6 bg-gradient-to-b from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Choose the perfect package for your special day. No hidden fees, no
            surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-2xl p-8 ${
                pkg.popular
                  ? "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-2xl scale-105"
                  : "bg-white shadow-lg border border-stone-200"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    pkg.popular ? "text-white" : "text-stone-900"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    pkg.popular ? "text-amber-100" : "text-stone-600"
                  }`}
                >
                  {pkg.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      pkg.popular ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {pkg.currency === "KES" ? "KES " : ""}
                    {pkg.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex-shrink-0 ${
                        pkg.popular ? "text-amber-200" : "text-amber-600"
                      }`}
                    >
                      <Check size={18} />
                    </div>
                    <span
                      className={`text-sm ${
                        pkg.popular ? "text-amber-50" : "text-stone-700"
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/pricing/checkout"
                className={`block w-full text-center py-3 px-6 rounded-xl font-semibold transition-all ${
                  pkg.popular
                    ? "bg-white text-amber-600 hover:bg-amber-50"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-stone-600 text-sm">
            All packages include secure payment processing via M-Pesa. Need a
            custom solution?{" "}
            <Link href="/contact" className="text-amber-600 hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
