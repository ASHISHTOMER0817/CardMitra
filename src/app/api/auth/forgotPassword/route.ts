import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import mail from "@sendgrid/mail";

export async function GET(request:NextRequest) {
      try{
            const reqBody = await request.json()
            const {email} = reqBody;
             console.log(reqBody)
            const user = await User.findOne({email})
            if(user){
                  //Change the anchor tag !important
                  //SendGrid mail
                  mail.setApiKey(process.env.SENDGRID_API_KEY!);
                  const message = `
                   Name:Chiton \r\n
                   Email: This email ${email} used to register with Kapa Jobs\r\n
                   Message: This is your link to reset password  --> <a href="http://localhost:3000/resetPassword"> Reset Password </a>
                   `
                  const data = {
                        to: {email},
                        from: 'ashish0817tomer@gmail.com',
                        subject: 'Verification email !',
                        text: message,
                        html: message.replace(/\r\n/g, '<br>')
                  }

                  mail.send(data)
            }
            return NextResponse.json({
                  message: "email doesn't exist !!", success: false
            })

            

      }catch(error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}