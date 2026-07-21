"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils/cn";
import {
  LayoutDashboard,
  ShieldAlert,
  FileCheck2,
  TrendingUp,
  Users,
  CalendarRange,
  Banknote,
  Briefcase,
  CircleDollarSign,
  Handshake,
  Users2,
  Cpu,
  ShieldCheck,
  Terminal,
  Settings,
  User,
  CheckSquare,
  Clock,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  FolderOpen,
  Landmark,
  Receipt,
  FolderKanban,
  FileText,
} from "lucide-react";

interface SidebarProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Sidebar({ user, isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const role = (user?.role || "AGENT").toUpperCase();

  // Define navigation items grouped by role
  const roleNavItems: Record<string, NavItem[]> = {
    MANAGER: [
      { label: "Overview", href: "/dashboard/manager", icon: LayoutDashboard },
      { label: "Approvals", href: "/dashboard/manager/approvals", icon: FileCheck2 },
      { label: "Performance", href: "/dashboard/manager/performance", icon: TrendingUp },
    ],
    HR: [
      { label: "HR Dashboard", href: "/dashboard/hr", icon: LayoutDashboard },
      { label: "Employees", href: "/dashboard/hr/employees", icon: Users },
      { label: "Attendance", href: "/dashboard/hr/attendance", icon: CalendarRange },
      { label: "Payroll", href: "/dashboard/hr/payroll", icon: Banknote },
    ],
    SALES: [
      { label: "Sales Dashboard", href: "/dashboard/sales", icon: LayoutDashboard },
      { label: "CRM Leads", href: "/dashboard/sales/leads", icon: Users2 },
      { label: "Pipeline", href: "/dashboard/sales/pipeline", icon: CircleDollarSign },
      { label: "Contracts", href: "/dashboard/sales/contracts", icon: Handshake },
    ],
    IT: [
      { label: "IT Operations", href: "/dashboard/it", icon: LayoutDashboard },
      { label: "User Management", href: "/dashboard/it/users", icon: Cpu },
      { label: "Access Control", href: "/dashboard/it/access", icon: ShieldCheck },
      { label: "System Logs", href: "/dashboard/it/logs", icon: Terminal },
    ],
    AGENT: [
      { label: "My Desk", href: "/dashboard/agent", icon: LayoutDashboard },
      { label: "My Tasks", href: "/dashboard/agent/tasks", icon: CheckSquare },
      { label: "Time Clock", href: "/dashboard/agent/timecard", icon: Clock },
    ],
  };

  const currentRoleItems = roleNavItems[role] || [];
  
  // Standard workspace links accessible to all users
  const employeeItems: NavItem[] = [
    { label: "My Workspace", href: "/dashboard/agent", icon: User },
    { label: "Task Board", href: "/dashboard/agent/tasks", icon: CheckSquare },
    { label: "Timecard", href: "/dashboard/agent/timecard", icon: Clock },
  ];

  // Universal module links visible to all non-agent roles
  const universalItems: NavItem[] = [
    { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { label: "Finance", href: "/dashboard/finance", icon: Landmark },
    { label: "Invoices", href: "/dashboard/finance/invoices", icon: FileText },
    { label: "Expenses", href: "/dashboard/finance/expenses", icon: Receipt },
    { label: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { label: "Files", href: "/dashboard/files", icon: FolderOpen },
  ];

  // Role badges definitions
  const roleBadges: Record<string, { label: string; style: string }> = {
    MANAGER: { label: "Manager", style: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    HR: { label: "Human Resources", style: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    SALES: { label: "Sales Dept", style: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    IT: { label: "IT / Admin", style: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    AGENT: { label: "Field Agent", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  };

  const activeBadge = roleBadges[role] || { label: "Employee", style: "bg-slate-500/10 text-slate-400 border-slate-500/20" };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col border-r border-slate-800 bg-slate-950 text-slate-300 transition-all duration-300 ease-in-out lg:static",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800/60">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-100 uppercase">Qimat Almanara</span>
              <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Hydrotech</span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden h-7 w-7 items-center justify-center rounded-md border border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white lg:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation Areas */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Role Segment */}
        <div>
          {!isCollapsed && (
            <h2 className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
              ERP Module ({activeBadge.label})
            </h2>
          )}
          <ul className="space-y-1">
            {currentRoleItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-slate-900 text-indigo-400 border-l-2 border-indigo-500 font-semibold"
                        : "hover:bg-slate-900/60 hover:text-slate-100"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200")} />
                    {!isCollapsed && <span>{item.label}</span>}
                    {isCollapsed && (
                      <span className="absolute left-16 rounded-md bg-slate-950 border border-slate-800 px-2 py-1 text-xs font-semibold text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Universal Desk Segment (if user is NOT standard agent, show their personal space toggle) */}
        {role !== "AGENT" && (
          <div>
            {!isCollapsed && (
              <h2 className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                Personal Workspace
              </h2>
            )}
            <ul className="space-y-1">
              {employeeItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-slate-900 text-indigo-400 border-l-2 border-indigo-500 font-semibold"
                          : "hover:bg-slate-900/60 hover:text-slate-100"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200")} />
                      {!isCollapsed && <span>{item.label}</span>}
                      {isCollapsed && (
                        <span className="absolute left-16 rounded-md bg-slate-950 border border-slate-800 px-2 py-1 text-xs font-semibold text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Universal ERP Modules — visible to all non-agent roles */}
        {role !== "AGENT" && (
          <div>
            {!isCollapsed && (
              <h2 className="px-3 text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-2">
                ERP Modules
              </h2>
            )}
            <ul className="space-y-1">
              {universalItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-slate-900 text-indigo-400 border-l-2 border-indigo-500 font-semibold"
                          : "hover:bg-slate-900/60 hover:text-slate-100"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-indigo-400" : "text-slate-400 group-hover:text-slate-200")} />
                      {!isCollapsed && <span>{item.label}</span>}
                      {isCollapsed && (
                        <span className="absolute left-16 rounded-md bg-slate-950 border border-slate-800 px-2 py-1 text-xs font-semibold text-slate-200 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* User Footer Profile & Signout */}
      <div className="p-3 border-t border-slate-800/60 bg-slate-950">
        <div className="flex items-center justify-between gap-2.5 rounded-xl bg-slate-900/40 p-2 border border-slate-900">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-slate-200 border border-slate-700/50 font-bold">
              {user?.name ? user.name[0] : user?.email ? user.email[0].toUpperCase() : "U"}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="truncate text-xs font-semibold text-slate-200">{user?.name || "User Account"}</span>
                <span className="truncate text-[10px] text-slate-500">{user?.email || "user@erp.com"}</span>
                <span className={cn("mt-1 self-start rounded-full border px-1.5 py-0.2 text-[8px] font-bold tracking-wider uppercase", activeBadge.style)}>
                  {role}
                </span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
