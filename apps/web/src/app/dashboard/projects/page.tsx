"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Droplets, Calendar, DollarSign, Users, Percent, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  const [projects] = useState([
    { id: "PRJ-01", name: "Sharjah Sewerage RO Installation", client: "Sharjah Municipality Dept", budget: 450000, start: "2026-02-01", progress: 68, status: "ACTIVE", teamCount: 8 },
    { id: "PRJ-02", name: "Jebel Ali Industrial Filtration Upgrade", client: "Al-Khaleej Water Assets", budget: 185000, start: "2026-09-10", progress: 10, status: "PLANNING", teamCount: 4 },
    { id: "PRJ-03", name: "Burj District Desalination Pipeline", client: "Emaar Properties PJSC", budget: 890000, start: "2025-05-01", progress: 100, status: "COMPLETED", teamCount: 15 },
  ]);

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Projects Directory</h1>
          <p className="text-slate-400 text-sm">Monitor active engineering site contracts, construction timelines, and team distributions.</p>
        </div>
        <div>
          <Button size="sm">Initiate New Project</Button>
        </div>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Capital Committed</span>
              <h3 className="text-2xl font-bold text-white font-mono">AED 1,525,000</h3>
              <p className="text-[10px] text-slate-400">Total consolidated budget</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              <DollarSign className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Active Contracts</span>
              <h3 className="text-2xl font-bold text-white">2 Active</h3>
              <p className="text-[10px] text-slate-400">Executing field operations</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
              <Droplets className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Average Progress</span>
              <h3 className="text-2xl font-bold text-white font-mono">59.3%</h3>
              <p className="text-[10px] text-slate-400">Weighted milestone completion</p>
            </div>
            <div className="h-11 w-11 rounded-lg flex items-center justify-center border border-amber-500/20 bg-amber-500/10 text-amber-400">
              <Percent className="h-5.5 w-5.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project list details */}
      <div className="grid grid-cols-1 gap-6">
        {projects.map((prj) => {
          const statusColors =
            prj.status === "COMPLETED"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : prj.status === "ACTIVE"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20";

          return (
            <Card key={prj.id} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 space-y-4">
                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded">{prj.id}</span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors}`}>
                        {prj.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{prj.name}</h3>
                    <p className="text-xs text-slate-400">Customer: <span className="text-slate-300 font-semibold">{prj.client}</span></p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0 justify-between md:justify-end border-t md:border-0 pt-3 md:pt-0 border-slate-800/40">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Allocated Budget</span>
                      <span className="text-base font-extrabold text-white font-mono">AED {prj.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>{prj.teamCount} Engineers</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 pt-2 border-t border-slate-800/40">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400">Roster Milestones Completed</span>
                    <span className="text-indigo-400 font-mono">{prj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-900">
                    <div
                      style={{ width: `${prj.progress}%` }}
                      className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full"
                    />
                  </div>
                  <div className="flex justify-end pt-1">
                    <Link
                      href={`/dashboard/projects/${prj.id}`}
                      className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors group"
                    >
                      View Details <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
