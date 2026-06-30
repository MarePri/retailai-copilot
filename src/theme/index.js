import { createContext, useContext } from "react";

export const darkC = {
  bg: "#0D1117",
  surface: "#141B24",
  panel: "#1C2533",
  border: "#253347",
  borderHover: "#334459",
  accent: "#4F8EF7",
  accentGlow: "rgba(79,142,247,0.20)",
  accentSoft: "rgba(79,142,247,0.12)",
  emerald: "#10B981",
  emeraldGlow: "rgba(16,185,129,0.15)",
  amber: "#F59E0B",
  amberGlow: "rgba(245,158,11,0.15)",
  rose: "#F43F5E",
  roseGlow: "rgba(244,63,94,0.15)",
  violet: "#8B5CF6",
  violetGlow: "rgba(139,92,246,0.15)",
  text: "#F0F4FF",
  textMid: "#9BA5BB",
  textDim: "#5A6578",
  white: "#FFFFFF",
};

export const lightC = {
  bg: "#F4F6FA",
  surface: "#FFFFFF",
  panel: "#F0F3F8",
  border: "#DDE3EE",
  borderHover: "#C8D0E0",
  accent: "#2563EB",
  accentGlow: "rgba(37,99,235,0.12)",
  accentSoft: "rgba(37,99,235,0.08)",
  emerald: "#059669",
  emeraldGlow: "rgba(5,150,105,0.10)",
  amber: "#D97706",
  amberGlow: "rgba(217,119,6,0.10)",
  rose: "#E11D48",
  roseGlow: "rgba(225,29,72,0.10)",
  violet: "#7C3AED",
  violetGlow: "rgba(124,58,237,0.10)",
  text: "#1E293B",
  textMid: "#4B5563",
  textDim: "#9CA3AF",
  white: "#0F172A",
};

export const ThemeContext = createContext(darkC);
export const useTheme = () => useContext(ThemeContext);
