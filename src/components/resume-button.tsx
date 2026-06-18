import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { RESUME_PATH } from "@/lib/site";

// CV / résumé link — opens the PDF in a new tab. Shared by the navbar and hero.
export function ResumeButton({
  size = "md",
  className,
  children,
}: {
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Button asChild variant="outline" size={size} className={className}>
      <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Button>
  );
}
