"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Shield, Briefcase, Mail, Phone, Calendar, KeyRound, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  const [phone, setPhone] = useState("+971 50 123 4567");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [pwError, setPwError] = useState<string | null>(null);

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Contact information updated successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setPwError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPwError("New password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setPwError(null);
    setTimeout(() => {
      setLoading(false);
      setSuccessMsg("Security credentials updated successfully.");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1200);
  };

  const role = (session?.user?.role || "AGENT").toUpperCase();
  const email = session?.user?.email || "user@erp.com";
  const name = session?.user?.name || "Ahmed Manager";

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Personal Profile</h1>
        <p className="text-slate-400 text-sm">Review your corporate information and configure authentication details.</p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm text-emerald-400 font-semibold max-w-xl">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column - Info Summary */}
        <Card className="border-slate-800/60 bg-slate-900/40 lg:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <div className="h-20 w-20 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center text-3xl font-bold">
              {name ? name[0] : "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">{name}</h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider mt-1.5">
                <Shield className="h-3 w-3" /> {role}
              </span>
            </div>

            <div className="w-full border-t border-slate-800/60 pt-4 text-left space-y-3.5 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Position</p>
                  <p className="text-slate-300 font-medium">{role === "AGENT" ? "Water Operations Specialist" : role === "MANAGER" ? "General Operations Manager" : `${role} Officer`}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email Address</p>
                  <p className="text-slate-300 font-medium">{email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="h-4 w-4 text-slate-500 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hire Date</p>
                  <p className="text-slate-300 font-medium">January 15, 2025 (Active)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right column - Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-800/60 bg-slate-900/40">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your secondary contact phone details saved in HR Ledger</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateContact} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={name.split(" ")[0]}
                    disabled
                    className="bg-slate-950/40 border-slate-800 text-slate-500"
                  />
                  <Input
                    label="Last Name"
                    value={name.split(" ")[1] || ""}
                    disabled
                    className="bg-slate-950/40 border-slate-800 text-slate-500"
                  />
                </div>
                <Input
                  label="Contact Phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <Button type="submit" isLoading={loading} size="sm">
                  Save Details
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-slate-800/60 bg-slate-900/40">
            <CardHeader>
              <CardTitle>Security Credentials</CardTitle>
              <CardDescription>Establish a new password verification secret to protect your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                {pwError && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400 font-semibold">
                    {pwError}
                  </div>
                )}
                <Input
                  label="Current Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" variant="outline" isLoading={loading} size="sm" className="gap-2">
                  <KeyRound className="h-4 w-4" /> Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
