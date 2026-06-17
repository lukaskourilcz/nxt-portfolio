import Link from "next/link";

/**
 * A Next.js link that opens in a new browser tab. Centralises the
 * target/rel pair so every outbound link is consistently safe:
 * rel="noopener noreferrer" stops the new tab from gaining access to our
 * window via window.opener. All other props (className, aria-label, ...) are
 * forwarded to the underlying link.
 */
export function ExternalLink({ href, children, ...props }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </Link>
  );
}
