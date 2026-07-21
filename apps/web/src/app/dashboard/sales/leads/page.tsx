"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Users2, Plus, Search, Mail, UserPlus, CheckCircle2, TrendingUp } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: string;
  status: string;
  date: string;
}

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [showAddLead, setShowAddLead] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [value, setValue] = useState("50000");
  const [status, setStatus] = useState("NEW");

  const [leads, setLeads] = useState<Lead[]>([
    { id: "LD-001", name: "Salem Al-Harthi", company: "Sharjah Development Authority", email: "s.harthi@shj-dev.ae", phone: "+971 6 555 9999", value: "AED 620,000", status: "QUALIFIED", date: "2026-07-10" },
    { id: "LD-002", name: "Jasim Salim", company: "Al Ain Municipal Utility", email: "j.salim@alain.gov.ae", phone: "+971 3 777 1234", value: "AED 450,000", status: "CONTACTED", date: "2026-07-12" },
    { id: "LD-003", name: "Tariq Mahmood", company: "Gulf Construction Partners", email: "t.mahmood@gcp.com", phone: "+971 4 222 4444", value: "AED 280,000", status: "NEW", date: "2026-07-15" },
    { id: "LD-004", name: "Sarah Connor", company: "Burj Facilities UAE", email: "s.connor@burjfac.ae", phone: "+971 4 888 7777", value: "AED 95,000", status: "NEW", date: "2026-07-16" },
  ]);

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !company || !email) return;

    const nextId = leads.length + 1;
    const newLd: Lead = {
      id: `LD-00${nextId}`,
      name: `${firstName} ${lastName}`,
      company,
      email,
      phone: phone || "+971 50 000 0000",
      value: `AED ${Number(value).toLocaleString()}`,
      status,
      date: new Date().toISOString().split("T")[0],
    };

    setLeads([newLd, ...leads]);
    setShowAddLead(false);

    // reset
    setFirstName("");
    setLastName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setValue("50000");
    setStatus("NEW");
  };

  const filteredLeads = leads.filter((ld) => {
    const matchesSearch = ld.name.toLowerCase().includes(search.toLowerCase()) || ld.company.toLowerCase().includes(search.toLowerCase()) || ld.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ld.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Acquisitions & Leads</h1>
          <p className="text-slate-400 text-sm">Log potential customer accounts and manage corporate bidding opportunities.</p>
        </div>
        <div>
          <Button onClick={() => setShowAddLead(true)} className="gap-2.5 font-bold">
            <Plus className="h-4.5 w-4.5" /> Log Sales Lead
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Pipeline Value</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED 1,445,000</h3>
              <p className="text-[10px] text-indigo-400 font-medium">All active leads</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Qualified Leads</span>
              <h3 className="text-2xl font-bold text-white">
                {leads.filter((l) => l.status === "QUALIFIED").length} Leads
              </h3>
              <p className="text-[10px] text-slate-400">Converted to pipeline proposal</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Users2 className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">New Inquiries</span>
              <h3 className="text-2xl font-bold text-white">
                {leads.filter((l) => l.status === "NEW").length} Leads
              </h3>
              <p className="text-[10px] text-slate-400">Received this week</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <UserPlus className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter / Search Operations bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search leads by name or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950/50 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden text-xs font-semibold"
          >
            <option value="ALL">All Stages</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Lead & Company</th>
                <th className="py-4 px-6">Date Logged</th>
                <th className="py-4 px-6">Estimated Value</th>
                <th className="py-4 px-6">Stage Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredLeads.map((ld) => {
                const badgeStyle =
                  ld.status === "QUALIFIED"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : ld.status === "CONTACTED"
                    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    : ld.status === "NEW"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20";

                return (
                  <tr key={ld.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{ld.name}</span>
                        <span className="text-[10px] text-slate-500">{ld.company} • {ld.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-400">{ld.date}</td>
                    <td className="py-4 px-6 font-mono font-semibold text-slate-100">{ld.value}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${badgeStyle}`}>
                        {ld.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Button variant="outline" size="sm">Qualify Lead</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Log Sales Lead Modal */}
      {showAddLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-fade-in">
          <Card className="w-full max-w-lg border-slate-800 bg-slate-900 shadow-2xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users2 className="h-5 w-5 text-indigo-400" />
                <CardTitle>Log Sales Inquiry</CardTitle>
              </div>
              <CardDescription>Log potential contract opportunity or lead metadata</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddLead} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Lead First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Tariq"
                    required
                  />
                  <Input
                    label="Lead Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Al-Mansoor"
                    required
                  />
                </div>
                <Input
                  label="Company Name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Dubai Real Estate Ltd"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="t.mansoor@dubairealestate.ae"
                    required
                  />
                  <Input
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+971 4 XXXXXXX"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Estimated Contract Payout (AED)"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                  />
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-300">Acquisition Stage</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden"
                    >
                      <option value="NEW">New Inquiry</option>
                      <option value="CONTACTED">Contacted / Pitching</option>
                      <option value="QUALIFIED">Qualified / Negotiating</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-800/60">
                  <Button type="button" variant="outline" size="sm" onClick={() => setShowAddLead(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Register Lead
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
