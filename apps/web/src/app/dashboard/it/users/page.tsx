"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Cpu, Search, CheckCircle2, UserCheck, ShieldAlert, KeyRound } from "lucide-react";

interface ERPUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "ACTIVE" | "INACTIVE";
  lastActive: string;
}

export default function ITUsersPage() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<ERPUser[]>([
    { id: "USR-001", name: "Ahmed Manager", email: "manager@erp.com", role: "MANAGER", status: "ACTIVE", lastActive: "10 mins ago" },
    { id: "USR-002", name: "Fatima HR", email: "hr@erp.com", role: "HR", status: "ACTIVE", lastActive: "1 hour ago" },
    { id: "USR-003", name: "Zaid Sales", email: "sales@erp.com", role: "SALES", status: "ACTIVE", lastActive: "3 hours ago" },
    { id: "USR-004", name: "Khalid IT", email: "it@erp.com", role: "IT", status: "ACTIVE", lastActive: "Just now" },
    { id: "USR-005", name: "Yasmin Agent", email: "agent@erp.com", role: "AGENT", status: "ACTIVE", lastActive: "Yesterday" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    setNotification(`User role update complete. ID ${id} is now mapped to ${newRole}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleStatusToggle = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    setUsers(users.map((u) => (u.id === id ? { ...u, status: nextStatus as any } : u)));
    setNotification(`User status changed for ${id}. New state: ${nextStatus}.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const filteredUsers = users.filter((u) => {
    return u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">ERP User Registry</h1>
        <p className="text-slate-400 text-sm">Review registered credentials accounts, suspend logs, and map security roles.</p>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-indigo-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Operations Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 backdrop-blur-md">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute top-3.5 left-3 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-lg border border-slate-700 bg-slate-950/50 pl-9 pr-4 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Users table */}
      <Card className="border-slate-800/60 bg-slate-900/40">
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-4 px-6">User Account</th>
                <th className="py-4 px-6">System ID</th>
                <th className="py-4 px-6">Role Mapping</th>
                <th className="py-4 px-6">Active Status</th>
                <th className="py-4 px-6">Last Session</th>
                <th className="py-4 px-6 text-right">Access Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredUsers.map((u) => {
                const statusStyle =
                  u.status === "ACTIVE"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20";

                return (
                  <tr key={u.id} className="hover:bg-slate-950/20 text-slate-300 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-200">{u.name}</span>
                        <span className="text-[10px] text-slate-500">{u.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono font-medium text-slate-400">{u.id}</td>
                    <td className="py-4 px-6">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-slate-300 rounded px-2.5 py-1 text-xs focus:ring-2 focus:ring-indigo-500 outline-hidden font-bold"
                      >
                        <option value="AGENT">AGENT</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="HR">HR</option>
                        <option value="SALES">SALES</option>
                        <option value="IT">IT</option>
                      </select>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase border ${statusStyle}`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-400 font-medium">{u.lastActive}</td>
                    <td className="py-4 px-6 text-right">
                      <Button
                        onClick={() => handleStatusToggle(u.id, u.status)}
                        variant="outline"
                        size="sm"
                        className={u.status === "ACTIVE" ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"}
                      >
                        {u.status === "ACTIVE" ? "Suspend Account" : "Activate Account"}
                      </Button>
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
