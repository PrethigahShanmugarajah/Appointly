// Client / src / context / AppContext.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const VITE_LOCALE = import.meta.env.VITE_LOCALE;

  const PORTFOLIO_NAME = import.meta.env.VITE_PORTFOLIO_NAME;

  const PORTFOLIO_URL = import.meta.env.VITE_PORTFOLIO_URL;

  const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL;

  const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL;

  const FACEBOOK_SHARE_URL = import.meta.env.VITE_FACEBOOK_SHARE_URL;

  const TIME_ZONE = import.meta.env.VITE_TIME_ZONE;

  const TIME_ZONES = import.meta.env.VITE_TIME_ZONES.split(",");

  const SUPPORT_EMAIL = import.meta.env.VITE_SUPPORT_EMAIL;

  const GOOGLE_API_SERVICES_POLICY_URL = import.meta.env
    .VITE_GOOGLE_API_SERVICES_POLICY_URL;

  const PRIVACY_POLICY_LAST_UPDATED = import.meta.env
    .VITE_PRIVACY_POLICY_LAST_UPDATED;

  const TERMS_OF_SERVICE_LAST_UPDATED = import.meta.env
    .VITE_TERMS_OF_SERVICE_LAST_UPDATED;

  const GOVERNING_LAW_COUNTRY = import.meta.env.VITE_GOVERNING_LAW_COUNTRY;

  const value = {
    navigate,
    location,
    CURRENCY,
    VITE_LOCALE,
    PORTFOLIO_NAME,
    PORTFOLIO_URL,
    WHATSAPP_URL,
    INSTAGRAM_URL,
    FACEBOOK_SHARE_URL,
    TIME_ZONE,
    TIME_ZONES,
    SUPPORT_EMAIL,
    GOOGLE_API_SERVICES_POLICY_URL,
    PRIVACY_POLICY_LAST_UPDATED,
    TERMS_OF_SERVICE_LAST_UPDATED,
    GOVERNING_LAW_COUNTRY,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
