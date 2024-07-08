import React from "react";
import "../../CSS/footer.css"; // Make sure to create this CSS file and include the styles

const footerSections = [
  {
    title: "Company Category",
    items: [
      "Real Estate",
      "Financial Services",
      "Investment Service Provider",
      "Educational Institutions",
    ],
  },
  {
    title: "Individual Category",
    items: ["Financial Advisor", "International Consumers", "Financial Expert"],
  },
  {
    title: "Services",
    items: ["Partner", "Capital", "Market", "Smart Invesment"],
  },
  {
    title: "Company",
    items: ["About Us", "Blog", "FAQ"],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="company">
          <span id="footer-logo">
            <img src="/logoIMP.png" alt="" />
          </span>
          <p>
            Rajawali street No.45, Magelang New City, Central Java 6725
            Indonesia
          </p>
          <div className="social-icon">
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-facebook-f"></i>
          </div>
        </div>
        {footerSections.map((section, index) => (
          <div className="company-style" key={index}>
            <p>{section.title}</p>
            <ul>
              {section.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div id="copy-right">
        <p>&copy; 2024 Merchants All right reserved</p>
        <p>Privacy Policy Terms Of Use</p>
      </div>
    </footer>
  );
};

export default Footer;
