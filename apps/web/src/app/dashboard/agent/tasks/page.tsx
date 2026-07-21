"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckSquare, CircleCheck, Play, Send, Calendar, CheckCircle2 } from "lucide-react";

interface AgentTask {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";
}

export default function AgentTasksPage() {
  const [tasks, setTasks] = useState<AgentTask[]>([
    { id: "TSK-301", title: "Purification filter replacements at Site-04", project: "Sharjah Sewerage RO Installation", dueDate: "2026-07-25", priority: "HIGH", status: "TODO" },
    { id: "TSK-302", title: "Collect water pressure telemetry readings", project: "Sharjah Sewerage RO Installation", dueDate: "2026-07-15", priority: "MEDIUM", status: "DONE" },
    { id: "TSK-303", title: "Submit travel logs for regional inspections", project: "Corporate Operations", dueDate: "2026-07-20", priority: "LOW", status: "IN_PROGRESS" },
    { id: "TSK-304", title: "Conduct SCADA connection status check", project: "IT Audit & Security", dueDate: "2026-07-28", priority: "CRITICAL", status: "TODO" },
  ]);

  const [notification, setNotification] = useState<string | null>(null);

  const advanceStatus = (id: string, currentStatus: string) => {
    const statusOrder: AgentTask["status"][] = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];
    const currentIndex = statusOrder.indexOf(currentStatus as any);
    if (currentIndex < statusOrder.length - 1) {
      const nextStatus = statusOrder[currentIndex + 1];
      setTasks(tasks.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
      setNotification(`Task status updated to ${nextStatus}.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My Task Directives</h1>
        <p className="text-slate-400 text-sm">Organize, track progress, and submit completions for your assigned engineering jobs.</p>
      </div>

      {notification && (
        <div className="flex items-center gap-2.5 rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4 text-sm text-indigo-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => {
          const priorityColors =
            task.priority === "CRITICAL"
              ? "bg-red-500/10 text-red-400 border-red-500/20"
              : task.priority === "HIGH"
              ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
              : "bg-slate-500/10 text-slate-400 border-slate-800";

          const statusColors =
            task.status === "DONE"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : task.status === "REVIEW"
              ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
              : task.status === "IN_PROGRESS"
              ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
              : "bg-slate-800 text-slate-400 border-slate-700";

          return (
            <Card key={task.id} className={`border-slate-800/60 bg-slate-900/40 ${task.status === "DONE" ? "opacity-60" : ""}`}>
              <CardContent className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded">{task.id}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityColors}`}>
                      {task.priority}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors}`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                  <div>
                    <h3 className={`text-base font-bold text-slate-100 ${task.status === "DONE" ? "line-through text-slate-500" : ""}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-0.5">{task.project}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Due: <span className="text-slate-300 font-semibold">{task.dueDate}</span></span>
                  </div>
                </div>

                <div className="flex items-center justify-end shrink-0 pt-4 md:pt-0 border-t md:border-0 border-slate-800/40">
                  {task.status !== "DONE" && (
                    <Button onClick={() => advanceStatus(task.id, task.status)} size="sm" className="gap-2 font-bold uppercase tracking-wider">
                      {task.status === "TODO" ? (
                        <>
                          <Play className="h-4 w-4" /> Start Working
                        </>
                      ) : task.status === "IN_PROGRESS" ? (
                        <>
                          <Send className="h-4 w-4" /> Submit for Review
                        </>
                      ) : (
                        <>
                          <CircleCheck className="h-4 w-4" /> Complete Task
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
