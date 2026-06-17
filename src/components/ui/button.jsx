import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Shared button styling for the site's two call-to-action looks.
// - solid   → light filled button that turns emerald on hover (primary CTA)
// - outline → bordered/ghost button that turns emerald on hover (secondary)
// Sizes: "md" for in-page CTAs, "sm" for the compact navbar résumé button.
const buttonVariants = cva(
  "inline-flex items-center gap-2 rounded-md transition-colors",
  {
    variants: {
      variant: {
        solid:
          "bg-zinc-100 text-zinc-900 hover:bg-emerald-400 hover:text-zinc-900",
        outline:
          "border border-zinc-700 text-zinc-300 hover:border-emerald-500 hover:text-emerald-400",
      },
      size: {
        md: "px-5 py-2.5 text-sm font-medium",
        sm: "px-3 py-1.5 font-mono text-xs",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
);

/**
 * Renders a real <button> by default, or — with `asChild` — applies the button
 * styling to whatever single element you nest inside (a Next.js <Link>, a
 * download <a>, ...). Most "buttons" on this site are actually links, so
 * `asChild` is the common case.
 */
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
