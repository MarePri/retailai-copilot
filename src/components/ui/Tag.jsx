import { useTheme } from "../../theme/index.js";

export function Tag({ children, color: colorProp }) {
  const C = useTheme();
  const color = colorProp ?? C.accent;
  return (
    <span style={{
      background: `${color}12`, color, border: `1px solid ${color}25`,
      borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 600,
      textTransform: "uppercase", letterSpacing: "0.06em",
    }}>
      {children}
    </span>
  );
}
