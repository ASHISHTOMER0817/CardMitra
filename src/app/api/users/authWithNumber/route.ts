import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";
import Database from "@/database/database";
import mail from "@sendgrid/mail";


Database()

export async function POST(request: NextRequest) {
      try {

            const number = request.json()
            const user = await User.findOne({ number })
            if (user) {

                  //Change the anchor tag !important
                  //SendGrid mail
                  
                  // mail.setApiKey(process.env.SENDGRID_API_KEY!);
                  // const message = `
                  //  Name:Chiton \r\n
                  //  Email: This email ${email} used to register with Kapa Jobs\r\n
                  //  Message: This is your link to reset password  --> <a href="http://localhost:3000/resetPassword"> Reset Password </a>
                  //  `
                  // const data = {
                  //       to: { email },
                  //       from: 'ashish0817tomer@gmail.com',
                  //       subject: 'Verification email !',
                  //       text: message,
                  //       html: message.replace(/\r\n/g, '<br>')
                  // }

                  // mail.send(data)

                  return NextResponse.json({
                        message: "OTP sent", success: true
                  })
            } else {
                  return NextResponse.json({
                        message: "Phone number is not associated with user", success: true
                  })
            }
      } catch (error) {
            return NextResponse.json({
                  message: "operation failed, please try again later", success: false
            })
      }
}