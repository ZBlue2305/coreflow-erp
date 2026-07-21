import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, Users, Droplets, Clock, ArrowUpRight, Check, X, FileText } from "lucide-react";

export default function ManagerDashboard() {
  const stats = [
    { label: "Systems Revenue", value: "AED 1,248,500", change: "+14.2% MoM", icon: TrendingUp, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Active Project Sites", value: "18 Engineering Sites", change: "4 Pending Inception", icon: Droplets, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Field Fleet Allocation", value: "84 active / 96 total", change: "87.5% Deployment", icon: Users, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Approvals Action Queue", value: "4 requests pending", change: "2 Critical priority", icon: Clock, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  ];

  const approvals = [
    { id: "PO-2026-004", requester: "Jasim Salim (Procurement)", description: "Purchase order for 4x Hydro-Regulators Type-C", value: "AED 34,200", date: "Today, 09:14" },
    { id: "LR-2026-118", requester: "Fatima Al-Hashemi (HR)", description: "Annual leave request override (18 calendar days)", value: "Leave Request", date: "Yesterday" },
    { id: "CN-2026-089", requester: "Zaid Al-Habsi (Sales)", description: "Client discount override request for Al-Khaleej Waters", value: "5% Discount Margin", date: "July 15, 2026" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">Executive Management Office</h1>
          <p className="text-slate-400 text-sm">System oversight, operational statistics, and administrative authorizations.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button variant="primary" size="sm">Create Directive</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hoverEffect className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{stat.value}</h3>
                  <span className="text-xs text-indigo-400 font-medium flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" /> {stat.change}
                  </span>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${stat.color} shadow-lg shadow-black/35`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Primary Analytics & Approvals Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Mock Operations Chart */}
        <Card className="lg:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Hydrotech Purification Output</CardTitle>
            <CardDescription>Industrial system purification output trends (litres per hour x1000)</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between">
            {/* Visual CSS-based Bar Chart */}
            <div className="flex items-end justify-between h-44 px-4 pt-4 border-b border-slate-800/60">
              {[42, 54, 48, 67, 72, 61, 88, 92, 85, 96, 110, 115].map((val, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 w-full group">
                  <div className="text-[9px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                    {val}k
                  </div>
                  <div
                    style={{ height: `${val * 1.2}px` }}
                    className="w-4 sm:w-6 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t hover:from-violet-500 hover:to-violet-400 transition-all cursor-pointer shadow-md shadow-indigo-500/10"
                  />
                  <span className="text-[9px] font-medium text-slate-600 mt-1 uppercase">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][idx]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 px-2 pt-2">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Target Limit</span>
              <span>Projected: +12% growth Q4</span>
            </div>
          </CardContent>
        </Card>

        {/* Approvals Action Board */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Administrative authorization directives awaiting signatures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {approvals.map((req) => (
              <div key={req.id} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-900 hover:border-slate-800/80 transition-colors space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400">{req.id}</span>
                  <span className="text-[10px] text-slate-500">{req.date}</span>
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-200">{req.requester}</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">{req.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-900/60">
                  <span className="text-xs font-bold text-slate-300">{req.value}</span>
                  <div className="flex items-center gap-1.5">
                    <button className="h-6 w-6 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center transition-colors">
                      <X className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-6 w-6 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 flex items-center justify-center transition-colors">
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
