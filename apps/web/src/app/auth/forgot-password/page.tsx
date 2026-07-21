"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate reset link dispatch
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
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

        {/* Password Reset Card */}
        <Card glass className="border-slate-800/80">
          <CardHeader>
            <CardTitle>Recover Password</CardTitle>
            <CardDescription>Enter your email and we'll dispatch a link to reset your password credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold text-slate-100">Reset Link Sent</h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto">
                    We have dispatched password recovery instructions to <span className="text-slate-200 font-medium">{email}</span>. Please inspect your inbox.
                  </p>
                </div>
                <Link href="/auth/reset-password?emailEncrypted=demo">
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    Proceed to Reset Password Page (Demo Mode)
                  </Button>
                </Link>
              </div>
            ) : (
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

                <Button type="submit" className="w-full mt-2" isLoading={loading}>
                  Send Recovery Link
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="justify-center border-slate-800/40">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 font-medium">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
