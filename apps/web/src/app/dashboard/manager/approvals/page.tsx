"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Check, X, ShieldAlert, FileCheck2, Clock, CheckCircle2 } from "lucide-react";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState([
    { id: "PO-2026-004", requester: "Jasim Salim (Procurement)", description: "Purchase order for 4x Hydro-Regulators Type-C", value: "AED 34,200", date: "Today, 09:14", type: "Procurement", priority: "CRITICAL" },
    { id: "LR-2026-118", requester: "Fatima Al-Hashemi (HR)", description: "Annual leave request override (18 calendar days) for Field Agent Yasmin", value: "Leave Request", date: "Yesterday", type: "Leave Request", priority: "HIGH" },
    { id: "CN-2026-089", requester: "Zaid Al-Habsi (Sales)", description: "Client discount override request (5% margin) for Al-Khaleej Waters", value: "Discount Override", date: "July 15, 2026", type: "Contract Override", priority: "MEDIUM" },
    { id: "BD-2026-012", requester: "Khalid IT (SysAdmin)", description: "Emergency server space scale allocation budget request", value: "AED 8,500", date: "July 14, 2026", type: "Infrastructure", priority: "LOW" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleAction = (id: string, action: "APPROVED" | "REJECTED") => {
    setApprovals(approvals.filter((app) => app.id !== id));
    setNotification(`Request ${id} has been successfully ${action.toLowerCase()}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Operational Approvals</h1>
        <p className="text-slate-400 text-sm">Review, authorize, or reject administrative and operational requests across the firm.</p>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-indigo-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {approvals.length === 0 ? (
        <Card className="border-slate-800/60 bg-slate-900/40 py-12">
          <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 flex items-center justify-center">
              <FileCheck2 className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-200">No Pending Approvals</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Your queue is clear. All procurement purchase orders and leave documents are current.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {approvals.map((req) => {
            const priorityColors =
              req.priority === "CRITICAL"
                ? "bg-red-500/10 text-red-400 border-red-500/20"
                : req.priority === "HIGH"
                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                : "bg-slate-500/10 text-slate-400 border-slate-500/20";

            return (
              <Card key={req.id} className="border-slate-800/60 bg-slate-900/40">
                <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">{req.id}</span>
                      <span className={`text-[10px] font-bold tracking-wider uppercase border px-2 py-0.5 rounded-full ${priorityColors}`}>
                        {req.priority}
                      </span>
                      <span className="text-[10px] text-slate-500">{req.date}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{req.requester}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{req.description}</p>
                    </div>
                    <div className="text-xs text-slate-500">
                      Category: <span className="text-slate-300 font-semibold">{req.type}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800/60">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Value</span>
                      <span className="text-base font-extrabold text-white">{req.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleAction(req.id, "REJECTED")}
                        variant="danger"
                        size="sm"
                        className="gap-1.5"
                      >
                        <X className="h-4 w-4" /> Reject
                      </Button>
                      <Button
                        onClick={() => handleAction(req.id, "APPROVED")}
                        variant="primary"
                        size="sm"
                        className="gap-1.5"
                      >
                        <Check className="h-4 w-4" /> Approve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
