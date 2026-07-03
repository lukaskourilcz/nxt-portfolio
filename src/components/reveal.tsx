"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type RevealTag = "div" | "section" | "article" | "li" | "ul" | "ol" | "span";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
} & Omit<HTMLMotionProps<"div">, "children" | "ref">;

/**
 * Lightweight fade-up-on-scroll wrapper so every section animates in the
 * same way. `as` picks the underlying motion element (div, section, li, ...).
 * Honors the user's prefers-reduced-motion setting.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  as = "div",
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = (motion[as] ?? motion.div) as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut", delay }
      }
      {...props}
    >
      {children}
    </MotionTag>
  );
}
