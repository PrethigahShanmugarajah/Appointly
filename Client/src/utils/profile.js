// Client / src / utils / profile.js
import {
  greenBanner,
  purpleBanner,
  redBanner,
  whiteBanner,
  yellowBanner,
} from "../assets/assets";

/* -------- Get Calendar Message -------- */
export const getCalendarMessage = (value) => {
  if (value === "connected") return "Google Calendar connected successfully.";
  if (value) return "Google Calendar connection was not completed";
  return "";
};

/* -------- Brand Theme Styles -------- */
export const brandThemeStyles = {
  emerald: {
    panel: "#052e16",
    panelDeep: "#022c22",
    panelSoft: "#064e3b",
    bg: "bg-[#052e16]",
    gradient: "from-[#022c22] to-[#064e3b]/80",
    button: "bg-[#047857]",
    avatar: "bg-[#10b981]",
    accent: "#047857",
  },

  indigo: {
    panel: "#1e104f",
    panelDeep: "#1e104f",
    panelSoft: "#312e81",
    bg: "bg-[#1e104f]",
    gradient: "from-[#1e104f] to-[#312e81]/80",
    button: "bg-[#4338ca]",
    avatar: "bg-[#6366f1]",
    accent: "#1e104f",
  },

  rose: {
    panel: "#4c0519",
    panelDeep: "#4c0519",
    panelSoft: "#881337",
    bg: "bg-[#4c0519]",
    gradient: "from-[#4c0519] to-[#881337]/80",
    button: "bg-[#be123c]",
    avatar: "bg-[#f43f5e]",
    accent: "#e11d48",
  },

  amber: {
    panel: "#451a03",
    panelDeep: "#451a03",
    panelSoft: "#78350f",
    bg: "bg-[#451a03]",
    gradient: "from-[#451a03] to-[#78350f]/80",
    button: "bg-[#b45309]",
    avatar: "bg-[#f59e0b]",
    accent: "#d97706",
  },

  slate: {
    panel: "#0f172a",
    panelDeep: "#020617",
    panelSoft: "#1e293b",
    bg: "bg-[#0f172a]",
    gradient: "from-[#020617] to-[#1e293b]/80",
    button: "bg-[#334155]",
    avatar: "bg-[#64748b]",
    accent: "#0f172a",
  },
};

/* -------- Brand Theme Banner Images -------- */
export const themeBannerImages = {
  emerald: greenBanner,
  indigo: purpleBanner,
  rose: redBanner,
  amber: yellowBanner,
  slate: whiteBanner,
};

/* -------- Brand Theme Options -------- */
export const brandThemeOptions = [
  {
    id: "emerald",
    label: "Emerald",
    accent: "#047857",
    swatch: "bg-emerald-500",
  },
  {
    id: "indigo",
    label: "Indigo",
    accent: "#1e104f",
    swatch: "bg-[#1e104f]",
  },
  {
    id: "rose",
    label: "Rose",
    accent: "#e11d48",
    swatch: "bg-rose-500",
  },
  {
    id: "amber",
    label: "Amber",
    accent: "#d97706",
    swatch: "bg-amber-500",
  },
  {
    id: "slate",
    label: "Slate",
    accent: "#0f172a",
    swatch: "bg-slate-900",
  },
];

/* -------- Get Message Banner Class -------- */
export const getMessageBannerClass = (msg) => {
  if (!msg) return "";

  return msg.toLowerCase().includes("success") || msg.includes("updated")
    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
    : "bg-rose-50 text-rose-700 border-rose-100";
};

/* -------- Get Public Booking Link -------- */
export const getPublicBookingLink = (slug) => {
  return slug
    ? `${window.location.origin}/book/${slug}`
    : `${window.location.origin}`;
};
