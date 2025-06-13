import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
// import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/auth-provider";
import { CartProvider } from "@/modules/cart/context/cart-context";
import { CheckoutProvider } from "@/modules/checkout/context/checkout-context";
import { satoshi } from "./(pages)/fonts";
import Footer from "@/components/footer/footer";
import { LanguageProvider } from "@/hooks/LanguageContext";
import Header from "@/components/header/header";
import MessengerChatWrapper from "@/components/MessengerChat/MessengerChatWrapper";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CLIENT_URL || "https://myhunter.ge"
  ),
  title: "MyHunter",
  description: "საუკეთესო სანადირო და სათევზაო აღჭურვილობა",
  openGraph: {
    type: "website",
    locale: "ka_GE",
    url: "https://myhunter.ge/",
    siteName: "MyHunter",
    title: "MyHunter",
    images: [
      {
        url: "/van%20gog.jpg",
        width: 1200,
        height: 630,
        alt: "MyHunter Sharing Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyHunter",
    description: "სანადირო და სათევზაო აღჭურვილობის საუკეთესო არჩევანი",
    images: ["/mainImage.png"],
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
        {/* Facebook SDK */}
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v13.0&appId=${process.env.NEXT_PUBLIC_FACEBOOK_APP_ID}&autoLogAppEvents=1`}
        />
        {/* Remove the problematic prefetch links */}
        {/* Add Google Fonts link */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${satoshi.variable} antialiased min-h-screen flex flex-col`}
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
