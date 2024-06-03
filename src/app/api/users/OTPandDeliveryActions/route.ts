import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Otp } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import dateFormat from "@/app/components/dateFormat";


Database()
export async function GET(request: NextRequest) {

      try {
            // const { _id } = await GetToken();
            // let reqBody = await request.json()
            // let { otp, contact, trackingId, order_id } = reqBody.orderDetails
            // console.log('1st console', otp, contact, trackingId);
            // otp = parseInt(otp)
            // // Convert the userId and _id strings to mongoose.Types.ObjectId
            // const userObjectId = new mongoose.Types.ObjectId(_id);
            // const orderObjectId = new mongoose.Types.ObjectId(order_id);


            // // console.log('this is = ', orderObjectId)
            // // Saving delivery Date in OTP List 
            // // const singleorder = await Order.findOne({ _id: orderObjectId }).populate('product')
            // // console.log(singleorder)
            // // Check if an order exists with the given orderObjectId
            // const existingOtp = await Otp.findOne({ orderObjectId: orderObjectId });
            // const existingOrder = await Order.findOne({ _id: order_id })
            // console.log('1.5th console', existingOtp)
            // if (existingOtp) {
            //       // Update the existing order
            //       existingOtp.otp = otp;
            //       existingOtp.contact = contact;
            //       existingOtp.trackingId = trackingId;
            //       // existingOtp.userObjectId = userObjectId;
            //       if (existingOtp.delivered === 'wrong OTP') { existingOtp.delivered = 'undelivered'; existingOrder.delivered = 'undelivered' }

            //       const updatedOtp = await existingOtp.save();
            //       const updateOrder = await existingOrder.save()
            //       console.log('2nd console', updatedOtp);
            //       return NextResponse.json({ message: 'Order updated successfully', success: true });
            // } else {
            //       // Create a new order
            //       console.log("hello else condition")
            //       const order = await Order.findOneAndUpdate({ _id: order_id }, { $set: { otp: true } }, { new: true }).populate('product')
            //       console.log('so this is zipcode', order.product.zipCode)
            //       const newOrder = await Otp.create({ otp, contact, trackingId, userObjectId, delivered: 'undelivered', orderObjectId, submittedAt: new Date(), zipCode: order.product.zipCode, acknowledgment: false });
            //       console.log('2nd console', newOrder);
            //       console.log('wow ', order)
            //       return NextResponse.json({ message: 'Order created successfully', success: true });
            // }
            console.log('something different')
            const searchparams = request.nextUrl.searchParams
            const odrId = searchparams.get('odrId')
            const otpStatus = searchparams.get('otpStatus')
            const deliveryStatus = searchparams.get('deliveryStatus')
            console.log(odrId, 'this is orderId')
            if (otpStatus === 'true') {
                  const order = await Order.findOneAndUpdate({ _id: odrId }, { $set: { otp: true } }, { new: true })
                  console.log(order)
            }
            else if (deliveryStatus === 'true') {
                  const order = await Order.findOneAndUpdate({ _id: odrId, otp: true }, { $set: { delivered: 'unverified' } }, { new: true })
                  console.log(order)
            }
            const order = await Order.findOne({ _id: odrId })
            console.log(order)
            return NextResponse.json({ message: 'Order created successfully', success: true });

      } catch (error) {
            return NextResponse.json({ message: "Something went wrong, Server error", success: false });
      }
}