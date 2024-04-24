import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, Product, User } from "@/models/userModel";
// import Dashboard from "@/app/(user)/dashboard/page";
import dateFormat from "@/app/components/dateFormat";


Database()
export async function GET(request: NextRequest) {

         // function to calculate something below
         async  function noOfDays (key:string,value:string){
            const order = await Order.find({[key]:value})
            const count = order.length
            return count
      }
      try {
            const searchparams = request.nextUrl.searchParams
            const query = searchparams.get('query')
            console.log(query)


         


            if(query === 'dashboard'){

                  const orderHistory = await Product.find({deals:true})
                  console.log('1st console', orderHistory)

                  // Today's date
                  const todaysDate = dateFormat(new Date())

                 const noOfDelivery=  noOfDays("deliveryDate",todaysDate)

                  //Affiliate Array
                  const affiliate = await User.find()
                  const noOfAffiliate = affiliate.length

                  //Orders placed today
                const noOfOrders =  noOfDays("orderedAt",todaysDate)

                  const data = {orderHistory, noOfDelivery, noOfAffiliate, noOfOrders}
                  console.log(data)
                  if (orderHistory) {
                        return NextResponse.json({
                              message: "Order history is being shown", status: false, data: data
                        })
                  }
            }else if(query === 'orderHistory'){
                  const orderHistory = await Product.find({show:true}).sort({ deals: -1 })
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
