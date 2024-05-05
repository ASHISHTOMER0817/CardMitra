import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Database from "@/database/database";
import { User } from "@/models/userModel";


Database()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { email, password } = reqBody.user;
            // console.log(email, password)
            const user = await User.findOne({ email })
            const existingPassword = user.password

            //compare password
            const verifyPassword = await bcrypt.compare(password, existingPassword)
            const tokenData = { email, password, _id: user._id, role: user.role }
            console.log(tokenData)
            //check if user actually exist 
            if (user && verifyPassword) {
                  console.log("EXIST", user, verifyPassword)
                  const userDetails = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY!, { expiresIn: "7d" })
                  const days = 7 * 24 * 60 * 60 * 1000
                  if (user.role === 'user') cookies().set('token', userDetails, { expires: Date.now() + days })
                  if (user.role === 'admin') cookies().set(process.env.ADMIN_TOKEN!, userDetails, { expires: Date.now() + days })

                  // Redirect the user/admin
                  // user.role === 'admin' ? redirect('/'): user.role === 'user' ? redirect('/dashboard'):''
                  // return user.role === 'admin' ? NextResponse.redirect('/adminDashboard') : user.role === 'user' ? NextResponse.redirect('/dashboard') : NextResponse.json({
                  //       message: 'Somethig went wrong,please refresh', success: false
                  // })
                  return NextResponse.json({
                        message: 'login successful', success: true, data: user.role
                  })
            }

            //if user doesn't exist
            console.log("NOT EXIST", user, verifyPassword)
            return NextResponse.json({
                  message: "email or password doesn't match!", success: false
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}