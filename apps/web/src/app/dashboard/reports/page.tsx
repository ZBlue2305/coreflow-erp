"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  BarChart3,
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Droplets,
  FileBarChart,
  Filter,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface ReportModule {
  id: string;
  title: string;
  description: string;
  category: string;
  lastGenerated: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  trend?: { value: string; positive: boolean };
}

const reportModules: ReportModule[] = [
  {
    id: "RPT-FIN-001",
    title: "Monthly Revenue Summary",
    description: "Consolidated monthly receivables, disbursements, and net margin analysis.",
    category: "Finance",
    lastGenerated: "July 16, 2026",
    icon: DollarSign,
    iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    trend: { value: "+14.2% MoM", positive: true },
  },
  {
    id: "RPT-FIN-002",
    title: "Accounts Receivable Aging",
    description: "Invoice payment status breakdown by aging buckets: 30, 60, 90+ days.",
    category: "Finance",
    lastGenerated: "July 15, 2026",
    icon: FileBarChart,
    iconColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    trend: { value: "AED 137,500 overdue", positive: false },
  },
  {
    id: "RPT-HR-001",
    title: "Headcount & Payroll Register",
    description: "Employee roster, department headcount, and total payroll liability by period.",
    category: "HR",
    lastGenerated: "July 14, 2026",
    icon: Users,
    iconColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    trend: { value: "96 Employees total", positive: true },
  },
  {
    id: "RPT-HR-002",
    title: "Attendance & Leave Summary",
    description: "Monthly attendance rates, absenteeism analysis, and leave liability accrual.",
    category: "HR",
    lastGenerated: "July 12, 2026",
    icon: Calendar,
    iconColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    trend: { value: "94.3% Attendance Rate", positive: true },
  },
  {
    id: "RPT-PRJ-001",
    title: "Project Milestone Tracker",
    description: "Real-time engineering project progress, budget consumption, and timeline variance.",
    category: "Projects",
    lastGenerated: "July 13, 2026",
    icon: Droplets,
    iconColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    trend: { value: "59.3% Avg Completion", positive: true },
  },
  {
    id: "RPT-PRJ-002",
    title: "Budget Variance Analysis",
    description: "Planned vs. actual spend per project site with overage alerts and forecasts.",
    category: "Projects",
    lastGenerated: "July 10, 2026",
    icon: BarChart3,
    iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    trend: { value: "+3.1% under budget", positive: true },
  },
  {
    id: "RPT-SLS-001",
    title: "Sales Pipeline Report",
    description: "Lead funnel, stage conversion rates, opportunity value by sales representative.",
    category: "Sales",
    lastGenerated: "July 15, 2026",
    icon: TrendingUp,
    iconColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    trend: { value: "AED 3.2M Pipeline Value", positive: true },
  },
  {
    id: "RPT-IT-001",
    title: "System Audit Log Summary",
    description: "User access events, failed authentication attempts, and privileged activity audit.",
    category: "IT",
    lastGenerated: "July 16, 2026",
    icon: Clock,
    iconColor: "text-slate-400 bg-slate-500/10 border-slate-500/20",
    trend: { value: "3 Anomalies flagged", positive: false },
  },
];

const categories = ["All", "Finance", "HR", "Projects", "Sales", "IT"];

export default function ReportsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [downloading, setDownloading] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? reportModules
    : reportModules.filter((r) => r.category === activeCategory);

  const handleDownload = (id: string) => {
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1800);
  };

  const kpiData = [
    { label: "Reports Generated", value: "8", sub: "This billing cycle", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", icon: FileBarChart },
    { label: "Finance Reports", value: "2", sub: "Receivable & aging", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: DollarSign },
    { label: "HR Reports", value: "2", sub: "Headcount & leaves", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Users },
    { label: "Project Reports", value: "2", sub: "Progress & budget", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", icon: Droplets },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Executive Reports Hub</h1>
          <p className="text-slate-400 text-sm">
            Generate, schedule, and export operational intelligence reports across all ERP modules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Schedule Report
          </Button>
          <Button size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Bulk Export
          </Button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
                  <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
                  <p className="text-[10px] text-slate-400">{kpi.sub}</p>
                </div>
                <div className={`h-11 w-11 rounded-lg flex items-center justify-center border ${kpi.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
              activeCategory === cat
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((report) => {
          const Icon = report.icon;
          const isDownloading = downloading === report.id;
          return (
            <Card key={report.id} hoverEffect className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-5 flex flex-col h-full gap-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border ${report.iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-600 mt-1 ml-auto">
                    {report.id}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                      {report.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{report.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{report.description}</p>
                </div>

                {/* Trend & Meta */}
                {report.trend && (
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${report.trend.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {report.trend.positive
                      ? <ArrowUpRight className="h-3.5 w-3.5" />
                      : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {report.trend.value}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                  <span className="text-[10px] text-slate-500">
                    Generated: <span className="text-slate-400">{report.lastGenerated}</span>
                  </span>
                  <button
                    onClick={() => handleDownload(report.id)}
                    className={`h-7 px-3 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isDownloading
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                    }`}
                  >
                    {isDownloading ? (
                      <><CheckCircle2 className="h-3 w-3" /> Exported</>
                    ) : (
                      <><Download className="h-3 w-3" /> Export</>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Scheduled Reports Banner */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-400" />
            <CardTitle>Scheduled Automation</CardTitle>
          </div>
          <CardDescription>Automated report delivery configured for executive distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { name: "Monthly Financial Summary", recurrence: "1st of each month", recipients: "CEO, CFO, Finance Team", status: "Active" },
              { name: "Weekly Project Status", recurrence: "Every Monday 08:00", recipients: "All Department Heads", status: "Active" },
              { name: "Quarterly Board Report", recurrence: "End of Q3 2026", recipients: "Board of Directors", status: "Scheduled" },
            ].map((sched, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{sched.name}</span>
                  <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full border ${
                    sched.status === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}>{sched.status}</span>
                </div>
                <p className="text-[10px] text-slate-500">{sched.recurrence}</p>
                <p className="text-[10px] text-slate-400">→ {sched.recipients}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
