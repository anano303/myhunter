"use client";

import React from "react";
import Link from "next/link";
import { useCategories } from "@/app/(pages)/admin/categories/hook/use-categories";
import { useLanguage } from "@/hooks/LanguageContext";
import "./CategoryNavigation.css";

// Function to get category-specific icon
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();

  if (
    name.includes("ცეცხლსასროლი") ||
    name.includes("gun") ||
    name.includes("rifle")
  ) {
    return (
      <path
        d="M21,7h-2V6h-2V5H9v1H7v1H5v1H3V9h2v1h2v7h1v1h2v1h8v-1h2v-1h1V9h2V7z M12,16c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,16,12,16z"
        fill="currentColor"
      />
    );
  } else if (
    name.includes("საბრძოლო") ||
    name.includes("ammunition") ||
    name.includes("ammo")
  ) {
    return (
      <path
        d="M19,8V5h-2v3h-3v2h3v3h2v-3h3V8H19z M3,7h3V4h2v3h3v2H8v3H6v-3H3V7z M15,15H9v-2h6V15z M15,17H9v2h6V17z"
        fill="currentColor"
      />
    );
  } else if (
    name.includes("კემპინგ") ||
    name.includes("camping") ||
    name.includes("camp")
  ) {
    return (
      <path
        d="M12,3L1,22h22L12,3z M12,7l6.92,11H5.08L12,7z"
        fill="currentColor"
      />
    );
  } else if (
    name.includes("თევზაობა") ||
    name.includes("fishing") ||
    name.includes("fish")
  ) {
    return (
      <path
        d="M12,18c-0.5,0-1-0.2-1.4-0.6l-7-7c-0.8-0.8-0.8-2,0-2.8s2-0.8,2.8,0L12,13.2l5.6-5.6c0.8-0.8,2-0.8,2.8,0s0.8,2,0,2.8l-7,7C13,17.8,12.5,18,12,18z"
        fill="currentColor"
      />
    );
  } else if (
    name.includes("ტანსაცმელი") ||
    name.includes("clothing") ||
    name.includes("clothes")
  ) {
    return (
      <path
        d="M12,2l-2,2h-2v2l-2,2v12h12V8l-2-2V4h-2L12,2z M10,6h4v2h-4V6z"
        fill="currentColor"
      />
    );
  } else if (
    name.includes("აქსესუარები") ||
    name.includes("accessories") ||
    name.includes("gear")
  ) {
    return (
      <path
        d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"
        fill="currentColor"
      />
    );
  } else {
    // Default icon - shield
    return (
      <path
        d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.4 16,13V16C16,17.1 15.2,18 14.2,18H9.8C8.8,18 8,17.1 8,16V13C8,12.4 8.4,11.5 9,11.5V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,8.7 10.2,10V11.5H13.8V10C13.8,8.7 12.8,8.2 12,8.2Z"
        fill="currentColor"
      />
    );
  }
};

const CategoryNavigation = () => {
  const { data: categories, isLoading } = useCategories(false);
  const { language } = useLanguage();

  // Default categories (fallback if API fails or returns empty)
  const defaultCategories = [
    {
      id: "guns",
      name: "ცეცხლსასროლი",
      nameEn: "Firearms",
      href: "/guns",
    },
    {
      id: "ammunition",
      name: "საბრძოლო მასალები",
      nameEn: "Ammunition",
      href: "/ammunition",
    },
    {
      id: "camping",
      name: "კემპინგი",
      nameEn: "Camping",
      href: "/camping",
    },
    {
      id: "test-percent",
      name: "ტესტი 20%",
      nameEn: "Test 20%",
      href: "/test",
    },
  ];

  // Use API categories if available, otherwise use default
  const categoriesToShow =
    categories && categories.length > 0 ? categories : defaultCategories;

  if (isLoading) {
    return (
      <div className="category-navigation">
        <div className="category-scroll-container">
          {defaultCategories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="category-item"
            >
              <div className="category-icon">
                <svg viewBox="0 0 24 24" className="icon category-icon">
                  {getCategoryIcon(category.name)}
                </svg>
              </div>
              <span className="category-text">
                {language === "en" ? category.nameEn : category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="category-navigation">
      <div className="category-scroll-container">
        {categoriesToShow.map((category) => {
          const isApiCategory = categories && categories.length > 0;
          const href = isApiCategory
            ? `/category/${category.id}`
            : defaultCategories.find((def) => def.id === category.id)?.href ||
              `/category/${category.id}`;

          return (
            <Link key={category.id} href={href} className="category-item">
              <div className="category-icon">
                <svg viewBox="0 0 24 24" className="icon category-icon">
                  {getCategoryIcon(category.name)}
                </svg>
              </div>
              <span className="category-text">
                {language === "en"
                  ? category.nameEn || category.name
                  : category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavigation;
