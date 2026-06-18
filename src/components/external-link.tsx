import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode;
  };

// next/link that opens in a new tab with rel="noopener noreferrer" applied
// consistently. Extra props (className, aria-label, ...) pass through.
export function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Link>
  );
}
