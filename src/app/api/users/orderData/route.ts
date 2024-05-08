import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";


Database()
export async function GET(request: NextRequest) {

      try {
            let odrId = request.nextUrl.searchParams.get('odrId')
            let productId = request.nextUrl.searchParams.get('productId')
            
            console.log('1st', odrId)
            console.log('2nd', productId)
            if (odrId) {
                 
                  const order = await Order.findOne({_id:odrId}).populate('product')
                  console.log('2nd console', order)
                  return NextResponse.json({
                        data: order, message: 'User data successfully retrieved', success: true
                  })
            }else if(productId){
                  console.log('objectId')
                  const orderList = await Order.find({product:productId}).populate('user')
                  console.log('this is orderList', orderList)
                  return NextResponse.json({
                        message: "Showing orderList", success: false, data:orderList
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