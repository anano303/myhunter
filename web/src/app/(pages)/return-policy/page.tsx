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
            ? "MyHunter – Return & Refund Policy"
            : "MyHunter – დაბრუნებისა და ანაზღაურების პოლიტიკა"}
        </h1>

        <div className="return-section">
          <h2>{language === "en" ? "1. Overview" : "1. მიმოხილვა"}</h2>
          <p>
            {language === "en"
              ? "MyHunter is committed to providing high-quality hunting, tactical, and fishing equipment. Due to the technical and specialized nature of our products—particularly firearm parts, optics, accessories, and tactical equipment—we maintain a clear and strict return policy."
              : "MyHunter უზრუნველყოფს მაღალი ხარისხის სანადირო, ტაქტიკური და სათევზაო ინვენტარის მიწოდებას. ჩვენი პროდუქტების სპეციფიკური და ტექნიკური ხასიათის გამო, განსაკუთრებით იარაღის ნაწილები, ოპტიკა, აქსესუარები და ტაქტიკური მოწყობილობები, მოქმედებს მკაფიო და მკაცრი დაბრუნების პოლიტიკა."}
          </p>
          <p>
            {language === "en"
              ? "We accept returns only in cases where the product contains a confirmed manufacturer defect, verified through visual inspection or an official manufacturer confirmation."
              : "ჩვენ ვიღებთ დაბრუნებას მხოლოდ იმ შემთხვევაში, როდესაც პროდუქტი ნამდვილად შეიცავს ქარხნულ დეფექტს, რომელიც დადასტურდება ვიზუალური შემოწმებით ან მწარმოებლის ოფიციალური დასკვნით."}
          </p>
          <p className="important-note">
            {language === "en"
              ? "MyHunter reserves the right to refuse a return if, upon inspection, it is determined that the defect is not a manufacturing flaw but was caused by customer action, error, mechanical damage, improper installation, or use under unsuitable conditions."
              : "MyHunter–ს უფლება აქვს უარი თქვას დაბრუნებაზე, თუ პროდუქტის შემოწმებისას აღმოჩნდება, რომ დეფექტი არ წარმოადგენს ქარხნულ წუნს, არამედ გამოწვეულია მომხმარებლის ქმედებით, შეცდომით, მექანიკური დაზიანებით, არასწორი ინსტალაციით ან შეუსაბამო პირობებში გამოყენებით."}
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
              ? "A return is accepted only under the following conditions:"
              : "დაბრუნება მიიღება მხოლოდ შემდეგ პირობებში:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "A confirmed manufacturer defect or production flaw is present"
                : "დადასტურებული ქარხნული წუნი ან წარმოების ხარვეზი"}
            </li>
            <li>
              {language === "en"
                ? "The defect must not be caused by the customer's actions—misuse, improper installation, modification, damage, or improper storage"
                : "დეფექტი არ უნდა იყოს გამოწვეული მომხმარებლის მოქმედებით — არასწორი გამოყენება, მონტაჟი, მოდიფიკაცია, დაზიანება ან არასწორი შენახვა"}
            </li>
            <li className="important-note">
              {language === "en"
                ? "Any damage caused by improper installation (e.g., excessive mounting torque, incorrect ring sizes, wrong collimator/footprint selection, etc.) is not covered by warranty or return policy"
                : "ნებისმიერი ზიანი, რომელიც გამოწვეულია არასათანადო ინსტალაციით (მაგ. ზედმეტი დამჭერის ძალა, არასწორი ზომის რინგები, არასწორი კოლიმატორის/ფუტპრინტის შერჩევა და სხვ.), არ ექვემდებარება არც გარანტიას, არც დაბრუნებას"}
            </li>
            <li>
              {language === "en"
                ? "The return request is submitted within 14 days of delivery"
                : "დაბრუნების მოთხოვნა გაკეთებულია მიწოდებიდან 14 დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "The product must be in its original packaging, including all accessories, manuals, and documentation"
                : "პროდუქტი უნდა იყოს ორიგინალურ შეფუთვაში, ყველა აქსესუართან, ბროშურასთან და დოკუმენტთან ერთად"}
            </li>
            <li>
              {language === "en"
                ? "The product must not be used, altered, or damaged"
                : "პროდუქტი არ უნდა იყოს გამოყენებული, დაზიანებული ან შეცვლილი"}
            </li>
            <li>
              {language === "en"
                ? "In case of visible cosmetic defects, the issue must be reported immediately upon delivery"
                : "ვიზუალური დეფექტის შემთხვევაში, დაზიანება უნდა იყოს დაფიქსირებული პროდუქტის მიღებისთანავე"}
            </li>
          </ul>
          <div className="warning-box">
            <h4>
              {language === "en" ? "Diagnostic Cost" : "დიაგნოსტიკის ხარჯი"}
            </h4>
            <p>
              {language === "en"
                ? "If the returned product is found to be fully functional and defect-free upon inspection, MyHunter reserves the right not to issue a refund or replacement. Additionally, the customer will be responsible for covering round-trip shipping costs."
                : "თუ დაბრუნებული პროდუქტი შემოწმებისას აღმოჩნდება სრულად გამართული და დეფექტის გარეშე, MyHunter–ს უფლება აქვს არ დააბრუნოს თანხა და არ განახორციელოს ჩანაცვლება. ასევე, მომხმარებელი ვალდებულია დაფაროს ორმხრივი ტრანსპორტირების ხარჯი."}
            </p>
          </div>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "3. Non-Returnable Items"
              : "3. დაბრუნების არდაშვებული პროდუქტები"}
          </h2>
          <p>
            {language === "en"
              ? "For safety reasons and due to product specificity, the following items cannot be returned:"
              : "მომხმარებლის უსაფრთხოებისა და პროდუქციის სპეციფიკის გამო, შემდეგი ნივთები არ ექვემდებარება დაბრუნებას:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Ammunition, explosives, and all potentially hazardous categories"
                : "საბრძოლო მასალა, ასაფეთქებლები და ნებისმიერი პოტენციურად საშიში კატეგორია"}
            </li>
            <li>
              {language === "en"
                ? "Any product that has been opened, used, or tested and does not have a manufacturing defect"
                : "ნებისმიერი პროდუქტი, რომელიც გამოყენებულია ან გახსნილია და არ აქვს ქარხნული წუნი"}
            </li>
            <li>
              {language === "en"
                ? "Customized or special-order items"
                : "პერსონალიზებული ან შეკვეთით დამზადებული ნივთები"}
            </li>
            <li>
              {language === "en"
                ? "Products damaged due to improper installation, misuse, or negligence"
                : "პროდუქტები, რომლებიც დაზიანდა მონტაჟის, არასწორი გამოყენების ან დაუდევრობის შედეგად"}
            </li>
            <li className="important-note">
              {language === "en"
                ? "Final Sale and promotional products are not eligible for returns or replacements, except in cases of obvious and confirmed manufacturer defects"
                : "Final Sale და აქციის პროდუქტებზე არ მოქმედებს არც დაბრუნება, არც ჩანაცვლება, გარდა მწარმოებლის აშკარა და დადასტურებული ქარხნული წუნისა"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "4. Manufacturer Defect Verification"
              : "4. ქარხნული წუნის დადასტურება"}
          </h2>
          <p>
            {language === "en"
              ? "To initiate a return due to a potential manufacturing defect:"
              : "დაბრუნების პროცესის დასაწყებად:"}
          </p>
          <ol>
            <li>
              {language === "en"
                ? "Contact us within 14 days of receiving the product"
                : "დაგვიკავშირდით 14 დღის განმავლობაში"}
            </li>
            <li>
              {language === "en"
                ? "Provide detailed photos/videos showing the defect"
                : "მოგვაწოდეთ დეტალური ფოტოები/ვიდეოები დეფექტის შესახებ"}
            </li>
            <li>
              {language === "en"
                ? "Our technical team will review the claim within 2–3 business days"
                : "ჩვენი ტექნიკური ჯგუფი განიხილავს პრეტენზიას 2–3 სამუშაო დღეში"}
            </li>
            <li>
              {language === "en"
                ? "If approved, we will provide return shipping instructions"
                : "დამტკიცების შემთხვევაში მიიღებთ ინსტრუქციებს დაბრუნების შესახებ"}
            </li>
            <li>
              {language === "en"
                ? "After receiving and inspecting the product, we will process your refund or replacement"
                : "პროდუქტის მიღებისა და შემოწმების შემდეგ მოხდება თანხის დაბრუნება ან ჩანაცვლება"}
            </li>
          </ol>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "5. Refund Processing"
              : "5. თანხის დაბრუნების პროცესი"}
          </h2>
          <p>
            {language === "en"
              ? "Once the returned item is received and approved:"
              : "დამტკიცებული დაბრუნების მიღების შემდეგ:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Inspection takes 3–5 business days"
                : "პროდუქტის შემოწმება ხდება 3–5 სამუშაო დღეში"}
            </li>
            <li>
              {language === "en"
                ? "If a defect is confirmed, a full refund will be issued"
                : "თუ დეფექტი დადასტურდება, თანხა სრულად დაბრუნდება"}
            </li>
            <li>
              {language === "en"
                ? "Refunds are sent to the original method of payment"
                : "თანხა ბრუნდება იმავე გადახდის მეთოდით"}
            </li>
            <li>
              {language === "en"
                ? "Banking processing times: Cards: 5–10 business days; Bank transfer: 3–7 business days"
                : "ბანკის დამუშავების დრო: ბარათები: 5–10 სამუშაო დღე; საბანკო გადარიცხვა: 3–7 სამუშაო დღე"}
            </li>
            <li>
              {language === "en"
                ? "Shipping costs are non-refundable unless the error was caused by MyHunter"
                : "ტრანსპორტირების ხარჯები არ ბრუნდება, გარდა იმ შემთხვევისა, როდესაც შეცდომა მოხდა MyHunter-ის მხრიდან"}
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
              ? "If a manufacturing defect is confirmed, you may choose:"
              : "დადასტურებული ქარხნული დეფექტის შემთხვევაში შეგიძლიათ აირჩიოთ:"}
          </p>
          <ul>
            <li>
              {language === "en" ? "Full refund" : "თანხის სრული დაბრუნება"}
            </li>
            <li>
              {language === "en"
                ? "Replacement with the same product (if available in stock)"
                : "იმავე მოდელის პროდუქტის ჩანაცვლება (თუ არის მარაგში)"}
            </li>
            <li>
              {language === "en"
                ? "Store credit valid for 12 months"
                : "მაღაზიის კრედიტი (12 თვის ვადით)"}
            </li>
            <li>
              {language === "en"
                ? "Exchange for another product of equal or higher value (with price difference covered by the customer)"
                : "გაცვლა სხვა პროდუქტზე უფრო მაღალი ღირებულებით — ფასის სხვაობის დაფარვით"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "7. Return Shipping"
              : "7. დაბრუნების ტრანსპორტირება"}
          </h2>
          <p>
            {language === "en"
              ? "If the defect claim is approved:"
              : "დამტკიცებული დეფექტის შემთხვევაში:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "You will receive a prepaid return shipping label"
                : "მოგეცემათ წინასწარ გადახდილი დაბრუნების ეტიკეტი"}
            </li>
            <li>
              {language === "en"
                ? "The product must be securely packaged in its original packaging with all components"
                : "პროდუქტი უნდა გაიგზავნოს ორიგინალურ შეფუთვაში, უსაფრთხოდ, სრული კომპლექტაციით"}
            </li>
            <li>
              {language === "en"
                ? "Returns must be shipped using the courier service specified by MyHunter"
                : "დაბრუნება უნდა მოხდეს მხოლოდ იმ კურიერული მომსახურებით, რომელსაც MyHunter მიუთითებს"}
            </li>
            <li>
              {language === "en"
                ? "Customers must retain the tracking number"
                : "თვალთვალის ნომერი უნდა შეინახოთ"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "8. Products Damaged During Shipping"
              : "8. ტრანსპორტირების დროს დაზიანებული პროდუქტი"}
          </h2>
          <p>
            {language === "en"
              ? "If the product arrives damaged:"
              : "თუ პროდუქტი ჩამოვიდა დაზიანებული:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Do not discard the packaging"
                : "შეფუთვა არ გადაყაროთ"}
            </li>
            <li>
              {language === "en"
                ? "Take photos of all damage (product + box)"
                : "გადაიღეთ ყველა მხარე/დეტალი"}
            </li>
            <li>
              {language === "en"
                ? "Contact us within 48 hours of delivery"
                : "დაგვიკავშირდით მიწოდებიდან 48 საათში"}
            </li>
            <li>
              {language === "en"
                ? "MyHunter will arrange an immediate replacement or refund"
                : "MyHunter უზრუნველყოფს დაუყოვნებელ ჩანაცვლებას ან თანხის დაბრუნებას"}
            </li>
            <li>
              {language === "en"
                ? "All shipping-related damage claims are fully covered by MyHunter"
                : "ტრანსპორტირების დაზიანებას სრულად ფარავს MyHunter"}
            </li>
          </ul>
          <div className="warning-box">
            <h4>
              {language === "en" ? "Additional Condition" : "დამატებითი პირობა"}
            </h4>
            <ul>
              <li>
                {language === "en"
                  ? "If only the outer packaging (box/bag) is damaged but the product inside is completely undamaged, fully functional, and free of defects, no refund or replacement will be issued"
                  : "თუ მხოლოდ შეფუთვა (ყუთი/პაკეტი) არის დაზიანებული, ხოლო შიგთავსი/პროდუქტი დაუზიანებელია სრულად ფუნქციონალურად და არ აქვს დეფექტი — თანხა არ ბრუნდება და ჩანაცვლება არ ხდება"}
              </li>
              <li>
                {language === "en"
                  ? "Minor cosmetic defects caused by packaging damage (micro scratches, slight color variations, etc.) do not constitute a manufacturing defect"
                  : "შეფუთვისგან/შეფუთვის დაზიანებისგან გამოწვეული მცირე ესთეტიკური დეფექტები (მიკრო ნაკაწრები, მცირე შეღებვის სხვაობა და ა.შ.) არ წარმოადგენს ქარხნულ წუნს"}
              </li>
            </ul>
            <p>
              {language === "en"
                ? "This rule applies if: the product is in 100% perfect visual and technical condition; it is confirmed that only the packaging suffered damage; the product is not a collectible or sensitive item where packaging significantly affects value."
                : "ეს პირობა მუშაობს შემდეგ შემთხვევაში: პროდუქტი არ აღემატება 100% სრულყოფილ ვიზუალურ და ტექნიკურ მდგომარეობას; დადასტურდება, რომ დაზიანება ეხება მხოლოდ გარე შეფუთვას; პროდუქტი არ არის კოლექციური ან ისეთი კატეგორია, სადაც შეფუთვა წარმოადგენს მნიშვნელოვანი ღირებულების ნაწილს."}
            </p>
          </div>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "9. Incorrect Item Received"
              : "9. არასწორი პროდუქტის მიღება"}
          </h2>
          <p>
            {language === "en"
              ? "If you receive an incorrect product:"
              : "თუ მიიღეთ არასწორი ნივთი:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Contact us immediately"
                : "დაუყოვნებლივ დაგვიკავშირდით"}
            </li>
            <li>
              {language === "en"
                ? "Provide photos and the order number"
                : "მოგვაწოდეთ შეკვეთის ნომერი და ფოტოები"}
            </li>
            <li>
              {language === "en"
                ? "We will arrange free return shipping"
                : "ჩვენ მოვაწყობთ უფასო დაბრუნებას"}
            </li>
            <li>
              {language === "en"
                ? "The correct item will be shipped with priority processing at no additional cost"
                : "სწორი პროდუქტი იგზავნება პრიორიტეტულად, დამატებითი საფასურის გარეშე"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "10. Warranty Conditions"
              : "10. გარანტიის პირობები"}
          </h2>
          <p>
            {language === "en"
              ? "Many products come with a manufacturer warranty:"
              : "ბევრ პროდუქტს აქვს მწარმოებლის გარანტია:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Warranty periods range from 1 to 5 years, depending on the item"
                : "გარანტიის ვადა: 1–5 წელი, პროდუქტის მიხედვით"}
            </li>
            <li>
              {language === "en"
                ? "Warranty covers manufacturing defects only"
                : "გარანტია ფარავს მხოლოდ წარმოების დეფექტებს"}
            </li>
            <li>
              {language === "en"
                ? "Warranty does not cover: wear and tear; improper use; unauthorized repairs/modifications; incorrect installation"
                : "გარანტია არ ფარავს: ცვეთას; არასწორ ექსპლუატაციას; თვითნებურ რემონტს; არასწორ მონტაჟს"}
            </li>
            <li>
              {language === "en"
                ? "A receipt and warranty card (if applicable) are required for warranty service"
                : "გარანტიის მოთხოვნისთვის აუცილებელია ქვითარი და დოკუმენტაცია"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "11. Customer Responsibilities"
              : "11. მომხმარებლის პასუხისმგებლობა"}
          </h2>
          <p>
            {language === "en"
              ? "Customers must:"
              : "მომხმარებელმა უნდა უზრუნველყოს:"}
          </p>
          <ul>
            <li>
              {language === "en"
                ? "Inspect all products upon delivery (within 48 hours)"
                : "პროდუქტის შემოწმება მიწოდებისთანავე (48 საათში)"}
            </li>
            <li>
              {language === "en"
                ? "Use products according to all provided instructions"
                : "პროდუქტის სწორად გამოყენება ინსტრუქციის შესაბამისად"}
            </li>
            <li>
              {language === "en"
                ? "Store firearm parts, ammunition, and tactical equipment in compliance with Georgian law"
                : "იარაღისა და საბრძოლო მასალის შენახვა საქართველოს კანონმდებლობის შესაბამისად"}
            </li>
            <li>
              {language === "en"
                ? "Retain all receipts, documentation, and packaging for potential returns"
                : "ყველა დოკუმენტაციის, ქვითრისა და შეფუთვის შენახვა"}
            </li>
            <li className="important-note">
              {language === "en"
                ? "Product installation performed by a third party (technician, service center, etc.) is the sole responsibility of that party and not MyHunter"
                : "პროდუქტის ინსტალაცია რომელიც შესრულებულია მესამე პირის მიერ (ოსტატი, სერვისი და ა.შ.), პასუხისმგებლობას მთლიანად იღებს აღნიშნული პირი და არა MyHunter"}
            </li>
          </ul>
        </div>

        <div className="return-section">
          <h2>
            {language === "en"
              ? "12. Return Contact Information"
              : "12. დაბრუნების საკონტაქტო ინფორმაცია"}
          </h2>
          <p>
            {language === "en"
              ? "To begin a return request or for questions regarding our return policy:"
              : "დაბრუნების პროცესის დასაწყებად დაგვიკავშირდით:"}
          </p>
          <div className="return-contact-info">
            <p>
              📧 {language === "en" ? "Email: " : "ელ-ფოსტა: "}
              ssbbmarket@gmail.com
            </p>
            <p>
              📞 {language === "en" ? "Phone: " : "ტელეფონი: "}
              +995 577 027 700
            </p>
            <p>
              ⏱{" "}
              {language === "en"
                ? "Hours: Monday–Saturday, 10:00–19:00"
                : "სამუშაო საათები: ორშაბათი–შაბათი, 10:00–19:00"}
            </p>
          </div>
        </div>

        <div className="effective-date">
          <p>
            <strong>
              {language === "en"
                ? "Last Updated: December 10, 2025"
                : "ბოლო განახლება: 10 დეკემბერი, 2025"}
            </strong>
          </p>
        </div>

        <div className="download-section">
          <a
            href="/return.pdf"
            download="MyHunter_Return_Policy.pdf"
            className="download-btn"
          >
            📥{" "}
            {language === "en"
              ? "Download Return Policy (PDF)"
              : "დაბრუნების პოლიტიკის ჩამოტვირთვა (PDF)"}
          </a>
        </div>
      </div>
    </div>
  );
}
