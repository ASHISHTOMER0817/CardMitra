import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel";
import { order } from "@/interface/productList";
import { bufferToStringOrders } from "@/app/components/bufferToString";

Database()

export async function POST(request: NextRequest) {

      try {
            
            let odrId = request.nextUrl.searchParams.get('odrId')
            
            if (odrId) {

                const reqBody = await request.json();

                const { orderBy, orderID, trackingID, otp, last4digits } = reqBody;
            
                // Update the Order document with new values
                const updatedOrder = await Order.findOneAndUpdate(
                    { _id: odrId },
                    {
                        ordererName: orderBy,
                        orderId: orderID,
                        trackingID: trackingID,
                        otp: otp,
                        last4digits: last4digits,
                        otpDate: otp ? new Date() : null
                    },
                    { new: true }  // Return the updated document
                );

                // Check if the order was updated successfully
                if (updatedOrder) {
                    return NextResponse.json({
                        message: 'Details updated successfully', 
                        success: true, 
                        updatedOrder
                    });
                } else {
                    return NextResponse.json({
                        message: "Order not found or update failed", 
                        success: false
                    });
                }
            } 
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })

      } catch (error) {
            return NextResponse.json({
                message: "Something went wrong, Server error", success: false
            })
      }
}