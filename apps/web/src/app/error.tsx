"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-bold border border-red-500/20">
        ⚠️
      </div>
      <h2 className="text-xl font-bold text-white">Something went wrong</h2>
      <p className="text-sm text-slate-400 max-w-md">
        {error?.message || "An error occurred while loading this view."}
      </p>
      <Button onClick={() => reset()} size="sm">
        Reload Component
      </Button>
    </div>
  );
}
