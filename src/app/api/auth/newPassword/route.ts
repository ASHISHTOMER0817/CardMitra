import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import Database from "@/database/database";


Database()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { email, password } = reqBody.data;
            // console.log(reqBody.data,`and here is the ${email} and ${password}`)
            
            const oneuser  = await User.findOne({email})
            // console.log(oneuser)
            //hash Password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt);

            const user = await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } })
            // console.log(user)
            return NextResponse.json({
                  message: " change successfully!", success: true
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}