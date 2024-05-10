import { NextResponse } from "next/server";
import { Order, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import { Product } from "@/models/userModel";
import mongoose from "mongoose";



Database()
export async function GET() {

      try {
            const { _id } = await getToken()
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);

            const order = await Order.find({ user: userObjectId }).populate('product');
            // const todaysOrders = await Order.find({ createdAt: dateFormat(new Date()) }).populate('product')
            return NextResponse.json({
                  data: order, message: 'User data successfully retrieved', success: true
            })

      } catch (error) {
            return NextResponse.json({
                  message: 'Something is mussing, please come later', success: true
            })
      }
}