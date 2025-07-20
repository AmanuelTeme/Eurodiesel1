import React from "react";
import { useTranslation } from "react-i18next";
import b3 from "../../../assets/images/banner/banner_22.jpg";
function TopBannerContactUs() {
  const { t } = useTranslation();
  return (
    <div>
      <section
        className="page-title contact-banner"
        style={{ backgroundImage: `url(${b3})` }}
      >
        <div className="banner-overlay"></div>
        <div className="auto-container">
          <h2>{t("Contact us")}</h2>
          <ul className="page-breadcrumb">
            <li>
              <a href="/">{t("home")}</a>
            </li>
            <li>{t("Contact us")}</li>
          </ul>
        </div>
        <h1 data-parallax='{"x": 200}'>{t("Car Repairing")}</h1>
      </section>
    </div>
  );
}

export default TopBannerContactUs;
