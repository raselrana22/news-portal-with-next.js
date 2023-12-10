// api/user/login.js

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { CreateToken } from "@/app/utility/JWTTokenHelper";

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
    if (!passwordMatch) {
      await prisma.$disconnect();
      return NextResponse.json({ status: "fail", data: "Invalid email or password" });
    }

    // Create token
    const token = await  CreateToken(user.email, user.id); 
    const expirationDate = new Date(Date.now() + 24*60*60*1000);
    const cookieString = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;

    // Response data
    const responseData = {
      userId: user.id,
      email: user.email,
      token: token,
    };

    await prisma.$disconnect();

    return NextResponse.json(
      { status: "success", data: responseData }, 
      {status: 200, headers: {'set-cookie': cookieString}}
    );

  } catch (error) {
    return NextResponse.json({ status: "fail", data: error.message });
  }
}
