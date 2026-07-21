"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  return (
    <label className={cn("inline-flex items-center gap-3 cursor-pointer", disabled && "cursor-not-allowed opacity-50")}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "w-11 h-6 rounded-full border transition-colors duration-200 ease-in-out",
            checked
              ? "bg-indigo-600 border-indigo-500"
              : "bg-slate-900 border-slate-700"
          )}
        />
        <div
          className={cn(
            "absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ease-in-out shadow-sm",
            checked && "translate-x-5"
          )}
        />
      </div>
      {label && <span className="text-sm font-medium text-slate-300">{label}</span>}
    </label>
  );
}
