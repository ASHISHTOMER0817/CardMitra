import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";


Database()
export async function POST(request: NextRequest) {

      try {
            const email = GetToken()
            const { otp, contact, trackingId, orderNumber } = await request.json()
            console.log('1st console', otp, contact, trackingId)
            const user = await User.findOne({ email })
            if (user) {

                  const updatedUser = await User.findOneAndUpdate(
                        { email, 'orders': { $elemMatch: { orderNumber } } },
                        { $set: { 'orders.$.otp': otp, 'orders.$.trackingId': trackingId } },
                        { returnDocument: 'after' }
                      );
                  console.log('2nd console', updatedUser)
                  return NextResponse.json({
                        message: 'User data successfully retrieved', success: true
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