import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GlassFilters } from "@/components/glass/GlassFilters";
import { VideoProvider } from "@/components/video/VideoPlayer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollTop } from "@/components/layout/ScrollTop";
import { Intro } from "@/components/layout/Intro";
import { introScript } from "@/lib/intro";
import { company } from "@/lib/content";

// Self-hosted (OFL): no build-time fetch, no third-party request from visitors.
const archivo = localFont({
  src: "./fonts/archivo-var.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BTP Digital Tech · Bureau d'études & construction à Douala",
    template: "%s · BTP Digital Tech",
  },
  description:
    "Étude de structure, conception, réalisation clés en main et formation aux logiciels BTP à Douala, Cameroun.",
  openGraph: {
    type: "website",
    locale: "fr_CM",
    siteName: company.name,
    images: [{ url: "/media/logo.jpg", width: 720, height: 720, alt: company.name }],
  },
  icons: { icon: "/media/logo.jpg" },
};

export const viewport: Viewport = {
  themeColor: "#ebe8e2",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: company.legal,
  image: `${siteUrl}/media/logo.jpg`,
  telephone: company.phone,
  email: company.email,
  address: { "@type": "PostalAddress", addressLocality: "Douala", addressCountry: "CM" },
  areaServed: ["Douala", "Edéa", "Yaoundé", "Cameroun"],
  sameAs: [company.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body className="min-h-svh bg-concrete text-ink">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <Intro />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-yellow focus:px-5 focus:py-3 focus:font-bold"
        >
          Aller au contenu
        </a>
        <GlassFilters />
        <SmoothScroll>
          <VideoProvider>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <ScrollTop />
          </VideoProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
