import {
  emeraldBanner,
  cyanBanner,
  roseBanner,
  whiteBanner,
  limeBanner,
} from "../assets/assets";

/* -------- Brand Theme Styles -------- */
export const brandThemeStyles = {
  green: {
    panel: "#022c22",
    panelDeep: "#052e16",
    panelSoft: "#14532D",
    bg: "bg-[#022c22]",
    gradient: "from-[#052e16] to-[#14532D]/80",
    button: "bg-[#15803D]",
    avatar: "bg-[#22C55E]",
    accent: "#15803D",
  },

  blue: {
    panel: "#1E3A8A",
    panelDeep: "#1E3A8A",
    panelSoft: "#1D4ED8",
    bg: "bg-[#1E3A8A]",
    gradient: "from-[#1E3A8A] to-[#1D4ED8]/80",
    button: "bg-[#1976D2]",
    avatar: "bg-[#3B82F6]",
    accent: "#1E3A8A",
  },

  red: {
    panel: "#7F1D1D",
    panelDeep: "#7F1D1D",
    panelSoft: "#991B1B",
    bg: "bg-[#7F1D1D]",
    gradient: "from-[#7F1D1D] to-[#991B1B]/80",
    button: "bg-[#B91C1C]",
    avatar: "bg-[#EF4444]",
    accent: "#DC2626",
  },

  orange: {
    panel: "#9A3412",
    panelDeep: "#9A3412",
    panelSoft: "#7C2D12",
    bg: "bg-[#9A3412]",
    gradient: "from-[#9A3412] to-[#7C2D12]/80",
    button: "bg-[#C2410C]",
    avatar: "bg-[#F97316]",
    accent: "#EA580C",
  },

  gray: {
    panel: "#111827",
    panelDeep: "#030712",
    panelSoft: "#1F2937",
    bg: "bg-[#111827]",
    gradient: "from-[#030712] to-[#1F2937]/80",
    button: "bg-[#374151]",
    avatar: "bg-[#6B7280]",
    accent: "#111827",
  },
};

/* -------- Brand Theme Banner Images -------- */
export const themeBannerImages = {
  green: emeraldBanner,
  blue: cyanBanner,
  red: roseBanner,
  orange: limeBanner,
  gray: whiteBanner,
};

/* -------- Brand Theme Options -------- */
export const brandThemeOptions = [
  {
    id: "green",
    label: "Green",
    accent: "#15803D",
    swatch: "bg-green-500",
  },
  {
    id: "blue",
    label: "Blue",
    accent: "#1E3A8A",
    swatch: "bg-[#1E3A8A]",
  },
  {
    id: "red",
    label: "Red",
    accent: "#DC2626",
    swatch: "bg-red-500",
  },
  {
    id: "orange",
    label: "Orange",
    accent: "#EA580C",
    swatch: "bg-orange-500",
  },
  {
    id: "gray",
    label: "Gray",
    accent: "#111827",
    swatch: "bg-gray-900",
  },
];
