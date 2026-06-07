"use client";

import { motion } from "framer-motion";

/**
 * Lightweight fade-up-on-scroll wrapper so every section animates in the
 * same way. `as` picks the underlying motion element (div, section, li, ...).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
  as = "div",
  ...props
}) {
  const MotionTag = motion[as] ?? motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
