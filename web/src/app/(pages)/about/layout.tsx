import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ჩვენს შესახებ - MyHunter გუნდი და ისტორია | MyHunter",
  description:
    "გაიცანით MyHunter-ის გუნდი და ჩვენი ისტორია, ვინ ვართ ჩვენ და რას გთავაზობთ. ვართ სანადირო და სათევზაო აღჭურვილობის ლიდერი საქართველოში. Meet MyHunter team and our story.",
  keywords: [
    "ჩვენს შესახებ",
    "MyHunter გუნდი",
    "ისტორია",
    "მისია",
    "ვისიონი",
    "MyHunter",
    "მაიჰანტერი",
    "საქართველო",
    "about us",
    "MyHunter team",
    "history",
    "mission",
    "vision",
    "Georgia",
    "hunting store",
    "fishing store",
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
    },
  },
  openGraph: {
    title: "ჩვენს შესახებ - MyHunter გუნდი და ისტორია | MyHunter",
    description:
      "გაიცანით MyHunter-ის გუნდი და ჩვენი ისტორია, ვინ ვართ ჩვენ და რას გთავაზობთ. ვართ სანადირო და სათევზაო აღჭურვილობის ლიდერი საქართველოში.",
    url: "https://myhunter.ge/about",
    siteName: "MyHunter",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MyHunter გუნდი",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ჩვენს შესახებ - MyHunter გუნდი და ისტორია | MyHunter",
    description:
      "გაიცანით MyHunter-ის გუნდი და ჩვენი ისტორია, ვინ ვართ ჩვენ და რას გთავაზობთ.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://myhunter.ge/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
