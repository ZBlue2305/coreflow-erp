"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Landmark, Plus, Search, DollarSign, Wallet, FileText, CheckCircle2, Calculator } from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: "PAID" | "PARTIALLY_PAID" | "UNPAID";
}

interface Expense {
  id: string;
  description: string;
  category: string;
  amount: number;
  date: string;
}

export default function FinancePage() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [expenseDesc, setExpenseDesc] = useState("");
  const [expenseCat, setExpenseCat] = useState("Materials");
  const [expenseAmt, setExpenseAmt] = useState("");

  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: "INV-2026-0001", client: "Sharjah Municipality Dept", dueDate: "2026-08-15", amount: 120000, paid: 50000, status: "PARTIALLY_PAID" },
    { id: "INV-2026-0002", client: "Al-Khaleej Water Assets", dueDate: "2026-08-28", amount: 28500, paid: 28500, status: "PAID" },
    { id: "INV-2026-0003", client: "Emaar Properties PJSC", dueDate: "2026-07-30", amount: 95000, paid: 0, status: "UNPAID" },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "EXP-001", description: "Stainless pipes logistics transit", category: "Materials", amount: 8400, date: "2026-07-12" },
    { id: "EXP-002", description: "Hazard safety gloves bundle x50", category: "Operations", amount: 1200, date: "2026-07-14" },
    { id: "EXP-003", description: "AWS SCADA telemetry host server billing", category: "IT Infrastructure", amount: 3500, date: "2026-07-15" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseDesc || !expenseAmt) return;

    const newExp: Expense = {
      id: `EXP-00${expenses.length + 1}`,
      description: expenseDesc,
      category: expenseCat,
      amount: Number(expenseAmt),
      date: new Date().toISOString().split("T")[0],
    };

    setExpenses([newExp, ...expenses]);
    setShowAddExpense(false);
    setExpenseDesc("");
    setExpenseAmt("");
    setNotification("Expense logged inside Ledger sheets successfully.");
    setTimeout(() => setNotification(null), 3500);
  };

  const getOutstandingBalance = () => {
    return invoices.reduce((acc, inv) => acc + (inv.amount - inv.paid), 0);
  };

  const getConsolidatedExpenses = () => {
    return expenses.reduce((acc, exp) => acc + exp.amount, 0);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Corporate Accounts & Ledger</h1>
          <p className="text-slate-400 text-sm">Control outstanding invoice collections, chemical materials procurement expenses, and general cash flow.</p>
        </div>
        <div>
          <Button onClick={() => setShowAddExpense(true)} className="gap-2.5 font-bold">
            <Plus className="h-4.5 w-4.5" /> Log Expenditure
          </Button>
        </div>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI summaries */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Outstanding Collections</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED {getOutstandingBalance().toLocaleString()}</h3>
              <p className="text-[10px] text-slate-400">Receivable client invoices</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Landmark className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Logged Expenses</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED {getConsolidatedExpenses().toLocaleString()}</h3>
              <p className="text-[10px] text-slate-400">Disbursed this month</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400">
              <Wallet className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Cash Velocity margin</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED {(243500 - getConsolidatedExpenses()).toLocaleString()}</h3>
              <p className="text-[10px] text-emerald-400 font-medium">Positive ledger yield</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice sheets & Expense sheets split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Invoices */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-400" />
              <CardTitle>Receivable Invoices</CardTitle>
            </div>
            <CardDescription>Review billing definitions and customer payment timelines</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-4 px-4">Invoice ID & Client</th>
                  <th className="py-4 px-4">Due Date</th>
                  <th className="py-4 px-4 text-right">Value Total</th>
                  <th className="py-4 px-4 text-right">Invoice Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono">
                {invoices.map((inv) => {
                  const statusStyle =
                    inv.status === "PAID"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : inv.status === "PARTIALLY_PAID"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20";

                  return (
                    <tr key={inv.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex flex-col font-sans">
                          <span className="font-semibold text-slate-200">{inv.client}</span>
                          <span className="text-[9px] text-slate-500">{inv.id}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-400 font-medium">{inv.dueDate}</td>
                      <td className="py-4 px-4 text-right text-slate-200 font-semibold">AED {inv.amount.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusStyle}`}>
                          {inv.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-indigo-400" />
              <CardTitle>Corporate Expenditure</CardTitle>
            </div>
            <CardDescription>Log files of materials procurement and server subscription outflow</CardDescription>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                  <th className="py-4 px-4">Expense description</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 font-mono">Outflow Date</th>
                  <th className="py-4 px-4 text-right">Value Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-mono">
                {expenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex flex-col font-sans">
                        <span className="font-semibold text-slate-200">{exp.description}</span>
                        <span className="text-[9px] text-slate-500">{exp.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-sans text-slate-400 font-medium">{exp.category}</td>
                    <td className="py-4 px-4 text-slate-500 font-medium">{exp.date}</td>
                    <td className="py-4 px-4 text-right text-red-400 font-semibold">-AED {exp.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Log Expense Modal Overlay */}
      {showAddExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-indigo-400" />
                <CardTitle>Log Ledger outflow</CardTitle>
              </div>
              <CardDescription>Record materials logistics or utility payments</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <Input
                  label="Expense description"
                  value={expenseDesc}
                  onChange={(e) => setExpenseDesc(e.target.value)}
                  placeholder="Purchased 20x carbon filter grids"
                  required
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Category</label>
                  <select
                    value={expenseCat}
                    onChange={(e) => setExpenseCat(e.target.value)}
                    className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  >
                    <option value="Materials">Materials & Fleet</option>
                    <option value="Operations">Operations & Labor</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                  </select>
                </div>
                <Input
                  label="Valuation Amount (AED)"
                  type="number"
                  value={expenseAmt}
                  onChange={(e) => setExpenseAmt(e.target.value)}
                  placeholder="5500"
                  required
                />

                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-800/60">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddExpense(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Complete Log
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
