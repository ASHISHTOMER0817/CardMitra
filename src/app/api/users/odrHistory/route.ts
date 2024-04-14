import { NextResponse } from "next/server";
import { User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import { Product } from "@/models/userModel";



Database()
export async function GET() {

      try {
            const email = getToken()
            console.log('1', email)
            const user = await User.findOne({ email }).populate({ path: 'orders.order', model: 'products' }).exec()
            console.log(user)
            if (user) {
                  return NextResponse.json({
                        data: user.orders, message: 'User data successfully retrieved', success: true
                  })
            }
            return console.error("error")
      } catch (error) {
            return console.log(error)
      }
}