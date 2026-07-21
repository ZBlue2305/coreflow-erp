"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { CheckCircle2, Shield, Bell, Eye, Database, Monitor, Languages } from "lucide-react";

export default function SettingsPage() {
  const [success, setSuccess] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("en");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);

  const handleSave = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">System Settings</h1>
          <p className="text-slate-400 text-sm">Configure your personal ERP dashboard options, language, and system hooks.</p>
        </div>
        <div>
          <Button onClick={handleSave} size="sm">Save Configuration</Button>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>Your system settings have been updated.</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Visual Preferences */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-indigo-400" />
              <CardTitle>Display & Aesthetics</CardTitle>
            </div>
            <CardDescription>Customize the visual workspace theme and font families</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Workspace Theme</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                <option value="dark">Sleek Obsidian (Dark Theme - Recommended)</option>
                <option value="light">Hydrotech Clear (Light Theme)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Typography Scaling</label>
              <select
                className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                defaultValue="standard"
              >
                <option value="compact">Compact (High Information Density)</option>
                <option value="standard">Standard (Readable)</option>
                <option value="large">Large (Accessibility focus)</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Language & Regional Settings */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-indigo-400" />
              <CardTitle>Language & Region</CardTitle>
            </div>
            <CardDescription>Select language, calendar preferences and local time zone</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Language</label>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
              >
                <option value="en">English (US / Gulf Business standard)</option>
                <option value="ar">العربية (Arabic - Regional Localization)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Time Zone</label>
              <select
                className="w-full h-11 rounded-lg border border-slate-700 bg-slate-950 px-3 text-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                defaultValue="gulf"
              >
                <option value="gulf">Gulf Standard Time (GST - Dubai) - UTC+04:00</option>
                <option value="saudi">Saudi Standard Time (AST - Riyadh) - UTC+03:00</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications toggles */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-indigo-400" />
              <CardTitle>Notifications Feeds</CardTitle>
            </div>
            <CardDescription>Control alerts sent for projects, tasks, and leave status updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-900">
              <div>
                <h4 className="text-xs font-semibold text-slate-200">Email Alerts</h4>
                <p className="text-[10px] text-slate-500">Send payslips and approve notifications via email</p>
              </div>
              <Toggle
                checked={emailNotif}
                onChange={setEmailNotif}
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950/40 border border-slate-900">
              <div>
                <h4 className="text-xs font-semibold text-slate-200">Real-time Push Alerts</h4>
                <p className="text-[10px] text-slate-500">Show floating banners in-app for task completions</p>
              </div>
              <Toggle
                checked={pushNotif}
                onChange={setPushNotif}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Active Sessions */}
        <Card className="border-slate-800/60 bg-slate-900/40">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-400" />
              <CardTitle>Security & Device Log</CardTitle>
            </div>
            <CardDescription>Review active browser session parameters and token lifetimes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-3">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-200">Chrome (Desktop Windows)</p>
                <p className="text-[10px] text-slate-500">IP: 192.168.1.100 • Current Session</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="space-y-0.5">
                <p className="font-semibold text-slate-400">Mobile App Sync Integration</p>
                <p className="text-[10px] text-slate-500">Last Synced: 2 hours ago</p>
              </div>
              <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300 border-red-500/20">
                Revoke Key
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
