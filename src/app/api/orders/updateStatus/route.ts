import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import { Order } from "@/models/userModel";

Database();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { orderId, status } = reqBody;
        const { _id, role } = await GetToken();

        // console.log('step 1');

        if (!_id) {
            return NextResponse.json({
                message: "Unauthorized access.",
                success: false,
                status: 401,
            });
        }

        // console.log('step 2');

        // Step 2: Check if the user is an admin
        if (role !== 'admin') {
            return NextResponse.json({
                message: "Unauthorized access. Admin rights required.",
                success: false,
                status: 403,  // Forbidden
            });
        }
        
         // Step 3: Validate orderId and status
         if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return NextResponse.json({
                message: "Invalid order ID.",
                success: false,
                status: 400,
            });
        }

        // Step 4: Find the order in the database
        const order = await Order.findById(orderId);

        if (!order) {
            return NextResponse.json({
                message: "Order not found.",
                success: false,
                status: 404,
            });
        }
 
        // Step 5: Update the delivered status of the order
        order.delivered = status;
        await order.save();


        return NextResponse.json({
            message: "Status successfully updated.",
            success: true,
            status: 200,
            val: order.delivered
        });

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong while processing the request, please try again later.",
            success: false,
            status: 500,
        });
    }
}
