import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
// import Product from "@/models/productModel";



Database()
export async function GET() {

      try {
            const email = getToken()
            console.log( '1',email)
            const user = await User.findOne({ email }).exec()
            console.log(user)
            await user.populate({ path: 'orders.order', options: { limit: 3 } }).execPopulate()

            if (user) {
                  return NextResponse.json({
                        data: user.orders, message: 'User data successfully retrieved', success: true
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