import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { SessionProvider } from "next-auth/react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // auth() reads the JWT cookie — no database call is made with JWT strategy
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <SessionProvider session={session}>
      <DashboardShell user={session.user}>
        {children}
      </DashboardShell>
    </SessionProvider>
  );
}
