import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";

import { Nunito, Fredoka } from "next/font/google";

const body = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

const display = Fredoka({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Exploring with Heidi - Family Geography Adventures",
    template: "%s | Exploring with Heidi",
  },
  description:
    "Playful geography adventures for children and families: flags, capitals, maps, and Hunting Heidi.",
  icons: {
    icon: "/branding/app-icon.png",
  },
  openGraph: {
    title: "Exploring with Heidi - Family Geography Adventures",
    description:
      "Playful geography adventures for children and families. Explore flags, capitals, maps, and more.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/branding/logo-badge.png",
        width: 1200,
        height: 630,
        alt: "Exploring with Heidi",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable} flex min-h-screen flex-col font-body text-ui-charcoal antialiased`}>
        <Header />
        <div id="site-main" className="flex flex-1 flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
