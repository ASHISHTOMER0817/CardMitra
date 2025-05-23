import { NextRequest, NextResponse } from "next/server";
import { Order, Otp, Product, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import mongoose from "mongoose";
import bufferToString, { bufferToStringOrders } from "@/app/components/bufferToString";
import  { order } from "@/interface/productList";



Database()
export async function GET(request: NextRequest) {

      try {
            const { _id } = await getToken()

            // SearchParams
            // console.log('this is listytpe',listType)
            const orderHistory:order[] = await Order.find({ user: _id, }).sort({ orderedAt: -1 })
            .populate({
                  path: 'product',
                  populate: [
                        { path: 'cards' },
                        { path: 'site' }
                  ]
            }).lean()

            const orderList = bufferToStringOrders(orderHistory)
            // console.log(orderList)

            return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });


      } catch (error) {
            return NextResponse.json({ message: 'operation failed, try again', success: false });
      }
}