"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Menu, Bell, Search, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TopNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
  onMenuToggle: () => void;
}

export function TopNav({ user, onMenuToggle }: TopNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, update } = useSession();

  // Generate breadcrumb titles
  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);
    if (paths.length === 0) return ["Home"];
    return paths.map((path) => {
      // capitalize and format
      return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
    });
  };

  const breadcrumbs = getBreadcrumbs();

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    if (newRole) {
      // Trigger NextAuth session update
      await update({ role: newRole });
      
      // Redirect to the new role dashboard
      router.push(`/dashboard/${newRole.toLowerCase()}`);
      router.refresh();
    }
  };

  const currentRole = (session?.user?.role || user?.role || "AGENT").toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 backdrop-blur-md lg:px-6">
      {/* Mobile Toggle & Path */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb Trail */}
        <nav className="hidden items-center gap-1.5 text-sm font-medium text-slate-400 sm:flex">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="text-slate-600">/</span>}
              <span className={cn(idx === breadcrumbs.length - 1 ? "text-slate-100 font-semibold" : "text-slate-400")}>
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-4">
        {/* Mock Search Bar */}
        <div className="relative hidden w-64 md:block">
          <Search className="absolute top-3 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Quick search (Ctrl+/)..."
            className="h-10 w-full rounded-lg border border-slate-800 bg-slate-900/40 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-hidden"
          />
        </div>

        {/* Dynamic Dev Role Switcher */}
        <div className="flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/5 px-2 py-1">
          <Terminal className="h-3.5 w-3.5 text-indigo-400" />
          <span className="hidden text-[10px] font-bold text-indigo-300 uppercase tracking-wider sm:inline">
            Role Switcher:
          </span>
          <select
            value={currentRole}
            onChange={handleRoleChange}
            className="bg-transparent text-[11px] font-bold text-indigo-300 border-none outline-none cursor-pointer focus:ring-0"
          >
            <option value="AGENT" className="bg-slate-950 text-slate-300 font-medium">Agent</option>
            <option value="MANAGER" className="bg-slate-950 text-slate-300 font-medium">Manager</option>
            <option value="HR" className="bg-slate-950 text-slate-300 font-medium">HR</option>
            <option value="SALES" className="bg-slate-950 text-slate-300 font-medium">Sales</option>
            <option value="IT" className="bg-slate-950 text-slate-300 font-medium">IT</option>
          </select>
        </div>

        {/* Notifications Button */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-white">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-slate-950" />
        </button>
      </div>
    </header>
  );
}
