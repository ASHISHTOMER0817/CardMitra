import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product, User } from "@/models/userModel";
// import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";


Database()
export async function GET(request: NextRequest) {

      try {
            let odrId = request.nextUrl.searchParams.get('odrId')
            let objectId = request.nextUrl.searchParams.get('objectId')
            
            console.log('1st', odrId)
            console.log('2nd', objectId)
            if (odrId) {
                 
                  const order = await Order.findOne({_id:odrId}).populate('product')
                  console.log('2nd console', order)
                  return NextResponse.json({
                        data: order, message: 'User data successfully retrieved', success: true
                  })
            }else if(objectId){
                  console.log('objectId')
                  const orderList = await Order.find({product:objectId}).populate('user')
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