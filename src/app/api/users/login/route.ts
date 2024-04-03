import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Database from "@/database/database";
import {User} from "@/models/userModel";


Database()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { email, password } = reqBody.user;
            console.log(email, password)
            const user = await User.findOne({ email })
            const existingPassword = user.password

            //compare password
            const verifyPassword = await bcrypt.compare(password, existingPassword)

            //check if user actually exist 
            if (user && verifyPassword) {
                  console.log("NOT EXIST",user, verifyPassword)
                  const userDetails = jwt.sign(reqBody, process.env.TOKEN_SECRET_KEY!, { expiresIn: "7d" })
                  const days = 7 * 24 * 60 * 60 * 1000
                  cookies().set('MyToken', userDetails, { expires: Date.now() + days })
                  return NextResponse.json({
                        message: "Logged In successfully", success: true
                  })
            }
            //if user doesn't exist
            console.log("EXIST",user, verifyPassword)
            return NextResponse.json({
                  message: "email or password doesn't match!", success: false
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}