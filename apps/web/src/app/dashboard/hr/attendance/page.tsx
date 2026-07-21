"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CalendarDays, Clock, CheckCircle2, UserCheck, ShieldAlert, AlertTriangle } from "lucide-react";

export default function AttendancePage() {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [records, setRecords] = useState([
    { id: "ATT-100", empId: "QA-2026-005", name: "Yasmin Agent", date: "2026-07-16", clockIn: "08:02 AM", clockOut: "05:14 PM", hours: "9.2 hrs", status: "PRESENT" },
    { id: "ATT-101", empId: "QA-2026-003", name: "Zaid Sales", date: "2026-07-16", clockIn: "08:35 AM", clockOut: "05:00 PM", hours: "8.4 hrs", status: "LATE" },
    { id: "ATT-102", empId: "QA-2026-004", name: "Khalid IT", date: "2026-07-16", clockIn: "07:54 AM", clockOut: "05:05 PM", hours: "9.1 hrs", status: "PRESENT" },
    { id: "ATT-103", empId: "QA-2026-001", name: "Ahmed Manager", date: "2026-07-16", clockIn: "08:00 AM", clockOut: "06:15 PM", hours: "10.25 hrs", status: "PRESENT" },
    { id: "ATT-104", empId: "QA-2026-002", name: "Fatima HR", date: "2026-07-16", clockIn: "08:05 AM", clockOut: "04:55 PM", hours: "8.8 hrs", status: "PRESENT" },
    { id: "ATT-105", empId: "QA-2026-006", name: "Salem Al-Harthi", date: "2026-07-16", clockIn: "08:42 AM", clockOut: "05:00 PM", hours: "8.3 hrs", status: "LATE" },
    { id: "ATT-106", empId: "QA-2026-007", name: "Tariq Mahmood", date: "2026-07-16", clockIn: "—", clockOut: "—", hours: "—", status: "ABSENT" },
  ]);

  const filteredRecords = records.filter((rec) => {
    return statusFilter === "ALL" || rec.status === statusFilter;
  });

  const kpis = [
    { label: "Presence Ratio", value: "94.2%", desc: "31 active personnel clocked-in", icon: UserCheck, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Lateness Index", value: "2 incidents", desc: "Today's logs", icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Total Hours Logged", value: "248.5 Hours", desc: "Accumulated this week", icon: Clock, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Attendance Dashboard</h1>
          <p className="text-slate-400 text-sm">Monitor employee time logs, shift rosters, and lateness statistics.</p>
        </div>
        <div>
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarDays className="h-4.5 w-4.5" /> Month Summary
          </Button>
        </div>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{kpi.label}</span>
                  <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
                  <p className="text-[10px] text-slate-400">{kpi.desc}</p>
                </div>
                <div className={`h-11 w-11 rounded-lg flex items-center justify-center border ${kpi.color}`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Control panel and table */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/40 p-4 border border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Status:</span>
          <div className="flex gap-2">
            {["ALL", "PRESENT", "LATE", "ABSENT"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  statusFilter === st
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                    : "bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-4 px-6">Employee ID & Name</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Clock In</th>
                  <th className="py-4 px-6">Clock Out</th>
                  <th className="py-4 px-6">Work Session</th>
                  <th className="py-4 px-6">Presence Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {filteredRecords.map((rec) => {
                  const badgeStyle =
                    rec.status === "PRESENT"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : rec.status === "LATE"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-red-500/10 text-red-400 border-red-500/20";

                  return (
                    <tr key={rec.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-200">{rec.name}</span>
                          <span className="text-[10px] text-slate-500">ID: {rec.empId}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono font-medium text-slate-400">{rec.date}</td>
                      <td className="py-4 px-6 font-mono font-medium text-slate-300">{rec.clockIn}</td>
                      <td className="py-4 px-6 font-mono font-medium text-slate-300">{rec.clockOut}</td>
                      <td className="py-4 px-6 font-mono font-semibold text-indigo-400">{rec.hours}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${badgeStyle}`}>
                          {rec.status}
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
    </div>
  );
}
