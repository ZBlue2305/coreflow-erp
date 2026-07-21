"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Droplets,
  Users,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const projectsDB: Record<string, {
  id: string;
  name: string;
  client: string;
  clientContact: string;
  location: string;
  budget: number;
  spent: number;
  start: string;
  end: string;
  progress: number;
  status: "ACTIVE" | "PLANNING" | "COMPLETED";
  teamCount: number;
  description: string;
  milestones: { label: string; date: string; done: boolean }[];
  team: { name: string; role: string }[];
}> = {
  "PRJ-01": {
    id: "PRJ-01",
    name: "Sharjah Sewerage RO Installation",
    client: "Sharjah Municipality Dept",
    clientContact: "Eng. Khalid Al-Mazrouei",
    location: "Sharjah Industrial Area 7, UAE",
    budget: 450000,
    spent: 298000,
    start: "2026-02-01",
    end: "2026-11-30",
    progress: 68,
    status: "ACTIVE",
    teamCount: 8,
    description: "Installation of a large-scale reverse osmosis plant to treat and purify industrial sewerage effluent. The system is designed to process 5,000 m³/day with 99.2% TDS rejection rate using Toray membrane arrays.",
    milestones: [
      { label: "Site Preparation & Groundworks", date: "2026-02-28", done: true },
      { label: "Equipment Procurement & Customs", date: "2026-04-15", done: true },
      { label: "RO Membrane Frame Assembly", date: "2026-06-01", done: true },
      { label: "Pipeline Integration & Pressure Tests", date: "2026-08-15", done: false },
      { label: "SCADA Automation Configuration", date: "2026-10-01", done: false },
      { label: "Final Commissioning & Handover", date: "2026-11-30", done: false },
    ],
    team: [
      { name: "Hassan Al-Farsi", role: "Project Manager" },
      { name: "Reem Khalid", role: "Mechanical Engineer" },
      { name: "Omar Jassim", role: "Site Supervisor" },
      { name: "Lina Rashid", role: "QA / QC Inspector" },
      { name: "Bilal Nasser", role: "Electrical Systems" },
      { name: "Amira Tariq", role: "Chemical Engineer" },
      { name: "Faisal Al-Balushi", role: "Field Technician" },
      { name: "Dana Yousef", role: "Health & Safety Officer" },
    ],
  },
  "PRJ-02": {
    id: "PRJ-02",
    name: "Jebel Ali Industrial Filtration Upgrade",
    client: "Al-Khaleej Water Assets",
    clientContact: "Eng. Sara Bint-Khalid",
    location: "Jebel Ali Free Zone, Dubai, UAE",
    budget: 185000,
    spent: 22000,
    start: "2026-09-10",
    end: "2027-03-31",
    progress: 10,
    status: "PLANNING",
    teamCount: 4,
    description: "Phased upgrade of industrial multimedia filtration units at the Jebel Ali JAFZA processing hub. Includes replacement of aging granular activated carbon (GAC) filters and integration of IoT-based real-time water quality monitoring.",
    milestones: [
      { label: "Engineering Design & BOM Finalization", date: "2026-09-30", done: true },
      { label: "Material Procurement Phase 1", date: "2026-11-15", done: false },
      { label: "Equipment Installation Phase 1", date: "2027-01-15", done: false },
      { label: "Testing & Calibration", date: "2027-02-28", done: false },
      { label: "Handover & Documentation", date: "2027-03-31", done: false },
    ],
    team: [
      { name: "Tariq Al-Habsi", role: "Lead Engineer" },
      { name: "Noura Al-Hajri", role: "Procurement Lead" },
      { name: "Ahmed Mansour", role: "Field Technician" },
      { name: "Yusuf Ibrahim", role: "Safety Officer" },
    ],
  },
  "PRJ-03": {
    id: "PRJ-03",
    name: "Burj District Desalination Pipeline",
    client: "Emaar Properties PJSC",
    clientContact: "Dir. Laila Al-Maktoum",
    location: "Downtown Dubai – Burj Khalifa District",
    budget: 890000,
    spent: 890000,
    start: "2025-05-01",
    end: "2026-03-31",
    progress: 100,
    status: "COMPLETED",
    teamCount: 15,
    description: "Design, supply, and installation of a complete seawater desalination distribution pipeline to serve the premium Burj Khalifa residential and hospitality district with tertiary-treated potable water supply.",
    milestones: [
      { label: "Initial Design & Regulatory Approvals", date: "2025-06-15", done: true },
      { label: "Main Trunk Pipeline Excavation", date: "2025-09-01", done: true },
      { label: "Desalination Unit Installation", date: "2025-11-30", done: true },
      { label: "Distribution Network Integration", date: "2026-01-31", done: true },
      { label: "Quality Certification & Final Testing", date: "2026-03-15", done: true },
      { label: "Client Handover & Warranty Activation", date: "2026-03-31", done: true },
    ],
    team: [
      { name: "Dr. Khalid Al-Zarouni", role: "Chief Engineer" },
      { name: "Mariam Hussain", role: "Desalination Specialist" },
      { name: "Saeed Al-Mulla", role: "Site Director" },
      { name: "Nadia Farooq", role: "Environmental Compliance" },
      { name: "Jaber Al-Nuaimi", role: "Civil Works Lead" },
      { name: "Shaikha Al-Mansoori", role: "Quality Assurance" },
    ],
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const project = projectsDB[projectId];

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 text-slate-400">
        <AlertCircle className="h-12 w-12 text-slate-600" />
        <p className="text-lg font-semibold">Project not found</p>
        <Link href="/dashboard/projects">
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  const statusColors = {
    COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    ACTIVE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PLANNING: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const budgetPct = Math.round((project.spent / project.budget) * 100);

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Back Navigation */}
      <div>
        <Link href="/dashboard/projects">
          <button className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects Directory
          </button>
        </Link>
      </div>

      {/* Project Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2.5 py-1 rounded-md">
              {project.id}
            </span>
            <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusColors[project.status]}`}>
              {project.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">{project.name}</h1>
          <p className="text-slate-400 text-sm max-w-2xl">{project.description}</p>
          <div className="flex items-center gap-4 flex-wrap text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> {project.client}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {project.location}</span>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {project.teamCount} Engineers</span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm">Generate Report</Button>
          <Button size="sm">Edit Project</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Budget", value: `AED ${project.budget.toLocaleString()}`, icon: DollarSign, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
          { label: "Spent to Date", value: `AED ${project.spent.toLocaleString()}`, icon: TrendingUp, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
          { label: "Start Date", value: project.start, icon: Calendar, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
          { label: "Target Completion", value: project.end, icon: Clock, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <Card key={i} className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-5 flex items-center gap-3">
                <div className={`h-10 w-10 shrink-0 rounded-lg flex items-center justify-center border ${kpi.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">{kpi.label}</span>
                  <span className="text-sm font-bold text-white font-mono">{kpi.value}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Progress + Budget */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Milestone Progress */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-indigo-400" />
              <CardTitle>Project Milestones</CardTitle>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <CardDescription>Phase completion tracker</CardDescription>
              <span className="font-bold text-indigo-400 font-mono">{project.progress}% Complete</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-900 mt-2">
              <div
                style={{ width: `${project.progress}%` }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-full rounded-full transition-all"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {project.milestones.map((m, i) => (
              <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-800/30 last:border-0">
                <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center ${m.done ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-600"}`}>
                  {m.done ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3 w-3" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-semibold ${m.done ? "text-slate-300" : "text-slate-500"}`}>{m.label}</p>
                  <p className="text-[10px] text-slate-600 font-mono mt-0.5">{m.date}</p>
                </div>
                {m.done && (
                  <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                    Done
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Budget Utilization */}
        <div className="space-y-6">
          <Card className="border-slate-800/60 bg-slate-900/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-indigo-400" />
                <CardTitle>Budget Utilization</CardTitle>
              </div>
              <CardDescription>Financial spend vs. total allocated contract value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-400">Spent</span>
                  <span className="font-mono text-white">AED {project.spent.toLocaleString()} ({budgetPct}%)</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-900">
                  <div
                    style={{ width: `${budgetPct}%` }}
                    className={`h-full rounded-full ${budgetPct > 90 ? "bg-red-500" : budgetPct > 70 ? "bg-amber-500" : "bg-indigo-500"}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>AED 0</span>
                  <span className="text-slate-400">Budget: AED {project.budget.toLocaleString()}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Remaining Budget", value: `AED ${(project.budget - project.spent).toLocaleString()}`, cls: "text-emerald-400" },
                  { label: "Burn Rate", value: `${budgetPct}% Used`, cls: budgetPct > 80 ? "text-red-400" : "text-amber-400" },
                  { label: "Client", value: project.client, cls: "text-slate-300" },
                  { label: "Contact", value: project.clientContact, cls: "text-slate-400" },
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-950/40 border border-slate-900 space-y-0.5">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-600">{item.label}</span>
                    <p className={`text-xs font-semibold ${item.cls}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Roster */}
          <Card className="border-slate-800/60 bg-slate-900/40">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-400" />
                <CardTitle>Site Engineering Team</CardTitle>
              </div>
              <CardDescription>{project.teamCount} personnel deployed on this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {project.team.map((member, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-800/30 last:border-0">
                    <div className="h-8 w-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-indigo-400 shrink-0">
                      {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-200">{member.name}</p>
                      <p className="text-[10px] text-slate-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
