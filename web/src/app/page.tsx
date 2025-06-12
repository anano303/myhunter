"use client";

import { useEffect, useRef } from "react";
import HomePagesHead from "@/components/homePagesHead/homePagesHead";
import HomePageShop from "@/components/homePageShop/homePageShop";
import HuntingBanner from "@/components/huntingBanner/hunting-banner";
import TopItems from "@/components/TopItems/TopItems";
import BrandLogos from "@/components/BrandLogos/BrandLogos";
import "../utils/scroll-animations.css";

const Home = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const isVisible =
            rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;

          if (isVisible) {
            section.classList.add("reveal-visible");
          }
        }
      });
    };

    // Initial check
    setTimeout(handleScroll, 300);

    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="section-wrapper">
        <HomePagesHead />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => { sectionsRef.current[0] = el; }}
      >
        <TopItems />
      </div>

      <div className="section-wrapper">
        <HuntingBanner />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => { sectionsRef.current[1] = el; }}
      >
        <HomePageShop />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => { sectionsRef.current[2] = el; }}
      >
        <BrandLogos />
      </div>
    </div>
  );
};

export default Home;
