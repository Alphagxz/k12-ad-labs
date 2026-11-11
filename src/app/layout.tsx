import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Inter_Tight } from "next/font/google";
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
const display = Inter_Tight({ variable: "--font-display", weight: ["500", "600", "700"], subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Creative Production Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "creative production studio",
    "brand films",
    "commercial production",
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
    title: `${site.name} — Creative Production Studio`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Creative Production Studio`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f5f4f9" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} ${serif.variable}`}>
      <body>
        <div className="ambient" aria-hidden>
          <span /><span /><span /><span />
        </div>
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
