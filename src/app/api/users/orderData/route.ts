import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";


Database()
export async function GET(request: NextRequest) {

      try {
            let params = request.nextUrl.searchParams
            let odrId = request.nextUrl.searchParams.get('odrId')
            let productId = request.nextUrl.searchParams.get('productId')
            let otpstatus = params.get('otpStatus')
            let deliveryStatus = params.get('deliveryStatus')
            console.log('1st', odrId)
            console.log('2nd', productId)
            if (odrId) {
                  const order = await Order.findOne({ _id: odrId }).populate('product')
                  if (otpstatus) {
                        order.otp = true;
                  }
                  if (deliveryStatus && order.otp) {
                        order.delivery = 'unverified'
                  }
                  const updatedOrder = await order.save()
                  console.log('2nd console', updatedOrder)
                  return NextResponse.json({
                        data: order, message: 'User data successfully retrieved', success: true
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