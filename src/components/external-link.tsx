import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
    newTabLabel?: string;
  };

// next/link that opens in a new tab with rel="noopener noreferrer" applied
// consistently. Extra props (className, aria-label, ...) pass through.
export function ExternalLink({ href, children, newTabLabel, ...props }: ExternalLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      {newTabLabel ? <span className="sr-only"> ({newTabLabel})</span> : null}
    </Link>
  );
}
