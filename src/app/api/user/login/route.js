// api/user/login.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();
    console.log("email given:", email);
    console.log("password given:", password);

    const prisma = new PrismaClient();

    // Find the user by email
    const user = await prisma.users.findUnique({
      where: { email },
    });
    console.log("User find", user.email);
    // If the user doesn't exist, return an error
    if (!user) {
      await prisma.$disconnect();
      return NextResponse.json({ status: "fail", data: "Invalid email or password" });
    }

    // Check if the provided password matches the stored hashed password
    const passwordMatch = await bcrypt.compare(password.trim(), user.password);
    console.log("Password matches result", passwordMatch);
    if (!passwordMatch) {
      await prisma.$disconnect();
      return NextResponse.json({ status: "fail", data: "Invalid email or password" });
    }

    // You can include additional user data in the response if needed
    const responseData = {
      userId: user.id,
      email: user.email,
      // Add other user data as needed
    };

    await prisma.$disconnect();

    return NextResponse.json({ status: "success", data: responseData });
  } catch (error) {
    return NextResponse.json({ status: "fail", data: error.message });
  }
}
