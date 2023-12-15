import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

export async function POST(req) {
    try {
        const { email, otp } = await req.json();
        console.log("Email provided:", email);
        console.log("OTP provided:", otp);

        // Search user
        const prisma = new PrismaClient();
        try {
            const user = await prisma.users.findUnique({
                where: { email: email }
            });

            if (!user) {
                return NextResponse.json({ status: "fail", data: "No user found" });
            }

            // Check the provided OTP
            const otpMatch = await compare(otp.trim(), user.otp);
            console.log("otp match output", otpMatch)
            if (!otpMatch) {
                return NextResponse.json({ status: "fail", data: "Invalid OTP" });
            }

            return NextResponse.json({ status: "success", data: "Valid OTP" });
        } finally {
            await prisma.$disconnect();
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ status: "error", data: "Internal server error" });
    }
}
