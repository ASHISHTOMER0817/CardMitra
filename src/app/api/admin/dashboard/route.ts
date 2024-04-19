import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";
import Dashboard from "@/app/(user)/dashboard/page";


Database()
export async function GET(request: NextRequest) {
      try {
            const searchparams = request.nextUrl.searchParams
            const query = searchparams.get('query')
            console.log(query)
            if(query === 'dashboard'){

                  const orderHistory = await Order.find().sort({ orderedAt: -1 }).populate('product').limit(3).exec()
                  console.log('1st console', orderHistory)
                  if (orderHistory) {
                        return NextResponse.json({
                              message: "Order history is being shown", status: false, data: orderHistory
                        })
                  }
            }else if(query === 'orderHistory'){
                  const orderHistory = await Order.find().sort({ orderedAt: -1 }).populate('product').exec()
                  console.log('1st console', orderHistory)
                  if (orderHistory) {
                        return NextResponse.json({
                              message: "Order history is being shown", status: false, data: orderHistory
                        })
                  }
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong please try again later", status: false
            })
      }

}
