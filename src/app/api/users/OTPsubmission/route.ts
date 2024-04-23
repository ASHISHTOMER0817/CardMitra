import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Otp } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";


Database()
export async function POST(request: NextRequest) {

      try {
            const userId = GetToken();
            let reqBody = await request.json()
            let { otp, contact, trackingId, _id } = reqBody.orderDetails
            console.log('1st console', otp, contact, trackingId);
            otp =parseInt(otp)
            // Convert the userId and _id strings to mongoose.Types.ObjectId
            const userObjectId = new mongoose.Types.ObjectId(userId);
            const orderObjectId = new mongoose.Types.ObjectId(_id);

            // Check if an order exists with the given orderObjectId
            const existingOrder = await Otp.findOne({ orderObjectId: orderObjectId });
            console.log('1.5th console',existingOrder)
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
                  const newOrder = await Otp.create({ otp, contact, trackingId, userObjectId, orderObjectId });
                  console.log('2nd console', newOrder);
                  return NextResponse.json({ message: 'Order created successfully', success: true });
            }
      } catch (error) {
            return NextResponse.json({ message: "Something went wrong, Server error", success: false });
      }
}