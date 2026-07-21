"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { TrendingUp, Award, Zap, Compass, Users } from "lucide-react";

export default function PerformancePage() {
  const departments = [
    { name: "Field Engineering", efficiency: 94, projects: "8 Sites", headCount: 22, lead: "General Manager (Ahmed)" },
    { name: "Sales Department", efficiency: 88, projects: "12 Deals", headCount: 6, lead: "Zaid Sales" },
    { name: "Human Resources", efficiency: 91, projects: "Recruiting", headCount: 3, lead: "Fatima HR" },
    { name: "IT Operations", efficiency: 97, projects: "Security", headCount: 2, lead: "Khalid IT" },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Corporate Performance</h1>
        <p className="text-slate-400 text-sm">Review efficiency scorecards, department milestones, and team targets.</p>
      </div>

      {/* Grid of highlights */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Average Efficiency</span>
              <h3 className="text-2xl font-bold text-white">92.5%</h3>
              <p className="text-[10px] text-indigo-400 font-medium">Outperforming corporate target (+2.5%)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Milestones Reached</span>
              <h3 className="text-2xl font-bold text-white">14 Completed</h3>
              <p className="text-[10px] text-emerald-400 font-medium">9 active milestones in progress</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Headcount Index</span>
              <h3 className="text-2xl font-bold text-white">33 Employees</h3>
              <p className="text-[10px] text-indigo-400 font-medium">Full alignment with HR allocations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments detail scorecard */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <CardTitle>Department Scorecards</CardTitle>
          <CardDescription>Review operational completion indexes and lead administrators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="space-y-2.5 pb-6 last:pb-0 border-b last:border-0 border-slate-800/60">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold text-slate-200">{dept.name}</h4>
                  <span className="text-[10px] text-slate-500">Lead: {dept.lead} • Staff: {dept.headCount}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-indigo-400">{dept.efficiency}% Efficiency</span>
                  <p className="text-[10px] text-slate-500">{dept.projects} currently assigned</p>
                </div>
              </div>
              
              {/* Custom CSS progress bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-900">
                <div
                  style={{ width: `${dept.efficiency}%` }}
                  className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
