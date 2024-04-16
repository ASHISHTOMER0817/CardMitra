import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Product, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";


Database()
export async function GET(request: NextRequest) {

      try {
            const email = GetToken()
            const orderNum = request.nextUrl.searchParams.get('odrId')
            const user = await User.findOne({ email })
            if (user) {
                  const order = user.orders.find(({ orderNumber }: { orderNumber: string }) => orderNumber === orderNum)
                  console.log('2nd console', order)
                  return NextResponse.json({
                        data: order, message: 'User data successfully retrieved', success: true
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