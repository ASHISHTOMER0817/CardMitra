import { NextRequest, NextResponse } from "next/server";
import { Order, Otp, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
// import { Product } from "@/models/userModel";
import mongoose from "mongoose";
// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'


Database()
export async function GET(request: NextRequest) {

      try {
            const { _id } = await getToken()
            const otpObjectId = request.nextUrl.searchParams.get('query')
            if (otpObjectId) {
                  console.log(otpObjectId, 'what is this???')
                  const otpAction = await Otp.findOneAndUpdate({ _id: otpObjectId }, { $set: { acknowledgment: true } })
                  console.log(otpAction)
            }
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);
            console.log(userObjectId)
            const otpAction = await Otp.find({
                  userObjectId: _id, $or: [
                        { delivered: 'wrong OTP' },
                        { delivered: 'cancelled' }
                  ], acknowledgment: false
            }).populate({ path: 'orderObjectId', populate: { path: 'product' } })
            console.log(otpAction, 'otpaction is this')
            const order = await Order.find({ user: userObjectId }).populate('product');
            const group = { order, otpAction }
            // const todaysOrders = await Order.find({ createdAt: dateFormat(new Date()) }).populate('product')
            return NextResponse.json({
                  data: group, message: 'User data successfully retrieved', success: true
            })

      } catch (error) {
            return NextResponse.json({
                  message: 'Something is mussing, please come later', success: true
            })
      }
}