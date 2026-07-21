"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Wallet,
  Plus,
  Search,
  CheckCircle2,
  TrendingDown,
  Package,
  Cpu,
  Wrench,
  Users,
  MoreHorizontal,
} from "lucide-react";

interface Expense {
  id: string;
  description: string;
  category: string;
  vendor: string;
  amount: number;
  date: string;
  approvedBy: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Materials: Package,
  "IT Infrastructure": Cpu,
  Operations: Wrench,
  Labor: Users,
  Other: MoreHorizontal,
};

const categoryColors: Record<string, string> = {
  Materials: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  "IT Infrastructure": "text-purple-400 bg-purple-500/10 border-purple-500/20",
  Operations: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  Labor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  Other: "text-slate-400 bg-slate-500/10 border-slate-500/20",
};

const initialExpenses: Expense[] = [
  { id: "EXP-001", description: "Stainless pipes logistics transit batch", category: "Materials", vendor: "Gulf Steel Co.", amount: 8400, date: "2026-07-12", approvedBy: "Finance Manager", status: "APPROVED" },
  { id: "EXP-002", description: "Hazard safety gloves bundle x50 units", category: "Operations", vendor: "SafetyFirst LLC", amount: 1200, date: "2026-07-14", approvedBy: "HR Manager", status: "APPROVED" },
  { id: "EXP-003", description: "AWS SCADA telemetry server monthly billing", category: "IT Infrastructure", vendor: "Amazon Web Services", amount: 3500, date: "2026-07-15", approvedBy: "IT Admin", status: "APPROVED" },
  { id: "EXP-004", description: "Carbon filter membrane replacement kit x12", category: "Materials", vendor: "HydroTech Supplies", amount: 18600, date: "2026-07-09", approvedBy: "Finance Manager", status: "APPROVED" },
  { id: "EXP-005", description: "Site survey professional labor (2-day)", category: "Labor", vendor: "FieldOps Consultants", amount: 6800, date: "2026-07-07", approvedBy: "Project Manager", status: "APPROVED" },
  { id: "EXP-006", description: "Office ergonomic workstations x4", category: "Other", vendor: "Office Depot UAE", amount: 4200, date: "2026-07-03", approvedBy: "Pending", status: "PENDING" },
  { id: "EXP-007", description: "TDS monitor sensors – replacement batch", category: "Materials", vendor: "Aqua Instruments", amount: 2750, date: "2026-06-28", approvedBy: "Finance Manager", status: "APPROVED" },
];

const categories = ["All", "Materials", "IT Infrastructure", "Operations", "Labor", "Other"];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("Materials");
  const [vendor, setVendor] = useState("");
  const [amount, setAmount] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = expenses.filter((e) => {
    const matchSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.vendor.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || e.category === catFilter;
    return matchSearch && matchCat;
  });

  const totalSpend = expenses.filter((e) => e.status === "APPROVED").reduce((a, e) => a + e.amount, 0);
  const pendingAmount = expenses.filter((e) => e.status === "PENDING").reduce((a, e) => a + e.amount, 0);
  const materialSpend = expenses.filter((e) => e.category === "Materials").reduce((a, e) => a + e.amount, 0);

  const handleAdd = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!desc || !amount) return;
    const newExp: Expense = {
      id: `EXP-00${expenses.length + 1}`,
      description: desc,
      category: cat,
      vendor: vendor || "TBD",
      amount: Number(amount),
      date: new Date().toISOString().split("T")[0],
      approvedBy: "Pending",
      status: "PENDING",
    };
    setExpenses([newExp, ...expenses]);
    setShowAdd(false);
    setDesc(""); setVendor(""); setAmount(""); setCat("Materials");
    setNotification(`Expense ${newExp.id} submitted for approval.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const statusConfig = {
    APPROVED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PENDING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Corporate Expenditure</h1>
          <p className="text-slate-400 text-sm">
            Log and track all operational expenses, procurement outflows, and budget disbursements.
          </p>
        </div>
        <Button onClick={() => setShowAdd(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Log Expense
        </Button>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: "Total Approved Spend", value: `AED ${totalSpend.toLocaleString()}`, sub: "Cleared disbursements", icon: TrendingDown, color: "text-red-400 bg-red-500/10 border-red-500/20" },
          { label: "Pending Approval", value: `AED ${pendingAmount.toLocaleString()}`, sub: "Awaiting authorization", icon: Wallet, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
          { label: "Materials Outflow", value: `AED ${materialSpend.toLocaleString()}`, sub: "Procurement & supplies", icon: Package, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Card key={i} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
                  <h3 className="text-xl font-bold text-white font-mono">{kpi.value}</h3>
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

      {/* Category breakdown bar */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardContent className="p-5 space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Spend Breakdown by Category</p>
          <div className="space-y-3">
            {["Materials", "IT Infrastructure", "Operations", "Labor", "Other"].map((c) => {
              const catTotal = expenses.filter((e) => e.category === c).reduce((a, e) => a + e.amount, 0);
              const pct = totalSpend > 0 ? Math.round((catTotal / (totalSpend + pendingAmount)) * 100) : 0;
              const Icon = categoryIcons[c] || MoreHorizontal;
              const color = categoryColors[c] || categoryColors.Other;
              return (
                <div key={c} className="flex items-center gap-3">
                  <div className={`h-7 w-7 shrink-0 rounded-lg flex items-center justify-center border ${color}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-[10px] font-medium">
                      <span className="text-slate-300">{c}</span>
                      <span className="text-slate-400 font-mono">AED {catTotal.toLocaleString()} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-1.5 border border-slate-900">
                      <div style={{ width: `${pct}%` }} className="bg-indigo-500 h-full rounded-full" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Search + Category Filter */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search description or vendor..."
            className="w-full h-10 rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 text-sm text-slate-300 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-hidden"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCatFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                catFilter === c
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Expenses Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-indigo-400" />
            <CardTitle>Expense Ledger ({filtered.length})</CardTitle>
          </div>
          <CardDescription>Detailed log of all corporate financial disbursements and procurement events</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-4 px-4">Description</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Vendor</th>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Approved By</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((exp) => {
                const Icon = categoryIcons[exp.category] || MoreHorizontal;
                const color = categoryColors[exp.category] || categoryColors.Other;
                return (
                  <tr key={exp.id} className="hover:bg-slate-950/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-7 w-7 shrink-0 rounded-lg flex items-center justify-center border ${color}`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200 max-w-[200px] truncate">{exp.description}</span>
                          <span className="text-[9px] font-mono text-slate-600">{exp.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{exp.category}</td>
                    <td className="py-4 px-4 text-slate-400 font-medium">{exp.vendor}</td>
                    <td className="py-4 px-4 text-slate-500 font-mono">{exp.date}</td>
                    <td className="py-4 px-4 text-slate-400">{exp.approvedBy}</td>
                    <td className="py-4 px-4 text-right text-red-400 font-bold font-mono">-AED {exp.amount.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${statusConfig[exp.status]}`}>
                        {exp.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add Expense Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-indigo-400" />
                <CardTitle>Log New Expense</CardTitle>
              </div>
              <CardDescription>Submit an operational or procurement expenditure for approval</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdd} className="space-y-4">
                <Input label="Description" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Pump valve replacement set" required />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Category</label>
                  <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden">
                    {["Materials", "IT Infrastructure", "Operations", "Labor", "Other"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <Input label="Vendor / Supplier" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Gulf Industrial Supplies" />
                <Input label="Amount (AED)" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="12500" required />
                <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800/60">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
                  <Button type="submit" size="sm">Submit Expense</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
