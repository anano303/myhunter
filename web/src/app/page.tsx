"use client";

import { useEffect, useRef, useState } from "react";
import HomePagesHead from "@/components/homePagesHead/homePagesHead";
import HomePageShop from "@/components/homePageShop/homePageShop";
import HuntingBanner from "@/components/huntingBanner/hunting-banner";
import TopItems from "@/components/TopItems/TopItems";
import BrandLogos from "@/components/BrandLogos/BrandLogos";
import "../utils/scroll-animations.css";
import "../utils/scroll-performance.css";

const Home = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    // Check for user's motion preference from system settings only
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setReducedMotion(prefersReducedMotion);

    // Precompute section positions for better performance
    const sectionPositions = sectionsRef.current.map((section) =>
      section ? section.getBoundingClientRect().top + window.pageYOffset : 0
    );

    const handleScroll = () => {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + window.innerHeight * 0.95;

        sectionsRef.current.forEach((section, index) => {
          if (section) {
            // More efficient check using precomputed positions
            const isVisible = scrollPosition >= sectionPositions[index];

            if (isVisible) {
              section.classList.add("reveal-visible");
            }
          }
        });
      });
    };

    // Initial check - run immediately to ensure above-the-fold content appears right away
    handleScroll();

    // Update positions on resize
    const handleResize = () => {
      // Recalculate section positions when window is resized
      sectionPositions.splice(0, sectionPositions.length);
      sectionsRef.current.forEach((section, index) => {
        sectionPositions[index] = section
          ? section.getBoundingClientRect().top + window.pageYOffset
          : 0;
      });
      handleScroll();
    };

    // Listen for scroll events with throttling for better performance
    let scrollTimeout: number;
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = window.setTimeout(() => {
          scrollTimeout = 0;
          handleScroll();
        }, 10); // Small delay to throttle scroll events
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
      className={reducedMotion ? "reduced-motion" : ""}
    >
      <div className="section-wrapper">
        <HomePagesHead />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
      >
        <TopItems />
      </div>

      <div className="section-wrapper">
        <HuntingBanner />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
      >
        <HomePageShop />
      </div>

      <div
        className="section-wrapper reveal-section"
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
      >
        <BrandLogos />
      </div>
    </div>
  );
};

export default Home;
