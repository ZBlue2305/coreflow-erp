import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Users, FileUser, CalendarDays, Wallet, UserCheck, PlaneTakeoff, Search } from "lucide-react";

export default function HRDashboard() {
  const stats = [
    { label: "Active Employees", value: "142 Personnel", change: "98 currently clocked-in", icon: Users, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Leave Requests", value: "3 Requests Pending", change: "2 annual, 1 medical", icon: PlaneTakeoff, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Next Payroll Run", value: "In 14 Days", change: "Jul 31, 2026", icon: Wallet, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Active Recruitments", value: "5 Open Roles", change: "12 candidates in pipeline", icon: FileUser, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  ];

  const leaveRequests = [
    { id: "LR-110", employee: "Fatima Al-Marzouqi", department: "Operations", period: "Jul 20 - Jul 25 (6 days)", type: "Annual Leave", status: "Pending Manager Sync" },
    { id: "LR-112", employee: "Ryan Davis", department: "Engineering", period: "Jul 28 - Aug 05 (9 days)", type: "Annual Leave", status: "Pending HR Review" },
    { id: "LR-114", employee: "Salem Al-Harthi", department: "Sales", period: "Jul 18 - Jul 19 (2 days)", type: "Sick Leave", status: "Awaiting Medical Certificate" },
  ];

  const recentHires = [
    { name: "Mariam Al-Kabi", role: "Water Quality Chemist", start: "Jul 01, 2026", status: "Onboarding" },
    { name: "John Miller", role: "Field SCADA Technician", start: "Jun 15, 2026", status: "Completed" },
    { name: "Tariq Mahmood", role: "Senior Hydraulics Engineer", start: "Jun 01, 2026", status: "Completed" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">HR & Talent Administration</h1>
          <p className="text-slate-400 text-sm">Talent registries, roster configurations, leave management, and payroll tracking.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">Roster Planner</Button>
          <Button variant="primary" size="sm">Add Employee</Button>
        </div>
      </div>

      {/* Stats row */}
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

      {/* Content Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Leave Requests Table */}
        <Card className="lg:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Active Leave Requests</CardTitle>
              <CardDescription>Leave applications requiring roster adjustments and approvals</CardDescription>
            </div>
            <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20 font-bold uppercase tracking-wider">
              3 Pending
            </span>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 font-bold">
                  <th className="py-3 px-2">Employee</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Duration</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {leaveRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-slate-900/20 text-slate-300">
                    <td className="py-3 px-2 font-medium text-slate-200">
                      <div className="flex flex-col">
                        <span>{request.employee}</span>
                        <span className="text-[10px] text-slate-500">{request.department}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">{request.type}</td>
                    <td className="py-3 px-2 text-slate-400">{request.period}</td>
                    <td className="py-3 px-2">
                      <span className="text-[10px] text-amber-400 font-semibold">{request.status}</span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all">
                          Decline
                        </button>
                        <button className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition-all">
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Hires / Onboarding */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Recent Joiners</CardTitle>
            <CardDescription>Onboarding states of newly recruited engineers and agents</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentHires.map((hire, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-900">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-200">{hire.name}</p>
                  <p className="text-[10px] text-slate-500">{hire.role}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] text-slate-400">{hire.start}</p>
                  <span className={`inline-block text-[8px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                    hire.status === "Onboarding"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}>
                    {hire.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
