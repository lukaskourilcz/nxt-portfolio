import Link from "next/link";

// next/link that opens in a new tab with rel="noopener noreferrer" applied
// consistently. Extra props (className, aria-label, ...) pass through.
export function ExternalLink({ href, children, ...props }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Link>
  );
}
