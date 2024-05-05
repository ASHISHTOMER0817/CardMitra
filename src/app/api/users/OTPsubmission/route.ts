import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Otp } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import dateFormat from "@/app/components/dateFormat";


Database()
export async function POST(request: NextRequest) {

      try {
            const {_id} = GetToken();
            let reqBody = await request.json()
            let { otp, contact, trackingId, order_id } = reqBody.orderDetails
            console.log('1st console', otp, contact, trackingId);
            otp = parseInt(otp)
            // Convert the userId and _id strings to mongoose.Types.ObjectId
            const userObjectId = new mongoose.Types.ObjectId(_id);
            const orderObjectId = new mongoose.Types.ObjectId(order_id);


            // console.log('this is = ', orderObjectId)
            // Saving delivery Date in OTP List 
            const singleorder = await Order.findOne({ _id:orderObjectId })
            // console.log(singleorder)
            // Check if an order exists with the given orderObjectId
            const existingOrder = await Otp.findOne({ orderObjectId: orderObjectId });
            console.log('1.5th console', existingOrder)
            if (existingOrder) {
                  // Update the existing order
                  existingOrder.otp = otp;
                  existingOrder.contact = contact;
                  existingOrder.trackingId = trackingId;
                  existingOrder.userObjectId = userObjectId;

                  const updatedOrder = await existingOrder.save();
                  console.log('2nd console', updatedOrder);
                  return NextResponse.json({ message: 'Order updated successfully', success: true });
            } else {
                  // Create a new order
                  console.log("hello else condition")
                  const newOtpsubmission = await new Otp({
                        otp, contact, trackingId, userObjectId, delivered:false, orderObjectId, submittedAt:dateFormat(new Date()) 
                  })
                  console.log(newOtpsubmission)
                  console.log(typeof otp,typeof contact)
                  const newOrder = await Otp.create({ otp, contact, trackingId, userObjectId, delivered:false, orderObjectId, submittedAt:dateFormat(new Date()) });
                  console.log('2nd console', newOrder);
                  const order = Order.findByIdAndUpdate({ orderObjectId }, { $set: { otp: true } })
                  return NextResponse.json({ message: 'Order created successfully', success: true });
            }
      } catch (error) {
            return NextResponse.json({ message: "Something went wrong, Server error", success: false });
      }
}