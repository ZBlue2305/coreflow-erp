import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Cpu, ShieldCheck, Terminal, HeartPulse, ShieldAlert, Key, Database } from "lucide-react";

export default function ITDashboard() {
  const stats = [
    { label: "Systems Health", value: "99.98% Uptime", change: "All server groups nominal", icon: HeartPulse, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "System Nodes", value: "12 Active Clusters", change: "4 Edge SCADA aggregators", icon: Cpu, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Audit Log Status", value: "142,500 Total logs", change: "No anomalies detected", icon: Terminal, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
    { label: "Security Blocks", value: "28 Intrusion Blocks", change: "Firewall rules active", icon: ShieldCheck, color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20" },
  ];

  const auditLogs = [
    { timestamp: "2026-07-16 23:14:02", user: "ahmed.manager@erp.com", action: "Approved Purchase Order PO-004", ip: "192.168.1.14", status: "SUCCESS" },
    { timestamp: "2026-07-16 22:58:45", user: "system-cron", action: "Completed database backup to Neon Direct", ip: "localhost", status: "SUCCESS" },
    { timestamp: "2026-07-16 22:42:10", user: "unknown-ip", action: "Failed SSH access request to Node-04", ip: "185.220.101.4", status: "BLOCKED" },
    { timestamp: "2026-07-16 22:15:30", user: "fatima.hr@erp.com", action: "Modified employee directory file", ip: "192.168.1.42", status: "SUCCESS" },
  ];

  const systemResources = [
    { name: "Neon Database Connection Pool", usage: "34%", label: "28 active channels" },
    { name: "Vite Server Node Instances", usage: "48%", label: "Load balancer online" },
    { name: "Prisma Client Latency", usage: "12ms", label: "Read/Write cache active" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">IT Operations Console</h1>
          <p className="text-slate-400 text-sm">System clusters, telemetry resource monitoring, databases, and network firewall logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">System Diagnosis</Button>
          <Button variant="primary" size="sm">Modify Access ACL</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hoverEffect className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{stat.value}</h3>
                  <p className="text-xs text-slate-400 font-medium">{stat.change}</p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${stat.color} shadow-lg shadow-black/35`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Console details split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Security Logs Card */}
        <Card className="lg:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Security Audit logs</CardTitle>
            <CardDescription>Live log analyzer for database queries, logins, and permission changes</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold">
                  <th className="py-3 px-2">Timestamp</th>
                  <th className="py-3 px-2">User account</th>
                  <th className="py-3 px-2">Action / Query</th>
                  <th className="py-3 px-2">IP Address</th>
                  <th className="py-3 px-2 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {auditLogs.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/20 text-slate-300">
                    <td className="py-3 px-2 font-mono text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-2 font-medium text-slate-200">{log.user}</td>
                    <td className="py-3 px-2 text-slate-300">{log.action}</td>
                    <td className="py-3 px-2 font-mono text-slate-400">{log.ip}</td>
                    <td className="py-3 px-2 text-right">
                      <span className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        log.status === "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Telemetry Resource Gauges */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Node Telemetry</CardTitle>
            <CardDescription>Real-time computing workload indicators on deployment systems</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {systemResources.map((res, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{res.name}</span>
                  <span className="font-mono font-bold text-indigo-400">{res.usage}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-950 overflow-hidden">
                  <div
                    style={{ width: res.usage.includes("ms") ? "24%" : res.usage }}
                    className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"
                  />
                </div>
                <p className="text-[10px] text-slate-500">{res.label}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
