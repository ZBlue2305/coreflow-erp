import Link from "next/link";
import { Sparkles, ArrowRight, Activity, Users, Wallet, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

// No server-side auth() call here — the proxy.ts middleware handles redirecting
// already-authenticated users to their dashboard automatically.
export default function Home() {
  const features = [
    {
      title: "Operations & Logistics",
      description: "Real-time tracking of water purification systems, fleet operations, and physical materials inventories.",
      icon: Activity,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "HR & Talent Desk",
      description: "Manage attendance metrics, shift roster designs, payroll distributions, and leave applications.",
      icon: Users,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Finance & Sales Ledger",
      description: "Track procurement transactions, service quotes, contracts, pipelines, and revenue margins.",
      icon: Wallet,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "IT Security & Audits",
      description: "Fine-grained system access profiles, transaction logging, and automated threat monitoring.",
      icon: Shield,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Header bar */}
      <header className="relative z-10 mx-auto max-w-7xl w-full px-6 h-20 flex items-center justify-between border-b border-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight uppercase text-slate-200">Qimat Almanara</span>
            <span className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase">Hydrotech</span>
          </div>
        </div>

        <Link href="/auth/login">
          <Button size="sm" variant="primary">Access Portal</Button>
        </Link>
      </header>

      {/* Hero section */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 md:py-24 text-center">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-300 font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Next-Gen Enterprise Resource Planning
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Advanced Operations for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400">
              Hydrotechnology
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Qimat Almanara Hydrotech ERP coordinates water engineering project cycles, dynamic workforce allocations,
            financial accounts ledger, and field client support in a single high-security portal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto gap-2" variant="primary">
                Portal Sign In <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto" variant="outline">
                Register New Account
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature grid */}
        <section className="max-w-6xl w-full mt-20 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <Card key={idx} hoverEffect className="bg-slate-900/40 backdrop-blur-md border-slate-800/80">
                <CardContent className="p-6 space-y-4">
                  <div className={`h-10 w-10 rounded-lg flex items-center justify-center border ${feature.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-100">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </main>

      {/* Footer bar */}
      <footer className="relative z-10 mx-auto max-w-7xl w-full px-6 py-8 flex flex-col sm:flex-row items-center justify-between border-t border-slate-900/60 text-xs text-slate-500 gap-4">
        <div>
          © {new Date().getFullYear()} Qimat Almanara Hydrotech ERP. All rights reserved.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-slate-400 cursor-pointer">Security Protocol</span>
          <span className="hover:text-slate-400 cursor-pointer">Terms of Operation</span>
        </div>
      </footer>
    </div>
  );
}