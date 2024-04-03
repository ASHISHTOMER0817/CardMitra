import { NextResponse, NextRequest } from "next/server";
import {User}  from "@/models/userModel";
import bcryptjs from 'bcryptjs'


export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { email, password } = reqBody;
            console.log(reqBody)
            //hash Password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt);

            const user = await User.findOneAndUpdate({ email }, { $set: {password: hashedPassword} })
            console.log(user)
            return NextResponse.json({
                  message: "Password has been changed successfully !!", success: true
            })



      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}