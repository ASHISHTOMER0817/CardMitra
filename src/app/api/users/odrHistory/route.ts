import { NextRequest, NextResponse } from "next/server";
import { Order, Otp, Product, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import mongoose from "mongoose";



Database()
export async function GET(request:NextRequest) {

      try {
            const { _id } = await getToken()

            // SearchParams
            const listType = request.nextUrl.searchParams.get('listType')
            console.log('this is listytpe',listType)
            if(listType === 'undelivered'){
                  const orderList = await Order.find({ user: _id, paid: { $ne: true },delivered:false }).sort({ otp: 1 }).populate('product');
                  return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });
 
            }
            else if(listType === 'delivered'){
                  const orderList = await Order.find({ user: _id, delivered:true }).sort({ paid: 1 }).populate('product');
                  return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });

            }
            else if(listType === 'wrong OTP'){
                  console.log('wrong otp else if')
                  const orderList = await Otp.find({ userObjectId: _id, delivered:'wrong OTP' }).sort({ submittedAt: 1 }).populate({path:'orderObjectId',populate:{path:'product', model:'products'}});
                  console.log(orderList)
                  return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });

            }
            else if(listType === 'all'){
                  const orderList = await Order.find({ user: _id }).sort({ paid: 1 }).populate('product');
                  return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });

            }
            else if(listType === 'cancelled'){
                  const orderList = await Otp.find({ userObjectId: _id, delivered:'cancelled' }).sort({ submittedAt: 1 }).populate({path:'orderObjectId',populate:{path:'product'}});
                  return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });

}
            console.log('1', _id)
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);

            const user = await Order.find({ user: userObjectId, paid: { $ne: true } }).sort({ otp: 1 }).populate('product');
            // console.log(user);
            return NextResponse.json({ data: user, message: 'User data successfully retrieved', success: true });
      } catch (error) {
            return NextResponse.json({ message: 'operation failed, try again', success: false });
      }
}