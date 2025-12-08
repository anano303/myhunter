"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/hooks/LanguageContext";
import "./hunting-banner.css";

export const HuntingBanner: React.FC = () => {
  const { language } = useLanguage();
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Function to check if an element is in viewport
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) *
            0.85 && rect.bottom >= 0
      );
    };

    const checkScroll = () => {
      contentRefs.current.forEach((element) => {
        if (element && isInViewport(element)) {
          // Add active class to make elements visible
          element.classList.add("active");
        }
      });
    };

    // Run initial check after a small delay to ensure DOM is ready
    setTimeout(checkScroll, 300);

    // Check on scroll with debounce
    const handleScroll = () => {
      checkScroll();
    };

    window.addEventListener("scroll", handleScroll);
    // Also check on window resize
    window.addEventListener("resize", handleScroll);

    // Force check visibility on load
    window.addEventListener("load", checkScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("load", checkScroll);
    };
  }, []);

  return (
    <div className="hunting-banner-container">
      <div
        className="hunting-banner-content reveal"
        ref={(el) => {
          contentRefs.current[0] = el;
        }}
      >
        <div className="hunting-banner-text">
          <h2>
            {language === "ge"
              ? "რომელია ყველაზე პოპულარული ოტიკური და მექანიკური სამიზნეები?"
              : "What is the most popular optical and mechanical sight?"}
          </h2>

          <Link
            href="/shop?mainCategory=68d70291fdc08a711c36056"
            className="hunting-banner-button"
          >
            {language === "ge" ? "აღმოაჩინე" : "Discover"}
          </Link>
        </div>
        <div className="hunting-banner-image">
          <Image
            src="/Rectangle 9.png"
            alt={language === "ge" ? "სანადირო იარაღი" : "Hunting Weapon"}
            width={500}
            height={300}
            priority={true}
            unoptimized
            style={{ objectFit: "cover", display: "block" }}
          />
        </div>
      </div>

      <div
        className="hunting-banner-footer reveal"
        ref={(el) => {
          contentRefs.current[1] = el;
        }}
      >
        <h2>
          {language === "ge"
            ? "ექსკლუზიური შეთავაზებებისთვის დარეგისტრირდი ჩვენს საიტზე"
            : "Register on our site for exclusive offers"}
        </h2>
        <Link href="/register" className="hunting-banner-button">
          {language === "ge" ? "დარეგისტრირდი" : "Register"}
        </Link>
      </div>

      <div
        className="hunting-banner-content reveal"
        ref={(el) => {
          contentRefs.current[2] = el;
        }}
      >
        <div className="hunting-banner-image">
          <Image
            src="/banner2.png"
            alt={language === "ge" ? "სანადირო იარაღი" : "Hunting Weapon"}
            width={500}
            height={300}
            unoptimized
            style={{ objectFit: "cover", display: "block" }}
          />
        </div>
        <div className="hunting-banner-text">
          <h2>
            {language === "ge" ? "გიყვარს თევზაობა?" : "Do you love fishing?"}
          </h2>
          <p>
            {language === "ge"
              ? "აღმოაჩინე საუკეთესო სანადირო და სალაშქრო ინვენტარი!"
              : "Discover the best hunting and hiking equipment with us!"}
          </p>
          <Link href="/shop?mainCategory=684c7806548e708c4db3fe79" className="hunting-banner-button">
            {language === "ge" ? "აღმოაჩინე" : "Discover"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HuntingBanner;
