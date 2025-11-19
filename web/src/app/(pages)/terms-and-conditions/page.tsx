"use client";

import { useLanguage } from "@/hooks/LanguageContext";
import "./terms-and-conditions.css";

export default function TermsAndConditions() {
  const { language } = useLanguage();

  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">
          {language === "en" ? "Terms and Conditions" : "წესები და პირობები"}
        </h1>

        <div className="terms-section">
          <h2>{language === "en" ? "1. Introduction" : "1. შესავალი"}</h2>
          <p>
            {language === "en"
              ? "Welcome to MyHunter - your trusted partner for hunting and fishing equipment in Georgia. By accessing and using our website, you agree to comply with these terms and conditions. Please read them carefully before making any purchase."
              : "მოგესალმებით MyHunter-ზე - თქვენი სანდო პარტნიორი სანადირო და სათევზაო ინვენტარის შესყიდვაში საქართველოში. ჩვენი ვებსაიტის გამოყენებით, თქვენ ეთანხმებით ამ წესებსა და პირობებს. გთხოვთ, ყურადღებით წაიკითხოთ ისინი ნებისმიერი შესყიდვის განხორციელებამდე."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "2. Product Information"
              : "2. პროდუქციის შესახებ"}
          </h2>
          <p>
            {language === "en"
              ? "MyHunter offers a wide range of hunting and fishing equipment, including firearms, ammunition, fishing rods, camping gear, clothing, and accessories. All products listed on our website are accurately described to the best of our knowledge. However, slight variations in color, size, or specifications may occur."
              : "MyHunter გთავაზობთ სანადირო და სათევზაო ინვენტარის ფართო ასორტიმენტს, მათ შორის ცეცხლსასროლ იარაღს, საბრძოლო მასალას, სათევზაო ხერხებს, სალაშქრო აღჭურვილობას, ტანსაცმელსა და აქსესუარებს. ჩვენს ვებსაიტზე განთავსებული ყველა პროდუქტი აღწერილია ჩვენი ცოდნის საუკეთესო საფუძველზე. თუმცა, შესაძლოა გამოვლინდეს მცირე განსხვავებები ფერში, ზომაში ან მახასიათებლებში."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "3. User Registration"
              : "3. მომხმარებლის რეგისტრაცია"}
          </h2>
          <p>
            {language === "en"
              ? "To make a purchase on MyHunter, you must create an account by providing accurate personal information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
              : "MyHunter-ზე შესყიდვის განსახორციელებლად თქვენ უნდა შექმნათ ანგარიში ზუსტი პირადი ინფორმაციის მითითებით. თქვენ ხართ პასუხისმგებელი თქვენი ანგარიშის მონაცემების კონფიდენციალურობის შენარჩუნებასა და თქვენი ანგარიშით განხორციელებულ ყველა ქმედებაზე."}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "You must be at least 18 years old to purchase certain products"
                : "გარკვეული პროდუქტების შესაძენად უნდა იყოთ მინიმუმ 18 წლის"}
            </li>
            <li>
              {language === "en"
                ? "Firearms purchases require valid documentation as per Georgian law"
                : "ცეცხლსასროლი იარაღის შესყიდვა მოითხოვს ვალიდურ დოკუმენტაციას საქართველოს კანონმდებლობის შესაბამისად"}
            </li>
            <li>
              {language === "en"
                ? "You must provide accurate and complete information"
                : "უნდა მიაწოდოთ ზუსტი და სრული ინფორმაცია"}
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "4. Pricing and Payment"
              : "4. ფასები და გადახდა"}
          </h2>
          <p>
            {language === "en"
              ? "All prices on our website are displayed in Georgian Lari (GEL) and include VAT where applicable. We accept various payment methods including credit/debit cards and bank transfers. Prices are subject to change without prior notice."
              : "ჩვენს ვებსაიტზე ყველა ფასი მითითებულია ქართულ ლარში (GEL) და შეიცავს დღგ-ს, სადაც ეს გამოიყენება. ჩვენ ვიღებთ სხვადასხვა საგადახდო მეთოდს, მათ შორის საკრედიტო/სადებეტო ბარათებსა და საბანკო გადარიცხვებს. ფასები შეიძლება შეიცვალოს წინასწარი გაფრთხილების გარეშე."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "5. Order Processing and Delivery"
              : "5. შეკვეთის დამუშავება და მიწოდება"}
          </h2>
          <p>
            {language === "en"
              ? "After placing an order, you will receive a confirmation email. Orders are typically processed within 1-2 business days. Delivery times may vary depending on your location within Georgia. Standard delivery takes 3-5 business days in Tbilisi and up to 7 business days in other regions."
              : "შეკვეთის განთავსების შემდეგ თქვენ მიიღებთ დამადასტურებელ ელექტრონულ წერილს. შეკვეთები, როგორც წესი, მუშავდება 1-2 სამუშაო დღის განმავლობაში. მიწოდების დრო შეიძლება განსხვავდებოდეს საქართველოში თქვენი მდებარეობის მიხედვით. სტანდარტული მიწოდება სტანდარტული მიწოდება გრძელდება 3-5 სამუშაო დღე თბილისში და 7 სამუშაო დღემდე სხვა რეგიონებში."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "6. Product Availability"
              : "6. პროდუქტის ხელმისაწვდომობა"}
          </h2>
          <p>
            {language === "en"
              ? "We strive to keep our inventory updated, but in rare cases, a product may become unavailable after you place an order. If this occurs, we will notify you immediately and offer a refund or alternative product."
              : "ჩვენ ვცდილობთ შევინარჩუნოთ ჩვენი საწყობი განახლებული, მაგრამ იშვიათ შემთხვევებში, პროდუქტი შეიძლება გახდეს მიუწვდომელი თქვენი შეკვეთის განთავსების შემდეგ. თუ ეს მოხდება, ჩვენ დაუყოვნებლივ გაცნობებთ თქვენ და შემოგთავაზებთ თანხის დაბრუნებას ან ალტერნატიულ პროდუქტს."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "7. Intellectual Property"
              : "7. ინტელექტუალური საკუთრება"}
          </h2>
          <p>
            {language === "en"
              ? "All content on this website, including text, images, logos, and product descriptions, is the property of MyHunter or its content suppliers and is protected by Georgian and international copyright laws. Unauthorized use is prohibited."
              : "ამ ვებსაიტზე განთავსებული ყველა კონტენტი, მათ შორის ტექსტი, სურათები, ლოგოები და პროდუქტის აღწერები, წარმოადგენს MyHunter-ის ან მისი კონტენტის მომწოდებლების საკუთრებას და დაცულია საქართველოს და საერთაშორისო საავტორო უფლებების კანონებით. არაავტორიზებული გამოყენება აკრძალულია."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "8. Limitation of Liability"
              : "8. პასუხისმგებლობის შეზღუდვა"}
          </h2>
          <p>
            {language === "en"
              ? "MyHunter is not liable for any indirect, incidental, or consequential damages arising from the use of our products. Our liability is limited to the purchase price of the product. We are not responsible for misuse of products, especially firearms and ammunition."
              : "MyHunter არ არის პასუხისმგებელი არაპირდაპირ, შემთხვევით ან შედეგობრივ ზიანზე, რომელიც გამოწვეულია ჩვენი პროდუქტების გამოყენებით. ჩვენი პასუხისმგებლობა შემოიფარგლება პროდუქტის შესყიდვის ფასით. ჩვენ არ ვართ პასუხისმგებელნი პროდუქტების არასწორ გამოყენებაზე, განსაკუთრებით ცეცხლსასროლ იარაღსა და საბრძოლო მასალაზე."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "9. Safety and Compliance"
              : "9. უსაფრთხოება და შესაბამისობა"}
          </h2>
          <p>
            {language === "en"
              ? "Customers are responsible for using all products safely and in compliance with Georgian laws. This includes proper storage, handling, and usage of firearms, ammunition, and other potentially dangerous equipment. MyHunter promotes responsible hunting and fishing practices."
              : "მომხმარებლები პასუხისმგებელნი არიან ყველა პროდუქტის უსაფრთხოდ და საქართველოს კანონების შესაბამისად გამოყენებაზე. ეს მოიცავს ცეცხლსასროლი იარაღის, საბრძოლო მასალის და სხვა პოტენციურად სახიფათო აღჭურვილობის სწორ შენახვას, მოპყრობასა და გამოყენებას. MyHunter უწყობს ხელს პასუხისმგებლიან ნადირობისა და თევზაობის პრაქტიკას."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "10. Changes to Terms"
              : "10. პირობების ცვლილება"}
          </h2>
          <p>
            {language === "en"
              ? "MyHunter reserves the right to modify these terms and conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of the website after changes constitutes acceptance of the new terms."
              : "MyHunter-ს უფლება აქვს ნებისმიერ დროს შეცვალოს ეს წესები და პირობები. ცვლილებები გამოქვეყნდება ამ გვერდზე განახლებული ამოქმედების თარიღით. ვებსაიტის გამოყენების გაგრძელება ცვლილებების შემდეგ წარმოადგენს ახალი პირობების მიღებას."}
          </p>
        </div>

        <div className="terms-section">
          <h2>
            {language === "en"
              ? "11. Contact Information"
              : "11. საკონტაქტო ინფორმაცია"}
          </h2>
          <p>
            {language === "en"
              ? "If you have any questions about these Terms and Conditions, please contact us:"
              : "თუ გაქვთ რაიმე კითხვა ამ წესებსა და პირობებთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ:"}
          </p>
          <div className="terms-contact-info">
            <p>
              {language === "en" ? "Email: " : "ელ-ფოსტა: "}
              ssbbmarket@gmail.com
            </p>
            <p>
              {language === "en" ? "Phone: " : "ტელეფონი: "}
              +995 577 027 700
            </p>
            <p>
              {language === "en"
                ? "Address: Tbilisi, Georgia"
                : "მისამართი: თბილისი, საქართველო"}
            </p>
          </div>
        </div>

        <div className="effective-date">
          <p>
            <strong>
              {language === "en"
                ? "Last Updated: November 20, 2025"
                : "ბოლო განახლება: 20 ნოემბერი, 2025"}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
