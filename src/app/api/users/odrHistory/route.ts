import { NextResponse } from "next/server";
import { Order, Product, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import mongoose from "mongoose";



Database()
export async function GET() {

      try {
            const { _id } = await getToken()
            console.log('1', _id)
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);

            const user = await Order.find({ user: userObjectId, paid: { $ne: true } }).sort({ otp: 1 }).populate('product');
            console.log(user);
            return NextResponse.json({ data: user, message: 'User data successfully retrieved', success: true });
      } catch (error) {
            return NextResponse.json({ message: 'operation failed, try again', success: false });
      }
}