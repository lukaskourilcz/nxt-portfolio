import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// CTA button styles: "solid" (primary) and "outline" (secondary), with quiet
// brightness-step hovers. Sizes: "md" for page CTAs, "sm" for the navbar résumé.
const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid:
          "bg-accent text-canvas hover:bg-accent-hover",
        outline:
          "border border-edge-strong bg-subtle text-secondary hover:bg-interactive hover:text-primary",
      },
      size: {
        md: "px-5 py-2.5 text-sm font-medium",
        sm: "px-3 py-2 font-mono text-xs",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

// Renders a <button>; with `asChild`, applies the styles to a nested element
// instead (a Link or download <a>), since most CTAs here are links.
export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
