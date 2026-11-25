import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PencilCursor from "@/components/PencilCursor";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: {
    default: "Bantugambar — Komisi Seni Manual: Sketsa, Lineart, Full Color",
    template: "%s · Bantugambar",
  },
  description:
    "Studio komisi seni manual. Sketsa pensil presisi, lineart tinta 0.1–0.5, dan pewarnaan marker. Dikerjakan tangan, dikirim aman ke seluruh Indonesia.",
  keywords: [
    "jasa gambar manual",
    "komisi sketsa",
    "lineart tinta",
    "ilustrasi marker",
    "commission art Indonesia",
  ],
  openGraph: {
    title: "Bantugambar — Komisi Seni Manual",
    description:
      "Sketsa pensil, lineart tinta, dan pewarnaan marker. Referensi visual yang dikerjakan tangan.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="paper-grain relative">
        <PencilCursor />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Analitik: Vercel Web Analytics (otomatis, tanpa ID) */}
        <Analytics />

        {/* Google Analytics 4 — aktif hanya jika NEXT_PUBLIC_GA_ID diisi */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
