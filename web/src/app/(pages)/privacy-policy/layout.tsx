import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "კონფიდენციალურობის პოლიტიკა | Privacy Policy",
  description:
    "MyHunter-ს კონფიდენციალურობის პოლიტიკა. გაიგეთ როგორ ვიცავთ და ვმუშავებთ თქვენს პირად ინფორმაციასთან. | MyHunter privacy policy. Learn how we protect and handle your personal information.",
  keywords: [
    "კონფიდენციალურობა",
    "პოლიტიკა",
    "პირადი ინფორმაცია",
    "მონაცემთა დაცვა",
    "GDPR",
    "privacy",
    "policy",
    "personal information",
    "data protection",
  ],
  openGraph: {
    title:
      "კონფიდენციალურობის პოლიტიკა - MyHunter | Privacy Policy - MyHunter",
    description:
      "გაიგეთ როგორ ვიცავთ თქვენს პირად ინფორმაციას | Learn how we protect your personal information",
    url: "https://MyHunter.ge/privacy-policy",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "MyHunter კონფიდენციალურობის პოლიტიკა | Privacy Policy",
      },
    ],
  },
  alternates: {
    canonical: "https://MyHunter.ge/privacy-policy",
    languages: {
      ka: "https://MyHunter.ge/privacy-policy",
      en: "https://MyHunter.ge/en/privacy-policy",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
