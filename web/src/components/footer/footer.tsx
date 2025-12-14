"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/Images/logo.png";
import { useLanguage } from "@/hooks/LanguageContext";
import "./footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-navigation">
            <div className="footer-links">
              <Link href="/" className="footer-link">
                {t("navigation.homePage")}
              </Link>
              <Link href="/shop" className="footer-link">
                {t("navigation.shop")}
              </Link>
              <Link href="/about" className="footer-link">
                {t("navigation.about")}
              </Link>
              <Link href="/contact" className="footer-link">
                {t("navigation.contact")}
              </Link>
              <Link
                href="/privacy-policy"
                className="footer-link footer-policy-link"
              >
                {t("footer.privacy")}
              </Link>
              <Link
                href="/terms-and-conditions"
                className="footer-link footer-policy-link"
              >
                {t("footer.terms")}
              </Link>
              <Link
                href="/return-policy"
                className="footer-link footer-policy-link"
              >
                {t("footer.returnPolicy")}
              </Link>
            </div>
          </div>
          <div className="footer-logo">
            <Image
              src={logo}
              alt="MyHunter Logo"
              width={160}
              height={95}
              className="footer-logo-image"
            />
          </div>
          <div className="footer-info">
            <div className="contact-info">
              <address className="footer-contact">
                <div className="top-contacts">
                  <p>{t("footer.address")}</p>
                  <p>{t("footer.email")}</p>
                </div>
                <p className="bottom-contact">{t("footer.phone")}</p>
              </address>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">
            Created by{" "}
            <a
              href="https://bestsoft.ge"
              target="_blank"
              rel="noopener noreferrer"
              className="bestsoft-link"
            >
              BESTSOFT.GE
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
