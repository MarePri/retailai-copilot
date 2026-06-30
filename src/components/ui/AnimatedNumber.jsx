import { useCountUp } from "../../hooks/useCountUp.js";

export function AnimatedNumber({ value, decimals = 0, prefix = "", suffix = "", noSign = false, style, className }) {
  const displayed = useCountUp(value, { decimals });
  const number = decimals > 0 ? displayed.toFixed(decimals) : Math.round(displayed);
  const sign = !noSign && displayed >= 0 && value > 0 ? "+" : "";
  return (
    <span style={style} className={className}>
      {prefix}{sign}{number}{suffix}
    </span>
  );
}
