"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Clock, CheckSquare, CalendarDays, Ticket, Play, Square, CircleCheck } from "lucide-react";

export default function AgentDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [timerText, setTimerText] = useState("00:00:00");
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Simple task list state to toggle items
  const [tasks, setTasks] = useState([
    { id: 1, title: "Purification filter replacements at Site-04", project: "Al-Khaleej Waters", done: false },
    { id: 2, title: "Collect water pressure telemetry readings", project: "Sharjah Muni", done: true },
    { id: 3, title: "Submit travel logs for regional inspections", project: "Operations", done: false },
    { id: 4, title: "Conduct SCADA connection status check", project: "IT Audit", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const handleClockToggle = () => {
    if (!isClockedIn) {
      // Clock In
      setIsClockedIn(true);
      const timeStr = new Date().toLocaleTimeString();
      setClockInTime(timeStr);
    } else {
      // Clock Out
      setIsClockedIn(false);
      setClockInTime(null);
      setTimerText("00:00:00");
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isClockedIn) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const diff = Date.now() - startTime;
        const hrs = Math.floor(diff / 3600000).toString().padStart(2, "0");
        const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, "0");
        const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, "0");
        setTimerText(`${hrs}:${mins}:${secs}`);
      }, 1000);
      setTimerIntervalId(interval);
    } else {
      if (timerIntervalId) clearInterval(timerIntervalId);
    }
    return () => clearInterval(interval);
  }, [isClockedIn]);

  const stats = [
    { label: "Tasks Assigned", value: `${tasks.filter((t) => !t.done).length} Pending`, change: `${tasks.filter((t) => t.done).length} completed`, icon: CheckSquare, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
    { label: "Logged Workhours", value: isClockedIn ? "Active Shift" : "6.8 Hours Today", change: isClockedIn ? `Timer: ${timerText}` : "Avg: 8.2 hrs/day", icon: Clock, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
    { label: "Annual Leaves Left", value: "14 Days", change: "4 days taken in 2026", icon: CalendarDays, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
    { label: "Support Tickets", value: "2 Open Tickets", change: "1 high priority response", icon: Ticket, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header bar */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">Field Agent Workspace</h1>
          <p className="text-slate-400 text-sm">Personal desk controls, timesheets, assigned tasks, and support inquiries.</p>
        </div>
        <div>
          <Button variant="outline" size="sm">Request Timeoff</Button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} hoverEffect className="border-slate-800/60 bg-slate-900/40">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                  <h3 className="text-xl font-bold text-white sm:text-2xl">{stat.value}</h3>
                  <p className="text-xs text-indigo-400 font-semibold">{stat.change}</p>
                </div>
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center border ${stat.color} shadow-lg shadow-black/35`}>
                  <Icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Timesheet Clock & Tasks Split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Interactive Timesheet punch card */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Attendance Punch Card</CardTitle>
            <CardDescription>Log your shift hours directly to the HR attendance tracking module</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6 text-center space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">
                Today's Session duration
              </span>
              <h2 className="text-4xl font-mono font-bold text-slate-100 tracking-tight">
                {isClockedIn ? timerText : "00:00:00"}
              </h2>
              {isClockedIn ? (
                <span className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Clocked-in since {clockInTime}
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium">Currently clocked-out</span>
              )}
            </div>

            <Button
              onClick={handleClockToggle}
              variant={isClockedIn ? "danger" : "primary"}
              className="w-full max-w-[240px] gap-2.5 font-bold uppercase tracking-wider"
            >
              {isClockedIn ? (
                <>
                  <Square className="h-4 w-4" /> Punch Clock Out
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Punch Clock In
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Dynamic Task Board Checklist */}
        <Card className="lg:col-span-2 border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <CardTitle>Assigned Workload Tasks</CardTitle>
            <CardDescription>Verify and mark off your daily engineering and reporting directives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-3.5 p-3.5 rounded-lg border cursor-pointer select-none transition-all ${
                  task.done
                    ? "bg-slate-950/20 border-slate-800/40 opacity-60"
                    : "bg-slate-950/60 border-slate-900 hover:border-slate-800 hover:bg-slate-900/10"
                }`}
              >
                <div className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${
                  task.done ? "bg-indigo-600 border-indigo-500 text-white" : "border-slate-700 hover:border-slate-500"
                }`}>
                  {task.done && <CircleCheck className="h-4 w-4" />}
                </div>
                <div className="space-y-0.5">
                  <p className={`text-xs font-semibold ${task.done ? "line-through text-slate-500" : "text-slate-200"}`}>
                    {task.title}
                  </p>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{task.project}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
