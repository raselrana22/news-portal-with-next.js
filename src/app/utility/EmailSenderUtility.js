import { NextResponse } from "next/server";
import nodemailer from 'nodemailer'

export async function EmailSender(emailTo, emailSubject, emailBody)
{
    // Create a transporter for sending the email
    const transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: 'info@teamrabbil.com',
            pass: '~sR4[bhaC[Qs'
        },
        tls: {rejectUnauthorized: false}
    });

    // Define the email options
    let mailOptions = {
        from: 'Test email <info@teamrabbil.com>',
        to: emailTo,
        subject: emailSubject,
        text: emailBody
    } 

    try{
        // Sending the email 
        const result = await transporter.sendMail(mailOptions);
        // Return a JSON response indicating success
        return NextResponse.json({status: 'success', message: result})

    } catch(error){
        console.log("Email sending error:", error);
        return NextResponse.json({message: "Failed to send email"})
    }
}