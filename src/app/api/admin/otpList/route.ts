import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
// import ordersToday from "@/app/components/lib";
import { Order, Otp } from "@/models/userModel";
// import { todaysDate } from "@/app/components/lib";
// import dateFormat from "@/app/components/dateFormat";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import { convertDates } from "@/app/components/lib";
import { otp } from "@/interface/productList";
dayjs.extend(utc)

Database()
export async function GET(request: NextRequest) {
      try {
            const dateParams = request.nextUrl.searchParams.get('date')
            const trackingOrzip = request.nextUrl.searchParams.get('trackingId')
            const actionString = request.nextUrl.searchParams.get('action')

            if (trackingOrzip) {
                  console.log('yes it is woring')
                  if (trackingOrzip.length === 6) {
                        console.log('fi condition')
                        const otpList = await Otp.find({ zipCode: trackingOrzip }).populate("userObjectId")
                        console.log(otpList, 'th is the that product')
                        return NextResponse.json({
                              message: "everything is fine", success: true, data: otpList
                        })
                  } else {
                        console.log('esle condition')
                        const otpList = await Otp.find({ trackingId: trackingOrzip }).populate("userObjectId")
                        console.log(otpList, 'th is the that product')

                        console.log('hello')

                        return NextResponse.json({
                              message: "everything is fine", success: true, data: otpList
                        })
                  }
            }

            console.log('crossed if condition')

            if (dateParams) {
                  let dates = JSON.parse(dateParams)
                  console.log(typeof dates.startDate, dates.startDate, new Date(dates.startDate), new Date())


                  // Obtain the local time zone offset in minutes

                  const range = convertDates(dates.startDate, dates.endDate)
                  const endDate = range.endDate
                  console.log('route', range.startDate, new Date(endDate.toDate()),)
                  if (actionString && actionString !== '' && JSON.parse(actionString)._id) {
                        console.log('if conditon')

                        const actionObject = JSON.parse(actionString)
                        // otpList document
                        const otpDocument = await Otp.findOneAndUpdate({ _id: actionObject._id }, { $set: { delivered: actionObject.label } })
                        console.log(otpDocument)
                        await Order.findOneAndUpdate({ _id: otpDocument.orderObjectId }, { $set: { delivered: actionObject.label } })
                        const otpList = await Otp.find({
                              submittedAt: {
                                    $gte: range.startDate,
                                    $lt: range.endDate
                              },
                        }).populate('userObjectId');

                        return NextResponse.json({
                              message: 'Query successful',
                              success: true,
                              data: otpList,
                        });
                  } else {
                        console.log('eslse conition', typeof range.startDate, typeof range.endDate)

                        const otpList = await Otp.find({
                              submittedAt: {
                                    $gte: range.startDate,
                                    $lt: range.endDate
                              },
                        }).populate('userObjectId');

                        return NextResponse.json({
                              message: 'Query successful',
                              success: true,
                              data: otpList,
                        })
                  }
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong", success: false
            })
      }
}