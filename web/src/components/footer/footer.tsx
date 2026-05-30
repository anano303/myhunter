"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/Images/logo.png";
import { useLanguage } from "@/hooks/LanguageContext";
import "./footer.css";

export default function Footer() {
  const { t } = useLanguage();
  const [isInstallmentModalOpen, setIsInstallmentModalOpen] =
    React.useState(false);

  React.useEffect(() => {
    if (!isInstallmentModalOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsInstallmentModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isInstallmentModalOpen]);

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
        <button
          type="button"
          className="footer-installment"
          onClick={() => setIsInstallmentModalOpen(true)}
        >
          <span className="footer-installment-brand">
            <img
              src="/dayavi.webp"
              alt="Credo განვადება"
              className="footer-installment-logo"
            />
            <span>განვადების პირობები</span>
          </span>
        </button>
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

      {isInstallmentModalOpen && (
        <div
          className="installment-modal-backdrop"
          onClick={() => setIsInstallmentModalOpen(false)}
        >
          <div
            className="installment-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="installment-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="installment-modal-close"
              aria-label="Close installment terms"
              onClick={() => setIsInstallmentModalOpen(false)}
            >
              ×
            </button>

            <div className="installment-modal-header">
              <Image
                src="/dayavi.webp"
                alt="Credo განვადება"
                className="installment-modal-logo"
              />
              <h2 id="installment-modal-title">განვადების პირობები</h2>
            </div>

            <div className="installment-highlight">
              ✨ დაიყავი 3-4 თვემდე - სრულად უპროცენტოდ!
            </div>

            <p>
              MyHunter გთავაზობთ <strong>უპროცენტო განვადებას</strong> კრედო
              ბანკის მეშვეობით. შეიძინეთ ხელსაწყოები და აქსესუარები
              მოსახერხებელი თვიური გადახდებით, 0%-ით.
            </p>

            <h3>როგორ მუშაობს:</h3>
            <ul>
              <li>
                Checkout-ში აირჩიეთ <strong>"კრედო განვადება"</strong>
              </li>
              <li>შეავსეთ განაცხადი კრედო ბანკის ვებ-გვერდზე</li>
              <li>დაელოდეთ დამტკიცებას, ჩვეულებრივ 1-3 სამუშაო დღე</li>
              <li>დამტკიცების შემდეგ ხელი მოაწერეთ ხელშეკრულებას ციფრულად</li>
              <li>ხელშეკრულების ხელმოწერის შემდეგ თქვენი შეკვეთა იგზავნება</li>
            </ul>

            <h3>პირობები:</h3>
            <ul>
              <li>
                თანხა: <strong>100₾ - 12,500₾</strong>
              </li>
              <li>
                უპროცენტო ვადა: <strong>3-4 თვემდე 0%-ით</strong>
              </li>
              <li>უფრო გრძელი ვადაც შესაძლებელია პროცენტით</li>
              <li>
                თუ პროდუქტი 12,500₾-ზე მეტი ღირს, ბანკი ფარავს 12,500₾-მდე,
                დარჩენილს იხდით თქვენ
              </li>
              <li>
                უზრუნველყოფს: <strong>კრედო ბანკი</strong>
              </li>
              <li>საჭიროა იყოთ საქართველოს რეზიდენტი, მოქმედი პირადობით</li>
              <li> დამტკიცებული განვადების შემდეგ იგზავნება შეკვეთა</li>
              <li>
                {" "}
                გთხოვთ განვადების გაფორმებამდე გადაამოწმეთ არის თუ არა ნივთი
                მარაგში, ამავე ვებგვერდზე ჩათის გამოყენებით
              </li>
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
}
