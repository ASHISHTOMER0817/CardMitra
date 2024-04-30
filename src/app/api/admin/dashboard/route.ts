import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, Product, User } from "@/models/userModel";
// import Dashboard from "@/app/(user)/dashboard/page";
import dateFormat from "@/app/components/dateFormat";
import ordersToday, { todaysDate } from "@/app/components/lib";

Database()
export async function GET(request: NextRequest) {

      // function to calculate something below
      // async function noOfDays(key: string, value: string) {
      //       const order = await Order.find({ [key]: value })
      //       if (order.length <= 0) {
      //             return 0;
      //       } else {
      //             return order.length;
      //       }

      // }
      try {
            const searchparams = request.nextUrl.searchParams
            const query = searchparams.get('query')
            const _id = searchparams.get('_id')
            // console.log(query)




            if (query === 'dashboard') {

                  const orderHistory = await Product.find({ deals: true }).limit(3)


                  // Today's date
                const {deliveries} = await ordersToday()
               
                  //Affiliate Array
                  const affiliate = await User.find()
                  const noOfAffiliate = affiliate.length
                  console.log(noOfAffiliate)


                  //Orders placed today
                  let order;
                  const Orders = await Order.find({ orderedAt: todaysDate })
                  if (Orders.length <= 0) {
                        order = 0
                  
                  } else {
                        order = Orders.length;
                  }










                  const data = { orderHistory,deliveries, noOfAffiliate, order }
                  console.log(data)
                  if (orderHistory) {
                        return NextResponse.json({
                              message: "Order history is being shown", status: false, data: data, 
                        })
                  }
            } else if (query === 'orderHistory') {
                  const orderHistory = await Product.find({ show: true }).sort({ deals: -1 })
                  console.log('1st console', orderHistory)
                  if (orderHistory) {
                        return NextResponse.json({
                              message: "Order history is being shown", status: false, data: orderHistory
                        })
                  }
            }
            else if(_id){
                  const removeDeal = Product.findOneAndUpdate({_id:_id}, {$set:{show:false}})
                  console.log('deal removed')
                  return NextResponse.json({
                        message: "deal removed", success: true
                  }) 
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong please try again later", status: false
            })
      }

}
