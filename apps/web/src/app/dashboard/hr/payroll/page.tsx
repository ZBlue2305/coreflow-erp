"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Wallet, CheckCircle2, DollarSign, Calculator, FileSpreadsheet } from "lucide-react";

export default function PayrollPage() {
  const [payrollRows, setPayrollRows] = useState([
    { id: "PAY-001", name: "Ahmed Manager", dept: "Management", base: 15500, allowances: 450, deductions: 0, status: "PENDING" },
    { id: "PAY-002", name: "Fatima HR", dept: "Human Resources", base: 9500, allowances: 250, deductions: 0, status: "PENDING" },
    { id: "PAY-003", name: "Zaid Sales", dept: "Sales & Marketing", base: 8000, allowances: 600, deductions: 120, status: "PENDING" },
    { id: "PAY-004", name: "Khalid IT", dept: "Information Technology", base: 10500, allowances: 300, deductions: 0, status: "PENDING" },
    { id: "PAY-005", name: "Yasmin Agent", dept: "Engineering Field Ops", base: 6200, allowances: 350, deductions: 0, status: "PENDING" },
    { id: "PAY-006", name: "Salem Al-Harthi", dept: "Sales & Marketing", base: 5500, allowances: 400, deductions: 80, status: "PENDING" },
    { id: "PAY-007", name: "Tariq Mahmood", dept: "Engineering Field Ops", base: 9200, allowances: 300, deductions: 0, status: "PENDING" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateTotalPayroll = () => {
    return payrollRows.reduce((acc, row) => acc + (row.base + row.allowances - row.deductions), 0);
  };

  const handleProcessPayroll = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPayrollRows(payrollRows.map((row) => ({ ...row, status: "PAID" })));
      setNotification(`Payroll for ${payrollRows.length} employees has been calculated and disbursed.`);
      setTimeout(() => setNotification(null), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Payroll Ledger</h1>
          <p className="text-slate-400 text-sm">Calculate salary disbursements, allowances, deductions, and issue slips.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <FileSpreadsheet className="h-4.5 w-4.5" /> Export Ledger
          </Button>
          <Button
            onClick={handleProcessPayroll}
            isLoading={loading}
            className="gap-2.5 font-bold"
            disabled={payrollRows.every((r) => r.status === "PAID")}
          >
            <Calculator className="h-4.5 w-4.5" /> Disburse Salaries
          </Button>
        </div>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* KPI statistics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Monthly Outflow</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED {(calculateTotalPayroll()).toLocaleString()}</h3>
              <p className="text-[10px] text-slate-400">All departments consolidated</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Payslips</span>
              <h3 className="text-2xl font-bold text-white">{payrollRows.length} Payslips</h3>
              <p className="text-[10px] text-slate-400">Pending disbursement confirmation</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Wallet className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Ledger Status</span>
              <h3 className="text-2xl font-bold text-white">
                {payrollRows.every((r) => r.status === "PAID") ? "Settled" : "Draft (Pending)"}
              </h3>
              <p className="text-[10px] text-slate-400">Roster Month: July 2026</p>
            </div>
            <div className={`h-11 w-11 rounded-lg flex items-center justify-center border ${
              payrollRows.every((r) => r.status === "PAID")
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                : "border-amber-500/20 bg-amber-500/10 text-amber-400"
            }`}>
              <CheckCircle2 className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roster Ledger details table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <CardTitle>Salary Sheets</CardTitle>
          <CardDescription>Review base payouts, chemical hazard allowances, and social tax deductions</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">ID & Employee</th>
                <th className="py-4 px-6">Division</th>
                <th className="py-4 px-6">Base Salary</th>
                <th className="py-4 px-6">Allowances</th>
                <th className="py-4 px-6">Deductions</th>
                <th className="py-4 px-6">Net Pay</th>
                <th className="py-4 px-6 text-right">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {payrollRows.map((row) => {
                const netPay = row.base + row.allowances - row.deductions;
                const statusStyle =
                  row.status === "PAID"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                return (
                  <tr key={row.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{row.name}</span>
                        <span className="text-[10px] text-slate-500">ID: {row.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium">{row.dept}</td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-400">AED {row.base.toLocaleString()}</td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-400">AED {row.allowances.toLocaleString()}</td>
                    <td className="py-4 px-6 font-mono font-medium text-red-500/70">AED {row.deductions.toLocaleString()}</td>
                    <td className="py-4 px-6 font-mono font-bold text-indigo-400">AED {netPay.toLocaleString()}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusStyle}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
