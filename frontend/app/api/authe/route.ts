import { NextResponse } from "next/server";
import { prisma } from "@/prisma";

export async function POST(req:Request) {
  try {
    const body = await req.json();
    const { name, email, password, role } = body;  // Include role

    // Insert data using Prisma
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
      },
    });

    return NextResponse.json({ user, message: "User inserted successfully" }, { status: 201 });
  } catch (error) {
    console.log("Error inserting user:", error);
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
