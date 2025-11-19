"use client";

import { useLanguage } from "@/hooks/LanguageContext";
import "./return-policy.css";

export default function ReturnPolicy() {
  const { language } = useLanguage();

  return (
    <div className="return-container">
      <div className="return-content">
        <h1 className="return-title">
          {language === "en"
            ? "Return & Refund Policy"
            : "დაბრუნებისა და თანხის უკან დაბრუნების პოლიტიკა"}
        </h1>

        <div className="return-section">
          <h2>{language === "en" ? "1. Overview" : "1. მიმოხილვა"}</h2>
          <p>
            {language === "en"
              ? "At MyHunter, we are committed to providing high-quality hunting and fishing equipment. Due to the specialized nature of our products, especially firearms and ammunition, we have a strict return policy. We only accept returns for products with factory defects."
              : "MyHunter-ში ჩვენ ვართ პასუხისმგებელნი მაღალი ხარისხის სანადირო და სათევზაო ინვენტარის მიწოდებაზე. ჩვენი პროდუქტების სპეციალიზებული ხასიათის გამო, განსაკუთრებით ცეცხლსასროლი იარაღისა და საბრძოლო მასალის, ჩვენ გვაქვს მკაცრი დაბრუნების პოლიტიკა. ჩვენ ვიღებთ დაბრუნებას მხოლოდ ქარხნული წუნის მქონე პროდუქტებზე."}
          </p>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "2. Return Conditions"
              : "2. დაბრუნების პირობები"}
          </h2>
          <p>
            {language === "en"
              ? "We accept returns only under the following conditions:"
              : "ჩვენ ვიღებთ დაბრუნებას მხოლოდ შემდეგ პირობებში:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "The product has a verified factory defect or manufacturing flaw"
                : "პროდუქტს აქვს დადასტურებული ქარხნული წუნი ან წარმოების ხარვეზი"}
            </li>
            <li>
              {language === "en"
                ? "The defect was not caused by misuse, improper storage, or user error"
                : "დეფექტი არ არის გამოწვეული არასწორი გამოყენებით, შენახვით ან მომხმარებლის შეცდომით"}
            </li>
            <li>
              {language === "en"
                ? "The return request is made within 14 days of delivery"
                : "დაბრუნების მოთხოვნა გაკეთებულია მიწოდებიდან 14 დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "The product is in its original packaging with all accessories and documentation"
                : "პროდუქტი არის ორიგინალურ შეფუთვაში ყველა აქსესუართან და დოკუმენტაციასთან ერთად"}
            </li>
            <li>
              {language === "en"
                ? "The product has not been used, damaged, or altered"
                : "პროდუქტი არ არის გამოყენებული, დაზიანებული ან შეცვლილი"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "3. Non-Returnable Items"
              : "3. დაბრუნების არდაშვებული პროდუქტები"}
          </h2>
          <p>
            {language === "en"
              ? "The following items cannot be returned under any circumstances:"
              : "შემდეგი ნივთები არ შეიძლება დაბრუნდეს არანაირ გარემოებებში:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Ammunition and explosives (for safety and legal reasons)"
                : "საბრძოლო მასალა და ასაფეთქებელი ნივთიერებები (უსაფრთხოებისა და კანონიერების მიზეზით)"}
            </li>
            <li>
              {language === "en"
                ? "Used or opened products without factory defects"
                : "გამოყენებული ან გახსნილი პროდუქტები ქარხნული წუნის გარეშე"}
            </li>
            <li>
              {language === "en"
                ? "Custom-ordered or personalized items"
                : "შეკვეთით დამზადებული ან პერსონალიზებული ნივთები"}
            </li>
            <li>
              {language === "en"
                ? "Products damaged due to misuse or negligence"
                : "პროდუქტები, რომლებიც დაზიანდა არასწორი გამოყენების ან დაუდევრობის გამო"}
            </li>
            <li>
              {language === "en"
                ? "Clearance or sale items marked as final sale"
                : "გაყიდვის ან აქციის პროდუქტები, რომლებიც მონიშნულია როგორც საბოლოო გაყიდვა"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "4. Factory Defect Verification"
              : "4. ქარხნული წუნის დადასტურება"}
          </h2>
          <p>
            {language === "en"
              ? "To qualify for a return due to a factory defect, the following process must be followed:"
              : "ქარხნული წუნის გამო დაბრუნებისთვის, უნდა შესრულდეს შემდეგი პროცესი:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Contact our customer service within 14 days of receiving the product"
                : "დაუკავშირდით ჩვენს მომხმარებელთა სერვისს პროდუქტის მიღებიდან 14 დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "Provide detailed photos and description of the defect"
                : "მიაწოდეთ დეტალური ფოტოები და წუნის აღწერა"}
            </li>
            <li>
              {language === "en"
                ? "Our technical team will review your claim within 2-3 business days"
                : "ჩვენი ტექნიკური გუნდი განიხილავს თქვენს პრეტენზიას 2-3 სამუშაო დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "If approved, we will provide return shipping instructions"
                : "თუ დამტკიცდება, ჩვენ მოგაწოდებთ დაბრუნების ტრანსპორტირების ინსტრუქციებს"}
            </li>
            <li>
              {language === "en"
                ? "Upon receiving and inspecting the product, we will process your refund or replacement"
                : "პროდუქტის მიღებისა და შემოწმების შემდეგ, ჩვენ დავამუშავებთ თქვენს თანხის დაბრუნებას ან ჩანაცვლებას"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "5. Refund Process"
              : "5. თანხის დაბრუნების პროცესი"}
          </h2>
          <p>
            {language === "en"
              ? "Once your return is approved and received:"
              : "თქვენი დაბრუნების დამტკიცებისა და მიღების შემდეგ:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "We will inspect the returned item within 3-5 business days"
                : "ჩვენ შევამოწმებთ დაბრუნებულ ნივთს 3-5 სამუშაო დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "If the factory defect is confirmed, a full refund will be issued"
                : "თუ ქარხნული წუნი დადასტურდება, გადახდილი თანხა სრულად დაბრუნდება"}
            </li>
            <li>
              {language === "en"
                ? "Refunds are processed to the original payment method"
                : "თანხა უბრუნდება იმავე გადახდის მეთოდს, რომლითაც შეიძინეთ"}
            </li>
            <li>
              {language === "en"
                ? "Processing time varies by bank: 5-10 business days for cards, 3-7 days for bank transfers"
                : "დამუშავების დრო დამოკიდებულია ბანკზე: 5-10 სამუშაო დღე ბარათებისთვის, 3-7 დღე საბანკო გადარიცხვისთვის"}
            </li>
            <li>
              {language === "en"
                ? "Original shipping costs are non-refundable unless the defect was our error"
                : "თავდაპირველი ტრანსპორტირების ხარჯები არ ბრუნდება, თუ დეფექტი არ იყო ჩვენი შეცდომა"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "6. Replacement Options"
              : "6. ჩანაცვლების ვარიანტები"}
          </h2>
          <p>
            {language === "en"
              ? "For approved factory defect claims, you may choose:"
              : "დამტკიცებული ქარხნული წუნის პრეტენზიებისთვის, თქვენ შეგიძლიათ აირჩიოთ:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Full refund to your original payment method"
                : "თანხის სრული დაბრუნება თქვენს საწყის გადახდის მეთოდზე"}
            </li>
            <li>
              {language === "en"
                ? "Direct replacement with the same product (if available in stock)"
                : "პირდაპირი ჩანაცვლება იმავე პროდუქტით (თუ ხელმისაწვდომია საწყობში)"}
            </li>
            <li>
              {language === "en"
                ? "Store credit for the full amount, valid for 12 months"
                : "მაღაზიის კრედიტი სრული თანხით, ძალაშია 12 თვის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "Exchange for a different product of equal or greater value"
                : "გაცვლა სხვა პროდუქტზე თანაბარი ან უფრო მაღალი ღირებულებით"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "7. Shipping and Handling"
              : "7. ტრანსპორტირება და მიწოდება"}
          </h2>
          <p>
            {language === "en"
              ? "For approved returns:"
              : "დამტკიცებული დაბრუნებისთვის:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "We will provide a prepaid return shipping label for factory defects"
                : "ჩვენ მოგაწოდებთ წინასწარ გადახდილ დაბრუნების ტრანსპორტირების ეტიკეტს ქარხნული წუნისთვის"}
            </li>
            <li>
              {language === "en"
                ? "Pack the item securely in its original packaging"
                : "შეაფუთეთ ნივთი უსაფრთხოდ მის ორიგინალურ შეფუთვაში"}
            </li>
            <li>
              {language === "en"
                ? "Include all accessories, manuals, and documentation"
                : "ჩართეთ ყველა აქსესუარი, სახელმძღვანელო და დოკუმენტაცია"}
            </li>
            <li>
              {language === "en"
                ? "Ship via the courier service we specify"
                : "გაგზავნეთ კურიერული სერვისით, რომელსაც ჩვენ მივუთითებთ"}
            </li>
            <li>
              {language === "en"
                ? "Keep the tracking number for your records"
                : "შეინახეთ თვალთვალის ნომერი თქვენი ჩანაწერებისთვის"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "8. Damaged During Shipping"
              : "8. ტრანსპორტირების დროს დაზიანებული"}
          </h2>
          <p>
            {language === "en"
              ? "If your product arrives damaged:"
              : "თუ თქვენი პროდუქტი დაზიანებული მოვიდა:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Do not discard the packaging - photograph all damage immediately"
                : "არ გადაყაროთ შეფუთვა - დაუყოვნებლივ გადაუღეთ ფოტო ყველა დაზიანებას"}
            </li>
            <li>
              {language === "en"
                ? "Contact us within 48 hours of delivery with photos"
                : "დაგვიკავშირდით მიწოდებიდან 48 საათის განმავლობაში ფოტოებით"}
            </li>
            <li>
              {language === "en"
                ? "Note any damage on the delivery receipt before signing"
                : "აღნიშნეთ ნებისმიერი დაზიანება მიწოდების ქვითარზე ხელმოწერამდე"}
            </li>
            <li>
              {language === "en"
                ? "We will arrange immediate replacement or refund"
                : "ჩვენ მოვაწყობთ დაუყოვნებელ ჩანაცვლებას ან თანხის დაბრუნებას"}
            </li>
            <li>
              {language === "en"
                ? "Shipping damage claims are fully covered by MyHunter"
                : "ტრანსპორტირების დაზიანების პრეტენზიებს სრულად ფარავს MyHunter"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "9. Wrong Item Received"
              : "9. არასწორი პროდუქტის მიღება"}
          </h2>
          <p>
            {language === "en"
              ? "If you receive the wrong item:"
              : "თუ მიიღეთ არასწორი ნივთი:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Contact us immediately with your order number and photos"
                : "დაუყოვნებლივ დაგვიკავშირდით თქვენი შეკვეთის ნომრითა და ფოტოებით"}
            </li>
            <li>
              {language === "en"
                ? "We will arrange return pickup at no cost to you"
                : "ჩვენ მოვაწყობთ დაბრუნების აღებას თქვენთვის უფასოდ"}
            </li>
            <li>
              {language === "en"
                ? "The correct item will be shipped immediately"
                : "სწორი ნივთი გაიგზავნება დაუყოვნებლივ"}
            </li>
            <li>
              {language === "en"
                ? "Priority shipping will be provided at no extra charge"
                : "პრიორიტეტული ტრანსპორტირება მიეწოდება დამატებითი საფასურის გარეშე"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "10. Warranty Information"
              : "10. გარანტიის ინფორმაცია"}
          </h2>
          <p>
            {language === "en"
              ? "Many of our products come with manufacturer warranties:"
              : "ჩვენი მრავალი პროდუქტი მოდის მწარმოებლის გარანტიით:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Warranty periods vary by product and manufacturer (typically 1-5 years)"
                : "გარანტიის პერიოდები განსხვავდება პროდუქტისა და მწარმოებლის მიხედვით (ჩვეულებრივ 1-5 წელი)"}
            </li>
            <li>
              {language === "en"
                ? "Warranty covers manufacturing defects, not wear and tear or misuse"
                : "გარანტია ფარავს წარმოების დეფექტებს, არა ცვეთას ან არასწორ გამოყენებას"}
            </li>
            <li>
              {language === "en"
                ? "Keep your receipt and warranty card for warranty claims"
                : "შეინახეთ თქვენი ქვითარი და გარანტიის ბარათი გარანტიული პრეტენზიებისთვის"}
            </li>
            <li>
              {language === "en"
                ? "We facilitate warranty claims with manufacturers on your behalf"
                : "ჩვენ ვუწყობთ ხელს გარანტიულ პრეტენზიებს მწარმოებლებთან თქვენს სახელზე"}
            </li>
            <li>
              {language === "en"
                ? "Extended warranty options may be available for select products"
                : "გაფართოებული გარანტიის ვარიანტები შეიძლება იყოს ხელმისაწვდომი შერჩეული პროდუქტებისთვის"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "11. Customer Responsibility"
              : "11. მომხმარებლის პასუხისმგებლობა"}
          </h2>
          <p>
            {language === "en"
              ? "To ensure a smooth return process:"
              : "დაბრუნების გლუვი პროცესის უზრუნველსაყოფად:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Inspect products upon delivery and report issues within 48 hours"
                : "შეამოწმეთ პროდუქტები მიწოდებისას და მოგვახსენეთ პრობლემებს 48 საათში"}
            </li>
            <li>
              {language === "en"
                ? "Follow product care and maintenance instructions provided"
                : "მიჰყევით პროდუქტის მოვლისა და მოვლის ინსტრუქციებს"}
            </li>
            <li>
              {language === "en"
                ? "Use products only for their intended purpose"
                : "გამოიყენეთ პროდუქტები მხოლოდ მათი განკუთვნილი დანიშნულებით"}
            </li>
            <li>
              {language === "en"
                ? "Store firearms and ammunition according to Georgian law"
                : "შეინახეთ ცეცხლსასროლი იარაღი და საბრძოლო მასალა საქართველოს კანონის შესაბამისად"}
            </li>
            <li>
              {language === "en"
                ? "Keep all receipts, documentation, and packaging for potential returns"
                : "შეინახეთ ყველა ქვითარი, დოკუმენტაცია და შეფუთვა შესაძლო დაბრუნებისთვის"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "12. Contact for Returns"
              : "12. დაბრუნებისთვის საკონტაქტო"}
          </h2>
          <p>
            {language === "en"
              ? "To initiate a return or for questions about our return policy:"
              : "დაბრუნების დასაწყებად ან ჩვენი დაბრუნების პოლიტიკის შესახებ კითხვებისთვის:"}
          </p>
          <div className="return-contact-info">
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
                ? "Business Hours: Monday-Saturday, 10:00-19:00"
                : "სამუშაო საათები: ორშაბათი-შაბათი, 10:00-19:00"}
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
