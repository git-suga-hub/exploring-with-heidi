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

const siteUrl = "https://exploringwithheidi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Exploring with Heidi | Geography Games for Kids",
    template: "%s | Exploring with Heidi",
  },
  description:
    "Exploring with Heidi is a family-friendly geography games website for kids with flags, capitals, maps, and educational world challenges.",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/branding/app-icon.png",
  },
  openGraph: {
    title: "Exploring with Heidi | Geography Games for Kids",
    description:
      "Educational geography games for kids: learn world flags, practice capital cities, and play family-friendly map challenges.",
    type: "website",
    url: "/",
    siteName: "Exploring with Heidi",
    images: [
      {
        url: "/branding/logo-badge.png",
        width: 1200,
        height: 630,
        alt: "Exploring with Heidi geography games for kids",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exploring with Heidi | Geography Games for Kids",
    description:
      "Learn geography through playful flags, capitals, and map games made for children and families.",
    images: ["/branding/logo-badge.png"],
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
