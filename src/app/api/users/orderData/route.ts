import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";


Database()
export async function GET(request: NextRequest) {

      try {
            const _id = request.nextUrl.searchParams.get('odrId')
            console.log('1st', _id)
            if (_id) {
                  const order = await Order.findById({_id}).populate('product')
                  console.log('2nd console', order)
                  return NextResponse.json({
                        data: order, message: 'User data successfully retrieved', success: true
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