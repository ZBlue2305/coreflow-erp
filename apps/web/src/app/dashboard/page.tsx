import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  try {
    const session = await auth();
    const role = session?.user?.role?.toLowerCase() || "manager";
    redirect(`/dashboard/${role}`);
  } catch (err) {
    redirect("/dashboard/manager");
  }
}
