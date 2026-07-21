import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      aria-labelledby={`${id}-heading`}
      className={cn("mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24", className)}
    >
      {children}
    </section>
  );
}
