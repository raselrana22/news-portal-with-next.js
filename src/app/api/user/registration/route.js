// The user registration api

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

export async function POST(req, res) {
    try {
        let reqBody = await req.json();
        reqBody.otp = "0";
        const prisma = new PrismaClient();
        
        // Hash the received password before saving it to the database
        const hashedPassword = await bcrypt.hash(reqBody.password, 10);

        const result = await prisma.users.create({
            data: {
                ...reqBody,
                password: hashedPassword,
            }
        });

        await prisma.$disconnect();

        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        return NextResponse.json({ status: "fail", data: error });
    }
}
