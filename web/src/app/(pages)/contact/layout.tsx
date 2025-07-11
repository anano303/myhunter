import { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონტაქტი - დაგვიკავშირდით | MyHunter",
  description:
    "დაგვიკავშირდით ნებისმიერი შეკითხვის შემთხვევაში. MyHunter-ის გუნდი მზადაა დაგეხმაროთ სანადირო და სათევზაო აღჭურვილობის შერჩევაში. მისამართი, ტელეფონი, ელფოსტა. Contact us for any questions.",
  keywords: [
    "კონტაქტი",
    "დაგვიკავშირდით",
    "MyHunter კონტაქტი",
    "მისამართი",
    "ტელეფონი",
    "ელფოსტა",
    "მხარდაჭერა",
    "დახმარება",
    "contact",
    "get in touch",
    "MyHunter contact",
    "address",
    "phone",
    "email",
    "support",
    "help",
    "Georgia",
    "Tbilisi",
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
    title: "კონტაქტი - დაგვიკავშირდით | MyHunter",
    description:
      "დაგვიკავშირდით ნებისმიერი შეკითხვის შემთხვევაში. MyHunter-ის გუნდი მზადაა დაგეხმაროთ სანადირო და სათევზაო აღჭურვილობის შერჩევაში.",
    url: "https://myhunter.ge/contact",
    siteName: "MyHunter",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "MyHunter კონტაქტი",
      },
    ],
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "კონტაქტი - დაგვიკავშირდით | MyHunter",
    description:
      "დაგვიკავშირდით ნებისმიერი შეკითხვის შემთხვევაში. MyHunter-ის გუნდი მზადაა დაგეხმაროთ.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://myhunter.ge/contact",
  },
  other: {
    "geo.region": "GE",
    "geo.placename": "Tbilisi, Georgia",
    "geo.position": "41.7151;44.8271",
    ICBM: "41.7151, 44.8271",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
