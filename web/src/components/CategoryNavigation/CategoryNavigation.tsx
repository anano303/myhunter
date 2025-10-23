"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/app/(pages)/admin/categories/hook/use-categories";
import { useLanguage } from "@/hooks/LanguageContext";
import "./CategoryNavigation.css";

// Function to get category-specific icon - now uses icon from category if available
const getCategoryIcon = (category: any) => {
  console.log("getCategoryIcon called with:", category);
  console.log("Has icon?", category.icon);

  // Use category icon if available (from API)
  if (category.icon) {
    console.log("Using API icon:", category.icon);
    return category.icon;
  }

  // Fallback to name-based icons for backwards compatibility
  console.log("Using fallback icon for:", category.name);
  const name = category.name?.toLowerCase() || "";

  if (
    name.includes("ნადირობა") ||
    name.includes("hunting") ||
    name.includes("rifle")
  ) {
    return "/gun.png";
  } else if (
    name.includes("საბრძოლო") ||
    name.includes("ammunition") ||
    name.includes("ammo")
  ) {
    return "/gun.png";
  } else if (
    name.includes("დასვენება") ||
    name.includes("camping") ||
    name.includes("camp")
  ) {
    return "/camping.png";
  } else if (
    name.includes("თევზაობა") ||
    name.includes("fishing") ||
    name.includes("fish")
  ) {
    return "/fish.png";
  } else if (
    name.includes("ტანსაცმელი") ||
    name.includes("clothing") ||
    name.includes("clothes")
  ) {
    return "/clothes.png";
  } else if (
    name.includes("აქსესუარები") ||
    name.includes("accessories") ||
    name.includes("gear")
  ) {
    return "/clothes.png";
  } else {
    return "/clothes.png"; // Default icon
  }
};

const CategoryNavigation = () => {
  const { data: categories } = useCategories(false);
  const { language } = useLanguage();

  // Default categories (fallback if API fails or returns empty)
  const defaultCategories = [
    {
      id: 1,
      name: "ცეცხლსასროლი იარაღი",
      nameEn: "Firearms",
      href: "/shop/firearms",
    },
    { id: 2, name: "თევზაობა", nameEn: "Fishing", href: "/shop/fishing" },
    { id: 3, name: "კემპინგი", nameEn: "Camping", href: "/shop/camping" },
    {
      id: 4,
      name: "აქსესუარები",
      nameEn: "Accessories",
      href: "/shop/accessories",
    },
  ];

  // Use API categories if available, otherwise use default
  const categoriesToShow =
    categories && categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="category-navigation">
      <div className="category-scroll-container">
        {categoriesToShow.map((category) => {
          const isApiCategory = categories && categories.length > 0;
          const href = isApiCategory
            ? `/shop?mainCategory=${category.id}`
            : defaultCategories.find((def) => def.id === category.id)?.href ||
              "/shop/categories";

          return (
            <Link key={category.id} href={href} className="main-category-item">
              <div className="category-icon">
                <Image
                  src={getCategoryIcon(category)}
                  alt={category.name}
                  width={24}
                  height={24}
                  className="icon category-icon"
                />
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
