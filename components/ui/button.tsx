import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "rose" | "indigo";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold tracking-wide transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50";
    
    const variants = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm border border-blue-700/20",
      secondary: "bg-slate-900 hover:bg-slate-800 text-white shadow-sm border border-slate-950/20",
      outline: "border border-slate-200 bg-white text-slate-850 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
      ghost: "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900",
      rose: "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-700/20",
      indigo: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border border-indigo-700/20",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4.5 py-2 text-xs rounded-xl gap-2",
      lg: "px-6 py-2.5 text-sm rounded-2xl gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4.5 w-4.5 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
