import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Standard content section wrapper: centered, max-width, consistent vertical
// rhythm. Used by every page section except the hero.
export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("mx-auto max-w-5xl px-6 py-12 sm:py-24", className)}
    >
      {children}
    </section>
  );
}
