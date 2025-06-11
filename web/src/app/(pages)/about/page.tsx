"use client";

import "./about.css";
import { useLanguage } from "@/hooks/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="about-container">
      <h1 className="about-title">{t("about.title")}</h1>
    </div>
  );
}
