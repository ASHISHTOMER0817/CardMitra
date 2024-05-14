import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import ordersToday from "@/app/components/lib";
import { Order, Otp } from "@/models/userModel";
import { todaysDate } from "@/app/components/lib";
import dateFormat from "@/app/components/dateFormat";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

Database()
export async function GET(request: NextRequest) {
      try {
            const dateParams = request.nextUrl.searchParams.get('date')
            const trackingParams = request.nextUrl.searchParams.get('trackingId')
            const pincode = request.nextUrl.searchParams.get('pincode')
            const actionString = request.nextUrl.searchParams.get('action')
            if (dateParams) {

                  // Parse the date string using Day.js
                  const newDate = dayjs(dateParams).utc();

                  // Set startDate to the beginning of the day (00:00:00.000)
                  const startDate = newDate.startOf('day').toDate(); // Convert Day.js object to Date object

                  // Set endDate to just before midnight (23:59:59.999)
                  const endDate = newDate.endOf('day').toDate(); // Convert Day.js object to Date object

                  console.log(startDate); // Output: Date object representing 2024-05-14T00:00:00.000Z
                  console.log(endDate); // Output: Date object representing 2024-05-14T23:59:59.999Z





                  // console.log(actionString, 'this is action')
                  // console.log(JSON.parse(actionString!))
                  // console.log('if condition')
                  let actionObject = JSON.parse(actionString!)

                  // let actionObject;
                  if (actionObject._id) {
                        // otpList document
                        const otpDocument = await Otp.findOneAndUpdate({ _id: actionObject }, { $set: { delivered: actionObject.label } })
                        console.log(otpDocument)
                        
                  }

                  const otpList = await Otp.find({
                        submittedAt: {
                              $gte: startDate, // Convert to a JavaScript Date object
                              $lt: endDate, // Convert to a JavaScript Date object
                        },
                  }
                  ).populate("userObjectId")

                  // console.log(otpList)
                  return NextResponse.json({
                        message: "everything is fine", success: true, data: otpList
                  })
            } else if (trackingParams) {
                  const otpList = await Otp.find({ trackingId: trackingParams }).populate("userObjectId")
                  console.log('hello')

                  return NextResponse.json({
                        message: "everything is fine", success: true, data: otpList
                  })
            }
            else if (pincode) {
                  const otpList = await Otp.find({ pincode: pincode })
                  return NextResponse.json({
                        message: "everything is fine", success: true, data: otpList
                  })
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong", success: false
            })
      }
}