import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required registration parameters." },
        { status: 400 }
      );
    }

    // Dynamic mock fallback if the database URL remains set to the default placeholder.
    // This allows testing register flows without connection failures immediately.
    const isMockDb =
      !process.env.DATABASE_URL ||
      process.env.DATABASE_URL.includes("ep-cool-breeze-123456-pooler");

    if (isMockDb) {
      console.warn("NextAuth/Prisma: Neon database pooler URL is not configured. Running mock signup bypass.");
      return NextResponse.json(
        { message: "Registration successful (Local Demo Bypass active)." },
        { status: 201 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "AGENT",
      },
    });

    return NextResponse.json(
      { message: "User registered successfully.", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to create user account. " + (error?.message || "") },
      { status: 500 }
    );
  }
}
