"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, Calendar, CheckCircle2, Award } from "lucide-react";

export default function AgentTimecardPage() {
  const [logs] = useState([
    { date: "2026-07-16", clockIn: "08:02 AM", clockOut: "05:14 PM", hours: 9.2, status: "PRESENT" },
    { date: "2026-07-15", clockIn: "08:14 AM", clockOut: "05:00 PM", hours: 8.75, status: "PRESENT" },
    { date: "2026-07-14", clockIn: "07:55 AM", clockOut: "05:05 PM", hours: 9.15, status: "PRESENT" },
    { date: "2026-07-13", clockIn: "08:00 AM", clockOut: "05:00 PM", hours: 9.0, status: "PRESENT" },
    { date: "2026-07-10", clockIn: "08:35 AM", clockOut: "05:00 PM", hours: 8.4, status: "LATE" },
  ]);

  const calculateAccumulatedHours = () => {
    return logs.reduce((acc, l) => acc + l.hours, 0);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Timecard Logs</h1>
        <p className="text-slate-400 text-sm">Review your logged shift hours, accumulated work duration, and HR status records.</p>
      </div>

      {/* Stats summaries */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Accumulated Hours</span>
              <h3 className="text-2xl font-bold text-white font-mono">{calculateAccumulatedHours()} Hours</h3>
              <p className="text-[10px] text-slate-400">Total logged from last 5 shifts</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <Clock className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Average Shift</span>
              <h3 className="text-2xl font-bold text-white font-mono">8.9 Hours</h3>
              <p className="text-[10px] text-slate-400">Based on regular 5-day cycle</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Award className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Billing Rate status</span>
              <h3 className="text-2xl font-bold text-white font-mono">Normal</h3>
              <p className="text-[10px] text-slate-400">No active overtime multipliers</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Calendar className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roster sheet */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <CardTitle>Roster History</CardTitle>
          <CardDescription>Verified attendance timestamps registered in HR logs</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">Shift Date</th>
                <th className="py-4 px-6">Clock In Time</th>
                <th className="py-4 px-6">Clock Out Time</th>
                <th className="py-4 px-6">Duration Logged</th>
                <th className="py-4 px-6 text-right"> Roster Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 font-mono">
              {logs.map((log, idx) => {
                const statusStyle =
                  log.status === "PRESENT"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                return (
                  <tr key={idx} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-6 font-sans font-semibold text-slate-300">{log.date}</td>
                    <td className="py-4 px-6 font-medium text-slate-400">{log.clockIn}</td>
                    <td className="py-4 px-6 font-medium text-slate-400">{log.clockOut}</td>
                    <td className="py-4 px-6 font-semibold text-indigo-400">{log.hours} hours</td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusStyle}`}>
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
