import { NextResponse } from "next/server";
import { Order, Product, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import mongoose from "mongoose";



Database()
export async function GET() {

      try {
            const userId = getToken()
            console.log('1', userId)
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(userId);

            const user = await Order.find({ user: userObjectId }).populate('product');
            console.log(user);

            if (user) {
                  return NextResponse.json({ data: user, message: 'User data successfully retrieved', success: true });
            }
            return console.error("error")
      } catch (error) {
            return console.log(error)
      }
}