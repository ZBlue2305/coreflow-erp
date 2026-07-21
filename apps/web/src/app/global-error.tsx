"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased flex min-h-screen items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-red-500/20 bg-slate-900/60 p-6 text-center space-y-4 backdrop-blur-md shadow-2xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-bold border border-red-500/20">
            ⚠️
          </div>
          <h2 className="text-lg font-bold text-white">System Error Encountered</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            {error?.message || "An unexpected error occurred while loading this page."}
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex h-10 px-4 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
