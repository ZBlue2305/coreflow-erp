"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  FileText,
  Plus,
  Search,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Download,
  Send,
} from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  project: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  paid: number;
  status: "PAID" | "PARTIALLY_PAID" | "UNPAID" | "OVERDUE";
  paymentTerms: string;
}

const initialInvoices: Invoice[] = [
  { id: "INV-2026-0001", client: "Sharjah Municipality Dept", project: "Sharjah Sewerage RO Installation", issueDate: "2026-07-01", dueDate: "2026-08-15", amount: 120000, paid: 50000, status: "PARTIALLY_PAID", paymentTerms: "Net 45" },
  { id: "INV-2026-0002", client: "Al-Khaleej Water Assets", project: "Jebel Ali Filtration Upgrade", issueDate: "2026-06-28", dueDate: "2026-08-28", amount: 28500, paid: 28500, status: "PAID", paymentTerms: "Net 60" },
  { id: "INV-2026-0003", client: "Emaar Properties PJSC", project: "Burj District Desalination Pipeline", issueDate: "2026-07-10", dueDate: "2026-07-30", amount: 95000, paid: 0, status: "OVERDUE", paymentTerms: "Net 20" },
  { id: "INV-2026-0004", client: "Dubai Investments Group", project: "Al Quoz Water Treatment Facility", issueDate: "2026-07-05", dueDate: "2026-09-04", amount: 340000, paid: 0, status: "UNPAID", paymentTerms: "Net 60" },
  { id: "INV-2026-0005", client: "RAK Ceramics Corp", project: "Wastewater Recycling System", issueDate: "2026-06-15", dueDate: "2026-07-15", amount: 67000, paid: 67000, status: "PAID", paymentTerms: "Net 30" },
];

const statusConfig = {
  PAID: { label: "Paid", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle2 },
  PARTIALLY_PAID: { label: "Partial", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Clock },
  UNPAID: { label: "Unpaid", cls: "bg-slate-500/10 text-slate-400 border-slate-500/20", icon: Clock },
  OVERDUE: { label: "Overdue", cls: "bg-red-500/10 text-red-400 border-red-500/20", icon: AlertCircle },
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newProject, setNewProject] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const filtered = invoices.filter((inv) => {
    const matchSearch =
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "ALL" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalOutstanding = invoices.reduce((a, i) => a + (i.amount - i.paid), 0);
  const totalPaid = invoices.reduce((a, i) => a + i.paid, 0);
  const totalOverdue = invoices.filter((i) => i.status === "OVERDUE").reduce((a, i) => a + (i.amount - i.paid), 0);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient || !newAmount) return;
    const newInv: Invoice = {
      id: `INV-2026-00${invoices.length + 1}`,
      client: newClient,
      project: newProject || "General Services",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      amount: Number(newAmount),
      paid: 0,
      status: "UNPAID",
      paymentTerms: "Net 30",
    };
    setInvoices([newInv, ...invoices]);
    setShowCreate(false);
    setNewClient("");
    setNewProject("");
    setNewAmount("");
    setNotification(`Invoice ${newInv.id} created and issued to ${newInv.client}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Receivable Invoices</h1>
          <p className="text-slate-400 text-sm">
            Manage client invoice issuance, payment tracking, and accounts receivable collections.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setShowCreate(true)} className="gap-2">
            <Plus className="h-4 w-4" /> New Invoice
          </Button>
        </div>
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
          { label: "Total Outstanding", value: `AED ${totalOutstanding.toLocaleString()}`, sub: "Pending collections", icon: DollarSign, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
          { label: "Collected (YTD)", value: `AED ${totalPaid.toLocaleString()}`, sub: "Received payments", icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
          { label: "Overdue Balance", value: `AED ${totalOverdue.toLocaleString()}`, sub: "Requires immediate follow-up", icon: AlertCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
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

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search client or invoice ID..."
            className="w-full h-10 rounded-lg border border-slate-700 bg-slate-950 pl-9 pr-3 text-sm text-slate-300 placeholder:text-slate-600 focus:ring-2 focus:ring-indigo-500 outline-hidden"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["ALL", "PAID", "PARTIALLY_PAID", "UNPAID", "OVERDUE"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all ${
                statusFilter === s
                  ? "bg-indigo-600 border-indigo-500 text-white"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            <CardTitle>Invoice Register ({filtered.length})</CardTitle>
          </div>
          <CardDescription>Full accounts receivable ledger with payment status tracking</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-4 px-4">Invoice</th>
                <th className="py-4 px-4">Project / Terms</th>
                <th className="py-4 px-4">Issue Date</th>
                <th className="py-4 px-4">Due Date</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-4 text-right">Balance Due</th>
                <th className="py-4 px-4 text-right">Status</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filtered.map((inv) => {
                const cfg = statusConfig[inv.status];
                const StatusIcon = cfg.icon;
                const balance = inv.amount - inv.paid;
                return (
                  <tr key={inv.id} className="hover:bg-slate-950/20 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{inv.client}</span>
                        <span className="text-[9px] font-mono text-slate-500">{inv.id}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="text-slate-300 font-medium truncate max-w-[160px]">{inv.project}</span>
                        <span className="text-[9px] text-slate-500">{inv.paymentTerms}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400 font-mono">{inv.issueDate}</td>
                    <td className="py-4 px-4 text-slate-400 font-mono">{inv.dueDate}</td>
                    <td className="py-4 px-4 text-right text-slate-200 font-bold font-mono">AED {inv.amount.toLocaleString()}</td>
                    <td className={`py-4 px-4 text-right font-bold font-mono ${balance > 0 ? "text-red-400" : "text-emerald-400"}`}>
                      {balance > 0 ? `AED ${balance.toLocaleString()}` : "—"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${cfg.cls}`}>
                        <StatusIcon className="h-2.5 w-2.5" />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="h-7 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center gap-1 text-[9px] font-bold transition-colors">
                          <Send className="h-3 w-3" /> Remind
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Create Invoice Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <Card className="w-full max-w-md border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-400" />
                <CardTitle>Issue New Invoice</CardTitle>
              </div>
              <CardDescription>Create and dispatch a new client invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreate} className="space-y-4">
                <Input
                  label="Client Name"
                  value={newClient}
                  onChange={(e) => setNewClient(e.target.value)}
                  placeholder="Al-Khaleej Water Assets"
                  required
                />
                <Input
                  label="Project / Service"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  placeholder="Industrial Filtration Upgrade"
                />
                <Input
                  label="Invoice Amount (AED)"
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="50000"
                  required
                />
                <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-800/60">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowCreate(false)}>Cancel</Button>
                  <Button type="submit" size="sm">Issue Invoice</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
