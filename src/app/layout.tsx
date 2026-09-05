import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "./providers";
import { StructuredData } from "@/components/site/structured-data";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://appcraft.in"),
  title: { default: "AppCraft Technology | Product Engineering", template: "%s | AppCraft Technology" },
  description: "AppCraft Technology is a New Delhi product engineering company that builds production iOS, Android, and web products.",
  applicationName: "AppCraft Technology",
  authors: [{ name: "AppCraft Technology" }],
  keywords: ["product engineering company", "mobile app development", "web application development", "New Delhi"],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "en_IN", url: "https://appcraft.in/", siteName: "AppCraft Technology", title: "AppCraft Technology | Product Engineering", description: "Production iOS, Android, and web products for international clients." },
  twitter: { card: "summary", title: "AppCraft Technology | Product Engineering", description: "Production iOS, Android, and web products for international clients." },
  other: {
    "color-scheme": "light",
  },
  icons: {
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180" }],
  },
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    themeColor: "#FDFDFE",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap"
        />
        {/* Google tag (gtag.js) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-P17J6JE7LD" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P17J6JE7LD');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "y71z2l21bo");
          `}
        </Script>
      </head>
      <body>
        <StructuredData />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
