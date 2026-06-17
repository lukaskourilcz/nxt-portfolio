import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// CTA button styles: "solid" (primary) and "outline" (secondary), both turn
// emerald on hover. Sizes: "md" for page CTAs, "sm" for the navbar résumé.
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

// Renders a <button>; with `asChild`, applies the styles to a nested element
// instead (a Link or download <a>), since most CTAs here are links.
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
