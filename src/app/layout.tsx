import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { CustomCursor } from "@/components/animations/CustomCursor";
import { PageLoader } from "@/components/animations/PageLoader";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blueboxx Business Solutions | Premium Technology Partner",
  description: "Enterprise-level technology and business growth solutions for startups, SMEs, and enterprises.",
  keywords: ["technology partner", "software development", "AI automation", "CRM solutions", "ERP solutions", "Blueboxx"],
  openGraph: {
    title: "Blueboxx Business Solutions | Premium Technology Partner",
    description: "Enterprise-level technology and business growth solutions for startups, SMEs, and enterprises.",
    url: "https://blueboxx.com", // Placeholder
    siteName: "Blueboxx",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blueboxx Business Solutions",
    description: "Enterprise-level technology and business growth solutions.",
  },
  robots: {
    index: true,
    follow: true,
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Blueboxx Business Solutions",
  "description": "Enterprise-level technology and business growth solutions.",
  "url": "https://blueboxx.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <PageLoader />
        <CustomCursor />
        <AnimationProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </AnimationProvider>
      </body>
    </html>
  );
}
