import { NextResponse, NextRequest } from "next/server";
// import Database from "@/database/database";
import Mailgun from "mailgun.js"
import FormData from 'form-data';

export async function POST(request: NextRequest) {
      try {
            const { email } = await request.json()
            console.log(email)
            const mailgun = new Mailgun(FormData)

            const otp = Math.floor(Math.random() * 1000000);
            otp.toString().padStart(6, '0');
            console.log(otp)



            // const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'key-yourkeyhere' });
            // mg.messages.create('sandboxe65572ae6b9945d0b32e59ed4061f165.mailgun.org', {
            //       from: "micom180300@gmail.com",
            //       to: [email],
            //       subject: "Hello, how are you?",
            //       text: `Testing some Mailgun awesomeness! your OTP: ${otp}`,
            //       html: `<h1>Testing some Mailgun awesomeness! your OTP: ${otp} abcd</h1>`
            // })
            return NextResponse.json({
                  message: 'email sent', success: true, data: otp
            })
      } catch {
            NextResponse.json({
                  message: 'something went wrong', success: false,
            })
      }
}