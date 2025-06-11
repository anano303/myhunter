"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/LanguageContext";
import "./hunting-banner.css";

export const HuntingBanner: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="hunting-banner-container">
      <div className="hunting-banner-content">
        <div className="hunting-banner-text">
          <h2>
            {language === "ge"
              ? "რომელია ყველაზე პოპულარული იარაღი ნადირობისთვის?"
              : "How to buy the most popular hunting weapons?"}
          </h2>
          <p>
            {language === "ge"
              ? "აღმოაჩინე ჩვენს მაღაზიაში ყველაზე საჭირო და პოპულარული ნივთები"
              : "Discover the most popular and highest quality hunting weapons in our store"}
          </p>
          <Link href="/shop" className="hunting-banner-button">
            {language === "ge" ? "აღმოაჩინე" : "Discover"}
          </Link>
        </div>
        <div className="hunting-banner-image">
          <Image
            src="/Rectangle 9.png"
            alt={language === "ge" ? "სანადირო იარაღი" : "Hunting Weapon"}
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>
      </div>

      <div className="hunting-banner-footer">
        <h2>ექსკლუზიური შეთავაზებებისთვის დარეგისტრირდი ჩვენს საიტზე</h2>
        <Link href="/register" className="hunting-banner-button">
          {language === "ge" ? "დარეგისტრირდი" : "Register"}
        </Link>
      </div>
    </div>
  );
};

export default HuntingBanner;
