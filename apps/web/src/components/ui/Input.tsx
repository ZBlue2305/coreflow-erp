import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, helperText, ...props }, ref) => {
    const id = React.useId();
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 ring-offset-slate-950 transition-all placeholder:text-slate-500 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500/80 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-red-400 font-medium">{error}</span>
        ) : helperText ? (
          <span className="text-xs text-slate-400">{helperText}</span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";
