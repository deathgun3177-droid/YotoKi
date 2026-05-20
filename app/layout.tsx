import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/components/auth-provider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoto-ki.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "YotoKi | Монгол хадмалтай аниме, кино",
  description: "Монгол хэрэглэгчдэд зориулсан хөнгөн, орчин үеийн аниме болон кино үзэх платформ.",
  applicationName: "YotoKi",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/yotoki-icon-192.png",
    apple: "/images/yotoki-icon-192.png"
  },
  openGraph: {
    title: "YotoKi",
    description: "Монгол хадмалтай аниме, кино үзэх хөнгөн платформ.",
    url: siteUrl,
    siteName: "YotoKi",
    images: [
      {
        url: "/images/yotoki-logo.png",
        width: 1024,
        height: 1024,
        alt: "YotoKi logo"
      }
    ],
    locale: "mn_MN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "YotoKi",
    description: "Монгол хадмалтай аниме, кино үзэх хөнгөн платформ.",
    images: ["/images/yotoki-logo.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
