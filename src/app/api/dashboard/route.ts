import { NextResponse, NextRequest } from "next/server";
import {User} from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"



Database()
export async function GET(request: NextRequest) {

      try {
            const email = getToken()
            console.log( '1',email)
            const user = await User.findOne({ email }).populate({path:'products', options:{limit:3}}).exec()
            console.log('2', user)
            if (user) {
                  return NextResponse.json({
                        data: user, message: 'User data successfully retrieved', success: true
                  })
            }
            return NextResponse.json({
                  message: "Something went wrong, Please refresh the page", success: false
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })
      }
}