"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// import { useLanguage } from "@/hooks/LanguageContext";
import "./footer.css";

export default function Footer() {
  // const { t } = useLanguage();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-column">
            <h4>მთავარი გვერდი</h4>
            <Link href="/products">კატეგორია</Link>
            <Link href="/products">ჩვენს შესახებ</Link>
          </div>

          <div className="footer-column">
            <h4>მისამართი: საქართველო, თბილისი</h4>
            <div className="footer-contact">
              <p>ტელ: +995 11 22 33</p>
              <p>მეილი: info@ssbb.com</p>
            </div>
          </div>
        </div>

        <div className="footer-logo">
          <Image
            src="/logo.png"
            alt="SSBB MARKET"
            width={180}
            height={90}
            className="footer-logo-image"
          />
        </div>

        <div className="footer-bottom">
          <p className="copyright">Created by BESTSOFT.GE</p>
        </div>
      </div>
    </footer>
  );
}
