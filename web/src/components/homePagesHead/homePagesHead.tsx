"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/LanguageContext";
import { fetchActiveBanners } from "@/lib/banner-api";
import { Banner } from "@/types/banner";
import CategoryNavigation from "@/components/CategoryNavigation/CategoryNavigation";
import "./homePagesHead.css";

const HomePagesHead = () => {
  const { language } = useLanguage();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const activeBanners = await fetchActiveBanners();
        setBanners(activeBanners);
      } catch (error) {
        console.error("Error loading banners:", error);
      }
    };

    loadBanners();
  }, []);

  // Auto-advance banners every 5 seconds (pause on hover)
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  const nextBanner = useCallback(() => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevBanner = useCallback(() => {
    setCurrentBannerIndex(
      (prev) => (prev - 1 + banners.length) % banners.length
    );
  }, [banners.length]);

  const goToBanner = useCallback((index: number) => {
    setCurrentBannerIndex(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (banners.length <= 1) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          prevBanner();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextBanner();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextBanner, prevBanner, banners.length]);

  const currentBanner = banners[currentBannerIndex];

  // Determine background style based on whether we have dynamic banners
  const backgroundStyle =
    currentBanner && currentBanner.imageUrl
      ? {
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${currentBanner.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url("/mainImage.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        };

  return (
    <div className="home-pages-head">
      <div
        className="rifle-banner"
        style={backgroundStyle}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Dynamic banner content */}
        {currentBanner && (
          <div className="banner-content">
            <h1 className="banner-title">
              {language === "en" ? currentBanner.titleEn : currentBanner.title}
            </h1>
            {currentBanner.buttonText && currentBanner.buttonLink && (
              <Link href={currentBanner.buttonLink} className="banner-cta-btn">
                <span className="btn-text">
                  {language === "en"
                    ? currentBanner.buttonTextEn
                    : currentBanner.buttonText}
                </span>
              </Link>
            )}
          </div>
        )}

        {/* Carousel navigation (only show if multiple banners) */}
        {banners.length > 1 && (
          <>
            <button
              className="carousel-btn prev-btn"
              onClick={prevBanner}
              aria-label="Previous banner"
            >
              &#8249;
            </button>
            <button
              className="carousel-btn next-btn"
              onClick={nextBanner}
              aria-label="Next banner"
            >
              &#8250;
            </button>

            <div className="carousel-indicators">
              {banners.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${
                    index === currentBannerIndex ? "active" : ""
                  }`}
                  onClick={() => goToBanner(index)}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Original action buttons - always visible */}
        <div className="action-buttons">
          <Link href="/register" className="registration-btn">
            <span className="btn-text">რეგისტრაცია</span>
          </Link>
          <Link href="/login" className="auth-btn">
            <span className="btn-text">ავტორიზაცია</span>
          </Link>
        </div>

        {/* Original navigation icons - now using CategoryNavigation component */}
        <CategoryNavigation />
      </div>
    </div>
  );
};

export default HomePagesHead;
