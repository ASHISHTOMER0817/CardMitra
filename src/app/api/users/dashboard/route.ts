import { NextResponse } from "next/server";
import { Order, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import { Product } from "@/models/userModel";
import mongoose from "mongoose";
import dateFormat from "@/app/components/dateFormat";



Database()
export async function GET() {

      try {
            const {_id} = getToken()
            console.log('1', _id)
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);

            const order = await Order.find({ user: userObjectId }).populate('product');
            // const todaysOrders = await Order.find({ createdAt: dateFormat(new Date()) }).populate('product')
            console.log(order);

            return NextResponse.json({
                  data: order, message: 'User data successfully retrieved', success: true
            })

      } catch (error) {
            return console.log(error)
      }
}