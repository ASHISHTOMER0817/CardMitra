import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModel";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'


export async function GET(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { name, phonenumber, email, password } = reqBody;
            console.log(reqBody)
            const user = await User.findOne({ email })
            if (!user) {
                  //hash Password
                  const salt = await bcryptjs.genSalt(10)
                  const hashedPassword = await bcryptjs.hash(password, salt);

                  const newUser = await new User({
                        name,
                        phonenumber,
                        email,
                        password: hashedPassword,
                  })

                  //Saving new member
                  const savedUser = await newUser.save();
                  console.log(savedUser)

                  return NextResponse.json({
                        message: "Logged In successfully", success: true
                  })
            }
            return NextResponse.json({
                  message: "email already exist !!", success: false
            })



      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}