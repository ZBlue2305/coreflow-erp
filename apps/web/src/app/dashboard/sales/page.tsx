import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CircleDollarSign, Handshake, Landmark, ArrowUpRight, TrendingUp, Users2, Sparkles } from "lucide-react";

export default function SalesDashboard() {
  const stats = [
    { label: "Active Pipelines", value: "AED 1,840,000", change: "+18.6% vs Q2", icon: TrendingUp, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Closed Accounts", value: "32 Clients", change: "4 onboarded this month", icon: Users2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Contract Win Rate", value: "72.4% Average", change: "+3.2% performance shift", icon: Handshake, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Invoice Balances", value: "AED 310,200", change: "12 invoices outstanding", icon: Landmark, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  ];

  const recentDeals = [
    { client: "Al-Ain Water Distribution", project: "SCADA Purification Suite", value: "AED 450,000", probability: "90%", stage: "Contract Signing" },
    { client: "Gulf Construction Group", project: "Hydro-Chamber Installation", value: "AED 280,000", probability: "70%", stage: "Proposal Review" },
    { client: "Sharjah Municipal Authority", project: "Pressure Valve Overhauls", value: "AED 620,000", probability: "50%", stage: "Qualified Lead" },
    { client: "Marina Engineering Ltd", project: "Membrane Filters Supply", value: "AED 90,000", probability: "100%", stage: "Won / Invoiced" },
  ];

  const dealStages = [
    { name: "Discovery", count: 8, value: "AED 210k" },
    { name: "Proposal Sent", count: 6, value: "AED 540k" },
    { name: "Negotiation", count: 4, value: "AED 680k" },
    { name: "Pending Signature", count: 2, value: "AED 410k" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">Sales Ledger & CRM Pipelines</h1>
          <p className="text-slate-400 text-sm">Contract valuations, sales pipeline velocity, client accounts directory, and outstanding billing.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Billing History</Button>
          <Button variant="primary" size="sm">Log Sales Lead</Button>
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

      {/* Pipelines & Deal board */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Active Deals Table */}
        <Card className="lg:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Active Client Pipelines</CardTitle>
            <CardDescription>Major client engagement proposals and current probability thresholds</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold">
                  <th className="py-3 px-2">Client / Project</th>
                  <th className="py-3 px-2">Pipeline value</th>
                  <th className="py-3 px-2">Deal Stage</th>
                  <th className="py-3 px-2">Probability</th>
                  <th className="py-3 px-2 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {recentDeals.map((deal, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/20 text-slate-300">
                    <td className="py-3 px-2">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{deal.client}</span>
                        <span className="text-[10px] text-slate-500">{deal.project}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 font-mono font-semibold text-slate-200">{deal.value}</td>
                    <td className="py-3 px-2">
                      <span className="text-slate-400">{deal.stage}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            style={{ width: deal.probability }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{deal.probability}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-wider">
                        Explore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Pipeline Stage Summaries */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Pipeline Velocity</CardTitle>
            <CardDescription>Aggregated metrics grouped by deal workflow stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            {dealStages.map((stage, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{stage.name}</span>
                  <span className="font-mono text-slate-400">{stage.value}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>{stage.count} active inquiries</span>
                  <span>Target conversion: 60%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div
                    style={{ width: `${(stage.count / 10) * 100}%` }}
                    className="h-full bg-indigo-500/80 rounded-full"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
