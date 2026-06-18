import type { ComponentType, CSSProperties } from "react";

// Any icon we render by passing className/style: a lucide-react icon or one of
// the inline brand/SVG components in the codebase.
export type IconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

// A social / contact link rendered as an icon (GitHub, LinkedIn, email, ...).
export type Social = {
  href: string;
  label: string;
  Icon: IconComponent;
};
