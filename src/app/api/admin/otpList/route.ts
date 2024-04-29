import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import ordersToday from "@/app/components/lib";
import { Order, Otp } from "@/models/userModel";
import { todaysDate } from "@/app/components/lib";
import dateFormat from "@/app/components/dateFormat";

Database()
export async function GET(request: NextRequest) {
      try {
            const dateParams = request.nextUrl.searchParams.get('date')
            const trackingParams = request.nextUrl.searchParams.get('trackingId')
            console.log(dateParams, trackingParams)
            if (dateParams) {
                  const newDate = new Date(dateParams) 
                  const date = dateFormat(newDate)
                  const otpList = await Otp.find({ submittedAt: date }).populate("userObjectId")
                  console.log(otpList)
                  return NextResponse.json({
                        message: "everything is fine", success: true, data: otpList
                  })
            } else if(trackingParams) {
                  const otpList = await Otp.find({trackingId:trackingParams}).populate("userObjectId")
                  console.log('hello')

                  return NextResponse.json({
                        message: "everything is fine", success: true, data:otpList
                  })
            }

      } catch {
           return NextResponse.json({
                  message: "Something went wrong", success: false
            })
      }
}