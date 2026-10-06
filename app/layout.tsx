import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AdProvider, AnchorAd } from "@/components/ads";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim();

export const metadata: Metadata = {
  title: "Job Platform",
  description: "Production-grade job discovery and career platform",
  other: adsenseClientId
    ? {
        "google-adsense-account": adsenseClientId,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-xl focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring font-medium text-sm transition-all"
        >
          Skip to main content
        </a>
        <AdProvider>
          {children}
          <AnchorAd slotId="global-mobile-anchor" />
        </AdProvider>
      </body>
    </html>
  );
}

