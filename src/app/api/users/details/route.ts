import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            const searchparams = request.nextUrl.searchParams
            const _id = searchparams.get('query')
            console.log( _id)
            const user = await User.findOne({ _id })
            const orderList = await Order.find({user:_id})
            const data = {user, orderList}
            console.log(user, orderList,  'HMM THIS IS ORDERLIST',)
            return NextResponse.json({
                  message: "User details is being shown", data: data, success: true
            })
      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}