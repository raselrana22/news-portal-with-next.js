import {NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { EmailSender } from "@/app/utility/EmailSenderUtility";


export async function GET(req){

    let {searchParams} = new URL(req.url);
    let email = searchParams.get('email');
    console.log('user provide email:', email);

    // Search user
    const prisma = new PrismaClient();
    try{
        const user = await prisma.users.findUnique({
            where: { email: email },
        });

        if(!user){
            await prisma.$disconnect();
            return NextResponse.json({status: 'fail', data: 'No user found'})
        }

        let otpCode = Math.floor(100000+Math.random()*900000);
        const result = await prisma.users.update(
            {
                where: {email: email},
                data: {otp: otpCode.toString()}
            }
        )

        // send the email 
        try{
            const emailSubject = 'Next portal verification email'
            const emailBody = `your otp code is ${otpCode}`
           // await EmailSender(email, emailSubject, emailBody);

            // Success response
            return NextResponse.json({ status: 'success', data: 'Your six-digit OTP is sent to your registered email' });


        } catch(error){
            // Failure response
            return NextResponse.json({ status: 'fail', data: 'No user found' });
        }
    } catch(error){
        // Handle Prisma query error
        console.error('Prisma query error:', error);
        return NextResponse.json({ status: 'fail', data: 'Internal server error' });

    } finally {
        await prisma.$disconnect();
    }
}