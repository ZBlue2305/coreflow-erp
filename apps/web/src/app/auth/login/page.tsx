"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sparkles, KeyRound, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all credentials fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password. Use demo bypass if needed.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred during auth flow.");
    } finally {
      setLoading(false);
    }
  };

  // Quick fill helper for developers
  const quickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
    setError(null);
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

        {/* Login Card */}
        <Card glass className="border-slate-800/80">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your ERP dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2.5 rounded-lg border border-red-500/20 bg-red-500/5 p-3.5 text-xs text-red-400 font-medium">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="relative">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="your.name@erp.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-3"
                  required
                />
              </div>

              <div className="relative">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-3"
                  required
                />
                <div className="flex justify-end mt-1.5">
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-indigo-400 font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full mt-2" isLoading={loading}>
                Sign In to Portal
              </Button>
            </form>

            {/* Quick Fill Demo panel */}
            <div className="border-t border-slate-800/60 pt-4">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block mb-2.5">
                Evaluation Demo Accounts (Password: password)
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                <button
                  onClick={() => quickFill("manager@erp.com")}
                  className="px-2 py-1.5 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  💼 Manager
                </button>
                <button
                  onClick={() => quickFill("hr@erp.com")}
                  className="px-2 py-1.5 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-emerald-500/30 text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  🌱 HR Desk
                </button>
                <button
                  onClick={() => quickFill("sales@erp.com")}
                  className="px-2 py-1.5 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500/30 text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  📈 Sales
                </button>
                <button
                  onClick={() => quickFill("it@erp.com")}
                  className="px-2 py-1.5 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-500/30 text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  ⚙️ IT / Admin
                </button>
                <button
                  onClick={() => quickFill("agent@erp.com")}
                  className="px-2 py-1.5 text-left rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-500/30 text-[10px] font-medium text-slate-300 hover:text-white transition-colors"
                >
                  🚚 Field Agent
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-center border-slate-800/40">
            <p className="text-xs text-slate-500">
              Need access? Ask your administrator, or{" "}
              <Link href="/auth/register" className="text-indigo-400 font-medium hover:underline">
                register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
