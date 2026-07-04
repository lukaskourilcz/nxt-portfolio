import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";

// External link with a trailing up-right arrow (project titles, school names).
// `arrowClassName` sets the arrow's size and hover behaviour.
export function ArrowLink({
  href,
  children,
  className,
  arrowClassName,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  arrowClassName?: string;
}) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        "inline-flex items-center gap-1 transition-colors hover:text-white light:hover:text-black",
        className
      )}
    >
      {children}
      <ArrowUpRight className={cn("h-3.5 w-3.5", arrowClassName)} />
    </ExternalLink>
  );
}
