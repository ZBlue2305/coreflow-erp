"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("AGENT");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all registration fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong during registration.");
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (err) {
      setError("An unexpected network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Brand logo header */}
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white uppercase">Qimat Almanara</h1>
            <p className="text-[10px] text-indigo-400 font-extrabold tracking-widest uppercase">ERP OPERATIONS HUB</p>
          </div>
        </div>

        {/* Register Card */}
        <Card glass className="border-slate-800/80">
          <CardHeader>
            <CardTitle>Register Account</CardTitle>
            <CardDescription>Create a profile to access the ERP workspaces</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-100">Registration Successful</h3>
                  <p className="text-xs text-slate-400">Redirecting to login portal...</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400 font-medium">
                    <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Input
                  label="Full Name"
                  placeholder="Ahmed Salim"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="ahmed.salim@erp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {/* Role select input */}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-slate-300">
                    Target ERP Module Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="flex h-11 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer font-medium text-sm"
                  >
                    <option value="AGENT" className="bg-slate-950 text-slate-300">Field Agent</option>
                    <option value="MANAGER" className="bg-slate-950 text-slate-300">Manager</option>
                    <option value="HR" className="bg-slate-950 text-slate-300">HR / Payroll</option>
                    <option value="SALES" className="bg-slate-950 text-slate-300">Sales Dept</option>
                    <option value="IT" className="bg-slate-950 text-slate-300">IT / Admin</option>
                  </select>
                </div>

                <Button type="submit" className="w-full mt-2" isLoading={loading}>
                  Create ERP Profile
                </Button>
              </form>
            )}
          </CardContent>
          {!success && (
            <CardFooter className="justify-center border-slate-800/40">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-indigo-400 font-medium hover:underline">
                  Sign In instead
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
