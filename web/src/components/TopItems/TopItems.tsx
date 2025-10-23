"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import "./TopItems.css";
import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "@/lib/fetch-with-auth";
import { Product } from "@/types";
import LoadingAnim from "../loadingAnim/loadingAnim";
import { ProductCard } from "@/modules/products/components/product-card";
import { useLanguage } from "@/hooks/LanguageContext";

const TopItems: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { data: discountedProducts, isLoading } = useQuery({
    queryKey: ["discountedProducts"],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        page: "1",
        limit: "100",
        discounted: "true",
        sortBy: "discountPercentage",
        sortDirection: "desc",
      });
      const response = await fetchWithAuth(
        `/products?${searchParams.toString()}`
      );
      const data = await response.json();
      // Handle both response formats (items array or products array)
      const products = data.items || data.products || [];
      return products.slice(0, 6); // show only 6 discounted products in the strip
    },
    refetchOnWindowFocus: false,
  });

  // Handle scroll event to show/hide scrollbar
  useEffect(() => {
    const gridElement = gridRef.current;

    const handleScroll = () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set a timeout to hide the scrollbar after scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Hide after 1 second of no scrolling
    };

    if (gridElement) {
      gridElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (gridElement) {
        gridElement.removeEventListener("scroll", handleScroll);
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const { t } = useLanguage();

  if (isLoading) {
    return (
      <div className="top-items-container loading">
        <LoadingAnim />
      </div>
    );
  }

  return (
    <div className="top-items-container">
      <div className="top-items-title-container">
        <h2 className="top-items-title">
          {t("navigation.discounted") || "ფასდაკლებული პროდუქტები"}
        </h2>
      </div>

      <div
        ref={gridRef}
        className={`top-items-grid ${isScrolling ? "scrolling" : ""}`}
      >
        {discountedProducts?.map((product: Product, index: number) => (
          <div
            key={product._id}
            className={`product-card-wrapper ${
              index === 0 ? "first-product" : ""
            }`}
            style={index === 0 ? { paddingLeft: "5px" } : {}}
          >
            <ProductCard product={product} />
          </div>
        ))}

        {/* View All button as last item in the scroll */}
        {discountedProducts && discountedProducts.length > 0 && (
          <div className="view-all-scroll-item">
            <Link
              href="/shop?discounted=true"
              className="view-all-scroll-button"
            >
              <span className="view-all-text">{t("shop.seeAll")}</span>
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopItems;
