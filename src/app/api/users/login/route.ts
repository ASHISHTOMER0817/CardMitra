import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs'
import Database from "@/database/database";
import { User } from "@/models/userModel";
import * as jose from 'jose'

Database()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { email, password, remember } = reqBody.user;
            const user = await User.findOne({ email })
            const existingPassword = user.password

            //compare password
            const verifyPassword = await bcrypt.compare(password, existingPassword)
            const tokenData = { email, password, _id: user._id, role: user.role }
            console.log(tokenData)

            //if user doesn't exist
            if (user && verifyPassword) {
                  //check if user actually exist 

                  const secret = new TextEncoder().encode(
                        process.env.TOKEN_SECRET_KEY!
                  )
                  const alg = 'HS256'

                  const joseToken = await new jose.SignJWT(tokenData)
                        .setProtectedHeader({ alg })
                        .setIssuedAt()
                        .setIssuer('Guru')
                        .setAudience('Orderee')
                        .setExpirationTime(remember ? '7 days' : '1 hr')
                        .sign(secret)

                  const days =  7 * 24 * 60 * 60 * 1000
                  const hour = 60 * 60 * 1000
                  cookies().set('joseToken', joseToken, { expires: Date.now() + remember ? days : hour })

                  // Redirect the user/admin
                  // user.role === 'admin' ? redirect('/'): user.role === 'user' ? redirect('/dashboard'):''
                  // return user.role === 'admin' ? NextResponse.redirect('/adminDashboard') : user.role === 'user' ? NextResponse.redirect('/dashboard') : NextResponse.json({
                  //       message: 'Somethig went wrong,please refresh', success: false
                  // })
                  return NextResponse.json({
                        message: 'login successful', success: true, data: user.role
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "email or password doesn't match!", success: false
            })
      }


}