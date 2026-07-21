"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users2, Search, Mail, Phone, MapPin, Briefcase } from "lucide-react";

export default function CRMPage() {
  const [search, setSearch] = useState("");

  const [clients] = useState([
    { id: "CRM-001", company: "Sharjah Government Dept", contact: "Salem Al-Harthi", email: "info@shj-muni.gov.ae", phone: "+971 6 555 1234", address: "Government Square, Sharjah", projects: 1 },
    { id: "CRM-002", company: "Al Khaleej Group Assets", contact: "Jasim Salim", email: "procurement@alkhaleej.ae", phone: "+971 4 999 8888", address: "Marina Towers, Dubai", projects: 1 },
    { id: "CRM-003", company: "Emaar Properties PJSC", contact: "Lina Vance", email: "contracts@emaar.ae", phone: "+971 4 367 3333", address: "Downtown Dubai, UAE", projects: 1 },
  ]);

  const filteredClients = clients.filter((c) => {
    return c.company.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">CRM Contacts & Accounts</h1>
          <p className="text-slate-400 text-sm">Review client corporate portfolios, representative contact details, and locations.</p>
        </div>
        <div>
          <Button size="sm">Register Account</Button>
        </div>
      </div>

      {/* Operations search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search CRM by company or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950/50 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* CRM list cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="border-slate-800/60 bg-slate-900/40 hover:border-slate-800 transition-colors">
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center font-bold">
                  {client.company[0]}
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-200">{client.company}</CardTitle>
                  <CardDescription className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-400 mt-0.5">{client.id}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Users2 className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Representative</p>
                  <p className="text-slate-300 font-medium">{client.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contact Email</p>
                  <p className="text-slate-300 font-medium">{client.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contact Phone</p>
                  <p className="text-slate-300 font-medium">{client.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Head Office</p>
                  <p className="text-slate-300 font-medium">{client.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 pt-3.5 border-t border-slate-800/40 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                <Briefcase className="h-4 w-4 text-indigo-400 shrink-0" />
                <span>{client.projects} Active Project Site</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
