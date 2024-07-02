import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";
import { order } from "@/interface/productList";
import { bufferToStringOrders } from "@/app/components/bufferToString";


Database()
export async function GET(request: NextRequest) {

      try {
            let params = request.nextUrl.searchParams
            let odrId = request.nextUrl.searchParams.get('odrId')
            let productId = request.nextUrl.searchParams.get('productId')
            let otpstatus = params.get('otpStatus')
            let deliveryStatus = params.get('deliveryStatus')
            if (odrId) {
                  
                  const updateOrder = await Order.findOne({ _id: odrId })
                  if (otpstatus === 'true') { updateOrder.otp = true }
                  if (deliveryStatus === 'true') { updateOrder.delivered = 'unverified' }
                  const updatedOrder = await updateOrder.save()

                  console.log('2nd console', updatedOrder)
                  const order: order | null = await Order.findOne({ _id: odrId }).populate({
                        path: 'product',
                        populate: [
                              { path: 'cards' },
                              { path: 'site' }
                        ]
                  }).lean()

                  let orders;
                  if (order) { orders = bufferToStringOrders(order) }
                  console.log(orders, 'after converting buffer to string')
                  return NextResponse.json({
                        data: orders, message: 'User data successfully retrieved', success: true
                  })
            } else if (productId) {
                  console.log('objectId')
                  const orderList = await Order.find({ product: productId }).populate('user')
                  console.log('this is orderList', orderList)
                  return NextResponse.json({
                        message: "Showing orderList", success: false, data: orderList
                  })
            }
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })

      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })
      }
}