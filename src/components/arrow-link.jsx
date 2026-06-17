import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExternalLink } from "@/components/external-link";

/**
 * A name/title that links out to an external site, followed by an
 * upper-right arrow. Used for project titles and school/mentor names.
 * `arrowClassName` controls the arrow's size and any hover behaviour
 * (e.g. fading the arrow in only when the parent card is hovered).
 */
export function ArrowLink({ href, children, className, arrowClassName }) {
  return (
    <ExternalLink
      href={href}
      className={cn(
        "inline-flex items-center gap-1 transition-colors hover:text-emerald-300",
        className
      )}
    >
      {children}
      <ArrowUpRight className={cn("h-3.5 w-3.5", arrowClassName)} />
    </ExternalLink>
  );
}
