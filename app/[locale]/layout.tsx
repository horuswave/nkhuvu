// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { locales } from "@/i18n/routing";
import "./globals.css";
import en from "@/messages/en.json";
import pt from "@/messages/pt.json";
import SessionProvider from "@/components/SessionProvider";

const messages: Record<string, any> = { en, pt };

export const metadata: Metadata = {
  title: "Nkhuvu",
  description: "Nkhuvu is a wedding invitation builder that helps you create beautiful and personalized invitations for your special day.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
