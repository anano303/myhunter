import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
// import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";

import { satoshi } from "./(pages)/fonts";
import Footer from "@/components/footer/footer";
import { LanguageProvider } from "@/hooks/LanguageContext";
import Header from "@/components/header/header";
import MessengerChatWrapper from "@/components/MessengerChat/MessengerChatWrapper";
import { CartProvider } from "@/modules/cart/context/cart-context";
import { CheckoutProvider } from "@/modules/checkout/context/checkout-context";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://myhunter.ge"
  ),
  title: "MyHunter - სანადირო და სათევზაო აღჭურვილობის მაღაზია საქართველოში",
  description:
    "საუკეთესო სანადირო და სათევზაო აღჭურვილობა, თოვლისთვის, შოტლანდისთვის, ნაცარი პროდუქტები. ხარისხი, სანდოობა, ფასი. Best hunting and fishing equipment in Georgia",
  keywords: [
    "სანადირო",
    "სათევზაო",
    "აღჭურვილობა",
    "მაღაზია",
    "MyHunter",
    "მაიჰანტერი",
    "საქართველო",
    "hunting",
    "fishing",
    "equipment",
    "store",
    "Georgia",
    "outdoor",
    "gear",
  ],
  authors: [{ name: "MyHunter" }],
  creator: "MyHunter",
  publisher: "MyHunter",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://myhunter.ge",
    languages: {
      ka: "https://myhunter.ge",
      en: "https://myhunter.ge/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://myhunter.ge/",
    siteName: "MyHunter",
    title: "MyHunter - სანადირო და სათევზაო აღჭურვილობის მაღაზია საქართველოში",
    description:
      "საუკეთესო სანადირო და სათევზაო აღჭურვილობა, თოვლისთვის, შოტლანდისთვის, ნაცარი პროდუქტები. ხარისხი, სანდოობა, ფასი",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MyHunter - სანადირო და სათევზაო აღჭურვილობის მაღაზია",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyHunter - სანადირო და სათევზაო აღჭურვილობის მაღაზია",
    description:
      "სანადირო და სათევზაო აღჭურვილობის საუკეთესო არჩევანი საქართველოში",
    images: ["/logo.png"],
  },
  verification: {
    google: "your-google-verification-code", // ამას თქვენ შეცვლით
  },
  other: {
    "geo.region": "GE",
    "geo.placename": "Georgia",
    "geo.position": "41.7151;44.8271",
    ICBM: "41.7151, 44.8271",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Favicon links */}
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="mask-icon" href="/logo.png" color="#000000" />
        <meta name="msapplication-TileImage" content="/logo.png" />
        {/* Facebook SDK - Fix appId to lowercase appid */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appid=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`}
        />
        {/* Remove the problematic prefetch links */}
        {/* Add Google Fonts link */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
      </head>
      <body
        className={`${satoshi.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
        style={{ maxWidth: "100vw" }}
      >
        {/* <LandingPage /> */}
        <Providers>
          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <LanguageProvider>
                  {/* <SiteTimer /> */}
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </LanguageProvider>
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </Providers>
        <MessengerChatWrapper />
      </body>
    </html>
  );
}
