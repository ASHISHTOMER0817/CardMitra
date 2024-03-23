import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export async function GET(request:NextRequest) {
      try{
            const reqBody = await request.json()
            const {email, password} = reqBody;
             console.log(reqBody)
            const user = await User.findOne({email})
            const existingPassword = user.password
            const verifyPassword = await bcrypt.compare(password, existingPassword )
            if(user && verifyPassword){
                  const userDetails = jwt.sign(reqBody, process.env.TOKEN_SECRET_KEY!, {expiresIn: "7d"})
                  const days = 7 * 24 * 60 * 60 * 1000
                  cookies().set('token', userDetails, {expires: Date.now() + days})
                  return NextResponse.json({
                        message: "Logged In successfully", success: true
                  })
            }
            return NextResponse.json({
                  message: "email or password doesn't exist !!", success: false
            })

            

      }catch(error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}