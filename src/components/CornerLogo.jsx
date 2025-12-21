import logo from "../assets/LogoEcoAlfaTechnologies.svg";
import { uiConfig } from "../config/uiConfig.js";

export default function CornerLogo() {
  return (
    <div className="corner-footer">
      <span className="corner-footer-text">
        {uiConfig.messages.footer}
      </span>

      <img
        src={logo}
        alt="EcoAlfa Technologies"
        className="corner-logo"
      />
    </div>
  );
}



