"use client";

import "./about.css";
import { useLanguage } from "@/hooks/LanguageContext";
import { useState } from "react";

import Link from "next/link";

export default function AboutPage() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("about"); // about, mission, team

  return (
    <div className="about-page">
      <div className="about-hero">
        <h1 className="about-title">
          {language === "ge" ? "ჩვენს შესახებ" : "About Us"}
        </h1>
      </div>

      <div className="about-container">
        <div className="about-tabs">
          <button
            className={`about-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            {language === "ge" ? "ჩვენს შესახებ" : "About Us"}
          </button>
          <button
            className={`about-tab ${activeTab === "mission" ? "active" : ""}`}
            onClick={() => setActiveTab("mission")}
          >
            {language === "ge" ? "ჩვენი მისია" : "Our Mission"}
          </button>
          <button
            className={`about-tab ${activeTab === "team" ? "active" : ""}`}
            onClick={() => setActiveTab("team")}
          >
            {language === "ge" ? "ჩვენი გუნდი" : "Our Team"}
          </button>
        </div>

        {activeTab === "about" && (
          <div className="about-content">
            <div className="about-section">
              <h2 className="about-subtitle">
                {language === "ge"
                  ? "MyHunter - თქვენი საიმედო პარტნიორი"
                  : "MyHunter - Your Trusted Partner"}
              </h2>
              <p className="about-description">
                {language === "ge"
                  ? "MyHunter დაარსდა 2020 წელს, როგორც ნადირობისა და თევზაობის ენთუზიასტების მიერ შექმნილი ონლაინ მაღაზია. ჩვენი მიზანია, შევქმნათ უმაღლესი ხარისხის საიმედო პროდუქტები და აღჭურვილობა, რომელიც დააკმაყოფილებს როგორც დამწყებ, ასევე გამოცდილ მონადირეებსა და მეთევზეებს."
                  : "MyHunter was established in 2020 as an online store created by hunting and fishing enthusiasts. Our goal is to provide high-quality reliable products and equipment that will satisfy both beginners and experienced hunters and anglers."}
              </p>
              <p className="about-description">
                {language === "ge"
                  ? "წლების განმავლობაში, ჩვენ გავაფართოვეთ ჩვენი ასორტიმენტი და დავამყარეთ ურთიერთობები წამყვან მწარმოებლებთან მთელ მსოფლიოში, რათა შეგვეთავაზებინა უახლესი და ყველაზე ინოვაციური პროდუქტები ჩვენი მომხმარებლებისთვის."
                  : "Over the years, we have expanded our range and established relationships with leading manufacturers worldwide to offer the latest and most innovative products to our customers."}
              </p>
            </div>

            <div className="about-highlight">
              <h3>
                {language === "ge"
                  ? "რატომ უნდა აირჩიოთ MyHunter?"
                  : "Why Choose MyHunter?"}
              </h3>
              <ul className="about-list">
                <li>
                  {language === "ge"
                    ? "გთავაზობთ 500+ ბრენდისგან შემდგარ ფართო ასორტიმენტს"
                    : "We offer a wide assortment from 500+ brands"}
                </li>
                <li>
                  {language === "ge"
                    ? "პროფესიონალური კონსულტაცია და მხარდაჭერა"
                    : "Professional consultation and support"}
                </li>
                <li>
                  {language === "ge"
                    ? "სწრაფი მიწოდება საქართველოს მასშტაბით"
                    : "Fast delivery throughout Georgia"}
                </li>
                <li>
                  {language === "ge"
                    ? "უმაღლესი ხარისხის გარანტია"
                    : "Highest quality guarantee"}
                </li>
              </ul>
            </div>

            <div className="about-section">
              <h2 className="about-subtitle">
                {language === "ge" ? "ჩვენი ასორტიმენტი" : "Our Assortment"}
              </h2>
              <p className="about-description">
                {language === "ge"
                  ? "MyHunter-ში შეგიძლიათ იპოვოთ ყველაფერი, რაც გჭირდებათ ნადირობისა და თევზაობისთვის:"
                  : "At MyHunter, you can find everything you need for hunting and fishing:"}
              </p>
              <ul className="about-categories">
                <li>
                  {language === "ge"
                    ? "ნადირობის იარაღები და აქსესუარები"
                    : "Hunting weapons and accessories"}
                </li>
                <li>
                  {language === "ge"
                    ? "სათევზაო აღჭურვილობა"
                    : "Fishing equipment"}
                </li>
                <li>
                  {language === "ge"
                    ? "სპეციალიზებული ტანსაცმელი და ფეხსაცმელი"
                    : "Specialized clothing and footwear"}
                </li>
                <li>
                  {language === "ge"
                    ? "ნავიგაცია და ელექტრონიკა"
                    : "Navigation and electronics"}
                </li>
                <li>
                  {language === "ge"
                    ? "ბანაკის აღჭურვილობა"
                    : "Camping equipment"}
                </li>
              </ul>
            </div>

            <div className="about-cta">
              <Link href="/shop" className="about-button about-shop-button">
                {language === "ge"
                  ? "დაათვალიერეთ ჩვენი პროდუქტები"
                  : "Browse Our Products"}
              </Link>
            </div>
          </div>
        )}

        {activeTab === "mission" && (
          <div className="about-content">
            <div className="about-section">
              <h2 className="about-subtitle">
                {language === "ge"
                  ? "ჩვენი მისია და ხედვა"
                  : "Our Mission and Vision"}
              </h2>
              <p className="about-description">
                {language === "ge"
                  ? "MyHunter-ის მისიაა, შევქმნათ უმაღლესი ხარისხის საიმედო პროდუქტები და აღჭურვილობა, რომელიც დააკმაყოფილებს როგორც დამწყებ, ასევე გამოცდილ მონადირეებსა და მეთევზეებს. ჩვენი მიზანია, დავეხმაროთ ჩვენს მომხმარებლებს, გაატარონ მეტი დრო ბუნებაში და მიიღონ უდიდესი სიამოვნება ნადირობისა და თევზაობისგან."
                  : "MyHunter's mission is to create high-quality reliable products and equipment that will satisfy both beginners and experienced hunters and anglers. Our goal is to help our customers spend more time in nature and get the greatest pleasure from hunting and fishing."}
              </p>
            </div>

            <div className="about-section">
              <h3 className="about-subtitle">
                {language === "ge" ? "ჩვენი ღირებულებები" : "Our Values"}
              </h3>
              <div className="about-values">
                <div className="about-value-item">
                  <h4>{language === "ge" ? "ხარისხი" : "Quality"}</h4>
                  <p>
                    {language === "ge"
                      ? "ჩვენ ვირჩევთ მხოლოდ უმაღლესი ხარისხის პროდუქტებს წამყვანი მწარმოებლებისგან."
                      : "We select only the highest quality products from leading manufacturers."}
                  </p>
                </div>
                <div className="about-value-item">
                  <h4>{language === "ge" ? "სანდოობა" : "Reliability"}</h4>
                  <p>
                    {language === "ge"
                      ? "ჩვენი პროდუქტები და მომსახურება ყოველთვის სანდოა და საიმედო."
                      : "Our products and services are always trustworthy and reliable."}
                  </p>
                </div>
                <div className="about-value-item">
                  <h4>{language === "ge" ? "ინოვაცია" : "Innovation"}</h4>
                  <p>
                    {language === "ge"
                      ? "ჩვენ მუდმივად ვეძებთ ახალ ტექნოლოგიებს და გადაწყვეტილებებს."
                      : "We are constantly looking for new technologies and solutions."}
                  </p>
                </div>
                <div className="about-value-item">
                  <h4>
                    {language === "ge"
                      ? "გარემოს დაცვა"
                      : "Environmental Protection"}
                  </h4>
                  <p>
                    {language === "ge"
                      ? "ჩვენ ვზრუნავთ ბუნებაზე და ვახორციელებთ მდგრად პრაქტიკას."
                      : "We care about nature and implement sustainable practices."}
                  </p>
                </div>
              </div>
            </div>

            <div className="about-commitment">
              <h3>
                {language === "ge"
                  ? "ჩვენი ვალდებულება თქვენს მიმართ"
                  : "Our Commitment to You"}
              </h3>
              <p>
                {language === "ge"
                  ? "MyHunter ვალდებულებას იღებს, მოგაწვდოთ არა მხოლოდ უმაღლესი ხარისხის პროდუქცია, არამედ გამორჩეული მომსახურებაც. ჩვენი გუნდი მზადაა, დაგეხმაროთ სწორი არჩევანის გაკეთებაში და გაგიზიაროთ თავისი ცოდნა და გამოცდილება."
                  : "MyHunter is committed to providing you not only with high-quality products but also with outstanding service. Our team is ready to help you make the right choice and share their knowledge and experience."}
              </p>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="about-content">
            <div className="about-section">
              <h2 className="about-subtitle">
                {language === "ge" ? "გაიცანით ჩვენი გუნდი" : "Meet Our Team"}
              </h2>
              <p className="about-description">
                {language === "ge"
                  ? "MyHunter-ის გუნდი შედგება ნადირობისა და თევზაობის ენთუზიასტებისგან, რომლებსაც აქვთ მრავალწლიანი გამოცდილება და ცოდნა ამ სფეროში. ჩვენი გუნდის წევრები არიან პროფესიონალები, რომლებიც ყოველთვის მზად არიან, დაგეხმარონ და გაგიზიარონ თავიანთი გამოცდილება."
                  : "The MyHunter team consists of hunting and fishing enthusiasts who have many years of experience and knowledge in this field. Our team members are professionals who are always ready to help you and share their experience."}
              </p>
            </div>

            <div className="team-members">
              <div className="team-member">
                <div className="team-member-photo">
                  {/* Placeholder for team member photo */}
                  <div className="photo-placeholder"></div>
                </div>
                <h3 className="team-member-name">
                  {language === "ge"
                    ? "გიორგი მეგრელიშვილი"
                    : "Giorgi Megrelishvili"}
                </h3>
                <p className="team-member-position">
                  {language === "ge" ? "დამფუძნებელი & CEO" : "Founder & CEO"}
                </p>
                <p className="team-member-bio">
                  {language === "ge"
                    ? "გიორგი არის გამოცდილი მონადირე 15+ წლიანი გამოცდილებით. მისი ვნება ნადირობისა და თევზაობის მიმართ გახდა MyHunter-ის შექმნის მთავარი მიზეზი."
                    : "Giorgi is an experienced hunter with 15+ years of experience. His passion for hunting and fishing became the main reason for creating MyHunter."}
                </p>
              </div>

              <div className="team-member">
                <div className="team-member-photo">
                  {/* Placeholder for team member photo */}
                  <div className="photo-placeholder"></div>
                </div>
                <h3 className="team-member-name">
                  {language === "ge" ? "ნინო კავთელაძე" : "Nino gevteladze"}
                </h3>
                <p className="team-member-position">
                  {language === "ge" ? "პროდუქტის მენეჯერი" : "Product Manager"}
                </p>
                <p className="team-member-bio">
                  {language === "ge"
                    ? "ნინო უზრუნველყოფს, რომ ჩვენი ასორტიმენტი ყოველთვის განახლებული იყოს უახლესი და საუკეთესო პროდუქტებით."
                    : "Nino ensures that our assortment is always updated with the latest and best products."}
                </p>
              </div>

              <div className="team-member">
                <div className="team-member-photo">
                  {/* Placeholder for team member photo */}
                  <div className="photo-placeholder"></div>
                </div>
                <h3 className="team-member-name">
                  {language === "ge" ? "დავით წიკლაური" : "David Tsiklauri"}
                </h3>
                <p className="team-member-position">
                  {language === "ge"
                    ? "ტექნიკური ექსპერტი"
                    : "Technical Expert"}
                </p>
                <p className="team-member-bio">
                  {language === "ge"
                    ? "დავითი არის ჩვენი ტექნიკური ექსპერტი, რომელიც გეხმარებათ იარაღებისა და აღჭურვილობის შერჩევაში."
                    : "David is our technical expert who helps you choose weapons and equipment."}
                </p>
              </div>
            </div>

            <div className="about-join-team">
              <h3>{language === "ge" ? "შემოგვიერთდით!" : "Join Our Team!"}</h3>
              <p>
                {language === "ge"
                  ? "თუ ხართ ნადირობისა და თევზაობის ენთუზიასტი და გსურთ, იმუშაოთ ჩვენთან ერთად, გამოგვიგზავნეთ თქვენი რეზიუმე."
                  : "If you are a hunting and fishing enthusiast and would like to work with us, send us your resume."}
              </p>
              <Link
                href="/contact"
                className="about-button about-seller-button"
              >
                {language === "ge" ? "დაგვიკავშირდით" : "Contact Us"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
