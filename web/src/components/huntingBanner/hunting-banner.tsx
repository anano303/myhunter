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
              : "What is the most popular weapon for hunting?"}
          </h2>
          <p>
            {language === "ge"
              ? "აღმოაჩინე ჩვენს მაღაზიაში ყველაზე საჭირო და პოპულარული ნივთები"
              : "Discover the most essential and popular items in our store"}
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
        <h2>
          {language === "ge"
            ? "ექსკლუზიური შეთავაზებებისთვის დარეგისტრირდი ჩვენს საიტზე"
            : "Register on our site for exclusive offers"}
        </h2>
        <Link href="/register" className="hunting-banner-button">
          {language === "ge" ? "დარეგისტრირდი" : "Register"}
        </Link>
      </div>
      <div className="hunting-banner-content">
        <div className="hunting-banner-image">
          <Image
            src="/banner2.png"
            alt={language === "ge" ? "სანადირო იარაღი" : "Hunting Weapon"}
            width={500}
            height={300}
            objectFit="cover"
          />
        </div>
        <div className="hunting-banner-text">
          <h2>
            {language === "ge" ? "გიყვარს თევზაობა?" : "Do you love fishing?"}
          </h2>
          <p>
            {language === "ge"
              ? "აღმოაჩინე საუკეთესო სათევზაო აღჭურვილობა ჩვენთან!"
              : "Discover the best fishing equipment with us!"}
          </p>
          <Link href="/shop" className="hunting-banner-button">
            {language === "ge" ? "აღმოაჩინე" : "Discover"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HuntingBanner;
