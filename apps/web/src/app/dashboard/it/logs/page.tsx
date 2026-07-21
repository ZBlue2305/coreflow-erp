"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Terminal, Search, FileDown } from "lucide-react";

interface AuditLog {
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  status: "SUCCESS" | "FAILED" | "BLOCKED";
}

export default function ITLogsPage() {
  const [search, setSearch] = useState("");
  
  const [logs] = useState<AuditLog[]>([
    { timestamp: "2026-07-16 23:14:02", user: "ahmed.manager@erp.com", action: "Approved Purchase Order PO-004", ip: "192.168.1.14", status: "SUCCESS" },
    { timestamp: "2026-07-16 22:58:45", user: "system-cron", action: "Completed database backup to Neon Direct", ip: "localhost", status: "SUCCESS" },
    { timestamp: "2026-07-16 22:42:10", user: "unknown-ip", action: "Failed SSH access request to Node-04", ip: "185.220.101.4", status: "BLOCKED" },
    { timestamp: "2026-07-16 22:15:30", user: "fatima.hr@erp.com", action: "Modified employee directory file", ip: "192.168.1.42", status: "SUCCESS" },
    { timestamp: "2026-07-16 21:05:14", user: "zaid.sales@erp.com", action: "Dispatched Quotation QT-2026-0001 to Al-Khaleej", ip: "192.168.1.28", status: "SUCCESS" },
    { timestamp: "2026-07-16 20:44:11", user: "khalid.it@erp.com", action: "Updated ACL matrix rules", ip: "192.168.1.5", status: "SUCCESS" },
    { timestamp: "2026-07-16 19:30:00", user: "yasmin.agent@erp.com", action: "Clocked in daily shift timer", ip: "192.168.1.19", status: "SUCCESS" },
  ]);

  const filteredLogs = logs.filter((log) => {
    return log.user.toLowerCase().includes(search.toLowerCase()) || log.action.toLowerCase().includes(search.toLowerCase());
  });

  const exportLogs = () => {
    const headers = "Timestamp,User,Action,IP,Status\n";
    const rows = filteredLogs.map((l) => `"${l.timestamp}","${l.user}","${l.action}","${l.ip}","${l.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `erp_audit_logs_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">System Audit Trail</h1>
          <p className="text-slate-400 text-sm">Analyze database transactions, role reallocations, and failed verification attempts.</p>
        </div>
        <div>
          <Button onClick={exportLogs} variant="outline" size="sm" className="gap-2 font-bold">
            <FileDown className="h-4.5 w-4.5" /> Export Logs (CSV)
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search logs by action or user email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950/50 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Logs Table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Timestamp</th>
                <th className="py-4 px-6">User Account</th>
                <th className="py-4 px-6">Action / Event</th>
                <th className="py-4 px-6">IP Address</th>
                <th className="py-4 px-6 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {filteredLogs.map((log, idx) => {
                const statusStyle =
                  log.status === "SUCCESS"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : log.status === "BLOCKED"
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                return (
                  <tr key={idx} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-6 text-slate-500 font-semibold">{log.timestamp}</td>
                    <td className="py-4 px-6 text-slate-200 font-sans font-semibold">{log.user}</td>
                    <td className="py-4 px-6 text-slate-300 font-sans font-medium">{log.action}</td>
                    <td className="py-4 px-6 text-slate-500 font-semibold">{log.ip}</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusStyle}`}>
                        {log.status}
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
