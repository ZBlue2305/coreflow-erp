"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, Lock, Unlock, Sparkles } from "lucide-react";

export default function AccessControlPage() {
  const [acl, setAcl] = useState({
    MANAGER: { approve_requests: true, view_reports: true, manage_employees: false, manage_payroll: false, manage_system: false },
    HR: { approve_requests: false, view_reports: false, manage_employees: true, manage_payroll: true, manage_system: false },
    SALES: { approve_requests: false, view_reports: false, manage_employees: false, manage_payroll: false, manage_system: false },
    IT: { approve_requests: false, view_reports: true, manage_employees: false, manage_payroll: false, manage_system: true },
    AGENT: { approve_requests: false, view_reports: false, manage_employees: false, manage_payroll: false, manage_system: false },
  });

  const [notification, setNotification] = useState<string | null>(null);

  const togglePermission = (role: string, permission: string) => {
    const roleKey = role as keyof typeof acl;
    const permKey = permission as keyof typeof acl[keyof typeof acl];
    const prevVal = acl[roleKey][permKey];

    setAcl({
      ...acl,
      [roleKey]: {
        ...acl[roleKey],
        [permKey]: !prevVal,
      },
    });

    setNotification(`Access Control List updated. ${role} -> ${permission} set to ${!prevVal ? "ALLOWED" : "DENIED"}.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const permissions = [
    { key: "approve_requests", label: "Approve Requests", desc: "Approve leaves, budgets and POs" },
    { key: "view_reports", label: "View Executive Reports", desc: "Access KPIs and financial charts" },
    { key: "manage_employees", label: "Manage Employees", desc: "Create, edit and terminate profiles" },
    { key: "manage_payroll", label: "Manage Payroll", desc: "Disburse payouts and write allowances" },
    { key: "manage_system", label: "Manage System Settings", desc: "Database backup and ACL mappings" },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Access Control List (ACL)</h1>
        <p className="text-slate-400 text-sm">Configure granular resource access privileges and API authorization mappings per role.</p>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-indigo-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* ACL matrix table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-indigo-400" />
            <CardTitle>RBAC Permission Matrix</CardTitle>
          </div>
          <CardDescription>Click checkmarks to modify policy access criteria in real-time</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6 w-1/3">Permission Name & Action</th>
                <th className="py-4 px-3 text-center">MANAGER</th>
                <th className="py-4 px-3 text-center">HR</th>
                <th className="py-4 px-3 text-center">SALES</th>
                <th className="py-4 px-3 text-center">IT</th>
                <th className="py-4 px-3 text-center">AGENT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {permissions.map((perm) => (
                <tr key={perm.key} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-200">{perm.label}</span>
                      <span className="text-[10px] text-slate-500">{perm.desc}</span>
                    </div>
                  </td>
                  {["MANAGER", "HR", "SALES", "IT", "AGENT"].map((role) => {
                    const rKey = role as keyof typeof acl;
                    const pKey = perm.key as keyof typeof acl[keyof typeof acl];
                    const isAllowed = acl[rKey][pKey];

                    return (
                      <td key={role} className="py-4 px-3 text-center">
                        <button
                          onClick={() => togglePermission(role, perm.key)}
                          className={`h-7 w-7 rounded-lg border flex items-center justify-center mx-auto transition-all ${
                            isAllowed
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                          }`}
                        >
                          {isAllowed ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
