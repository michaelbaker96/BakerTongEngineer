import type { Metadata } from "next";
import { Cormorant_Garamond, Public_Sans } from "next/font/google";

import { EditorialShell } from "@/components/editorial-shell";

import "./globals.css";

const fallbackMetadataBaseUrl = "http://localhost:3000";

const resolveMetadataBase = (value: string) => {
  try {
    return new URL(value);
  } catch {
    return new URL(fallbackMetadataBaseUrl);
  }
};

const siteTitle = "Michael Baker-Tong | BakerTongEngineer";
const siteDescription =
  "Recruiter-facing portfolio for Michael Baker-Tong, a senior software engineer delivering scalable cloud architecture, distributed systems, AI-enabled data platforms, and full-stack product work.";

const publicSans = Public_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: resolveMetadataBase(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? fallbackMetadataBaseUrl
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "BakerTongEngineer",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="editorial-body min-h-full antialiased">
        <EditorialShell>{children}</EditorialShell>
      </body>
    </html>
  );
}
