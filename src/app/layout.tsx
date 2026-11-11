import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/config/site";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollFX from "@/components/ScrollFX";
import { VideoProvider } from "@/components/VideoModal";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — AI Ads That Don't Look Like AI`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "AI advertising agency",
    "AI UGC",
    "AI commercials",
    "AI video production",
    "performance advertising",
    "product commercials",
    "social media creatives",
    "K12 Ad Labs",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — AI Ads That Don't Look Like AI`,
    description: site.subheadline,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Ads That Don't Look Like AI`,
    description: site.subheadline,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${serif.variable}`}>
      <body>
        <VideoProvider>
          <SmoothScroll />
          <Preloader />
          <Cursor />
          <Nav />
          <main>{children}</main>
          <Footer />
          <ScrollFX />
        </VideoProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
