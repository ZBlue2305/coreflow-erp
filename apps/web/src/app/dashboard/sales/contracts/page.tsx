"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Handshake, FileCheck, CheckCircle2, ShieldAlert, Award, FileSignature } from "lucide-react";

export default function ContractsPage() {
  const [contracts, setContracts] = useState([
    { id: "CON-9901", client: "Sharjah Municipality Dept", project: "Reverse Osmosis Installation", value: 450000, start: "2026-02-01", expiry: "2027-02-01", status: "ACTIVE" },
    { id: "CON-9902", client: "Al-Khaleej Water Assets", project: "Carbon Filters Upgrade", value: 185000, start: "2026-09-10", expiry: "2027-03-10", status: "PENDING_SIGNATURE" },
    { id: "CON-9903", client: "Emaar Properties PJSC", project: "Burj Desalination Pipeline", value: 890000, start: "2025-05-01", expiry: "2026-05-01", status: "EXPIRED" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleSign = (id: string) => {
    setContracts(contracts.map((c) => (c.id === id ? { ...c, status: "ACTIVE" } : c)));
    setNotification(`Contract ${id} has been signed digitally and is now active.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Corporate Service Agreements</h1>
        <p className="text-slate-400 text-sm">Review closed client project definitions, start dates, and validation cycles.</p>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Overview grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Value Closed</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED 635,000</h3>
              <p className="text-[10px] text-slate-400">Excludes expired agreements</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Award className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Signature Queue</span>
              <h3 className="text-2xl font-bold text-white">
                {contracts.filter((c) => c.status === "PENDING_SIGNATURE").length} Pending
              </h3>
              <p className="text-[10px] text-slate-400">Awaiting client signature</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <FileSignature className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Contract Count</span>
              <h3 className="text-2xl font-bold text-white">
                {contracts.filter((c) => c.status === "ACTIVE").length} Active
              </h3>
              <p className="text-[10px] text-slate-400">Currently executing operations</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <FileCheck className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List cards of contracts */}
      <div className="space-y-4">
        {contracts.map((c) => {
          const badgeStyle =
            c.status === "ACTIVE"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : c.status === "PENDING_SIGNATURE"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse"
              : "bg-slate-500/10 text-slate-500 border-slate-800";

          return (
            <Card key={c.id} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded">{c.id}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeStyle}`}>
                      {c.status.replace("_", " ")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">{c.client}</h3>
                    <p className="text-xs text-slate-400">{c.project}</p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span>Initiated: <span className="text-slate-300 font-semibold">{c.start}</span></span>
                    <span>•</span>
                    <span>Expires: <span className="text-slate-300 font-semibold">{c.expiry}</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-0 pt-4 md:pt-0 border-slate-800/40">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Valuation</span>
                    <span className="text-base font-extrabold text-white font-mono">AED {c.value.toLocaleString()}</span>
                  </div>
                  {c.status === "PENDING_SIGNATURE" && (
                    <Button onClick={() => handleSign(c.id)} size="sm" className="gap-2.5">
                      <FileSignature className="h-4 w-4" /> Seal & Sign
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
