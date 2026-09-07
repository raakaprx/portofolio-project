import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import "./globals.css";

import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://raakaprx.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Muhammad Raka Pradana | Full-Stack Web Developer",
    template: "%s | Muhammad Raka Pradana",
  },
  description:
    "Portofolio profesional Muhammad Raka Pradana — Full-Stack Web Developer berpengalaman dalam Next.js, Laravel, PostgreSQL, dan arsitektur web modern.",
  keywords: [
    "Muhammad Raka Pradana",
    "Full-Stack Developer",
    "Next.js",
    "Laravel",
    "Web Developer Indonesia",
    "Portfolio",
    "PostgreSQL",
    "TypeScript",
  ],
  authors: [{ name: "Muhammad Raka Pradana", url: siteUrl }],
  creator: "Muhammad Raka Pradana",
  openGraph: {
    title: "Muhammad Raka Pradana — Full-Stack Web Developer",
    description:
      "Eksplorasi proyek web modern, arsitektur data, dan pengalaman engineering Muhammad Raka Pradana.",
    url: "/",
    siteName: "Muhammad Raka Pradana Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Raka Pradana — Full-Stack Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Raka Pradana — Full-Stack Web Developer",
    description:
      "Eksplorasi proyek web modern, arsitektur data, dan pengalaman engineering Muhammad Raka Pradana.",
    images: ["/opengraph-image"],
    creator: "@raakaprx",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else if (savedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (_) {}
            `,
          }}
        />
        <ThemeProvider>
          <AnalyticsTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
