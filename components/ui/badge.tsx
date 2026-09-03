import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-white text-zinc-950 shadow hover:bg-zinc-200",
        secondary:
          "border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800",
        destructive:
          "border-transparent bg-red-950/50 border-red-800 text-red-400",
        outline: "text-zinc-400 border-zinc-800 bg-zinc-950/40",
        success: "border-emerald-800/60 bg-emerald-950/30 text-emerald-400",
        tech: "border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:text-white hover:border-zinc-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
