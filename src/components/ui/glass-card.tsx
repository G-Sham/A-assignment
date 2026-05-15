
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, glow, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass rounded-xl overflow-hidden relative transition-all duration-300",
          glow && "hover:shadow-[0_0_30px_hsla(258,100%,69%,0.15)]",
          className
        )}
        {...props}
      >
        {glow && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        )}
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
