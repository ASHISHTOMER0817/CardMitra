import { NextResponse, NextRequest } from "next/server";
import {User} from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import Database from "@/database/database";


Database()
export async function POST(request: NextRequest) {
      try {
            const reqBody = await request.json()
            const { name, email, password, number } = reqBody.user;
            console.log('1st', reqBody)
            const user = await User.findOne({ email })
            console.log("2nd", user)
            const phoneNumber = await User.findOne({ number })
            if (!user && !phoneNumber) {
            //hash Password


            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt);
            console.log('2.5th', hashedPassword)
            const savedUser = await User.create({ name, email, number, password:hashedPassword });
            console.log("4th", savedUser)

            return NextResponse.json({
                  message: "Logged In successfully", success: true
            })
            }
            return NextResponse.json({
                  message: "User associated with these details already exist!", success: false
            })
      } catch (error) {
            console.log(error)
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}