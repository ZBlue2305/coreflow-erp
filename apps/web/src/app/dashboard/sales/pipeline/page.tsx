"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TrendingUp, ArrowRight, Layers, Sparkles } from "lucide-react";

interface Deal {
  id: string;
  client: string;
  project: string;
  value: string;
  stage: "DISCOVERY" | "PROPOSAL" | "NEGOTIATION" | "WON";
}

export default function PipelinePage() {
  const [deals, setDeals] = useState<Deal[]>([
    { id: "DL-01", client: "Al-Ain Water", project: "SCADA Purification Suite", value: "AED 450,000", stage: "NEGOTIATION" },
    { id: "DL-02", client: "Gulf Construction", project: "Hydro-Chamber Installation", value: "AED 280,000", stage: "PROPOSAL" },
    { id: "DL-03", client: "Sharjah Authority", project: "Pressure Valve Overhauls", value: "AED 620,000", stage: "DISCOVERY" },
    { id: "DL-04", client: "Marina Engineering", project: "Membrane Filters Supply", value: "AED 90,000", stage: "WON" },
    { id: "DL-05", client: "Meydan Group PJSC", project: "RO Plant Design & Spec", value: "AED 180,000", stage: "DISCOVERY" },
    { id: "DL-06", client: "Al-Futtaim Tech", project: "Utility Lines Telemetry", value: "AED 220,000", stage: "PROPOSAL" },
  ]);

  const stages = [
    { key: "DISCOVERY", title: "Discovery", border: "border-t-blue-500" },
    { key: "PROPOSAL", title: "Proposal Sent", border: "border-t-amber-500" },
    { key: "NEGOTIATION", title: "Negotiation", border: "border-t-purple-500" },
    { key: "WON", title: "Closed Won", border: "border-t-emerald-500" },
  ];

  const moveForward = (id: string, currentStage: string) => {
    const stageOrder: Array<Deal["stage"]> = ["DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON"];
    const currentIndex = stageOrder.indexOf(currentStage as any);
    if (currentIndex < stageOrder.length - 1) {
      const nextStage = stageOrder[currentIndex + 1];
      setDeals(deals.map((d) => (d.id === id ? { ...d, stage: nextStage } : d)));
    }
  };

  const getStageTotal = (stageKey: string) => {
    const total = deals
      .filter((d) => d.stage === stageKey)
      .reduce((acc, d) => acc + Number(d.value.replace(/[^0-9]/g, "")), 0);
    return `AED ${total.toLocaleString()}`;
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Sales Kanban Board</h1>
        <p className="text-slate-400 text-sm">Organize and advance client opportunity files through commercial stages.</p>
      </div>

      {/* Grid board */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[500px]">
        {stages.map((stg) => {
          const stageDeals = deals.filter((d) => d.stage === stg.key);
          return (
            <div key={stg.key} className="flex flex-col space-y-4 bg-slate-900/20 p-3 rounded-xl border border-slate-900/60">
              <div className={`border-t-4 ${stg.border} pt-2`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-200">{stg.title}</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-md font-mono font-semibold">
                    {stageDeals.length}
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold font-mono mt-1">
                  Value: {getStageTotal(stg.key)}
                </div>
              </div>

              {/* Cards body list */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[550px] pr-1">
                {stageDeals.length === 0 ? (
                  <div className="border border-dashed border-slate-900 rounded-lg p-6 text-center text-[10px] text-slate-600">
                    No active proposals
                  </div>
                ) : (
                  stageDeals.map((dl) => (
                    <Card key={dl.id} className="border-slate-800 bg-slate-900/80 hover:border-slate-700/80 transition-all select-none">
                      <div className="p-4 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-indigo-400 font-bold">{dl.id}</span>
                          <span className="text-xs font-mono font-bold text-slate-100">{dl.value}</span>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200 leading-tight">{dl.client}</h4>
                          <p className="text-[10px] text-slate-500 mt-0.5">{dl.project}</p>
                        </div>

                        {stg.key !== "WON" && (
                          <div className="flex justify-end pt-2 border-t border-slate-800/40">
                            <button
                              onClick={() => moveForward(dl.id, dl.stage)}
                              className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:gap-1.5 transition-all"
                            >
                              Advance Stage <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
