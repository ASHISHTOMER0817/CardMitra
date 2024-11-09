import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order } from "@/models/userModel"; // Assuming you have this model
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database();

export async function POST(request: NextRequest) {
    try {

        const orderId = request.nextUrl.searchParams.get('odrId')

        const reqBody = await request.json();

        const { deliveryDate } = reqBody;
        
        // Retrieve user token to ensure authorized access
        const { _id } = await GetToken();

        console.log('step 1');

        if (!_id) {
            return NextResponse.json({
                message: "Unauthorized access.",
                success: false,
                status: 401,
            });
        }
        console.log('step 2');

        // Convert user ID into a valid MongoDB ObjectId
        const userObjectId = new mongoose.Types.ObjectId(_id);

        console.log('step 3');
        // Find the order in the database by productId
        const order = await Order.findOne({ _id: orderId, user: userObjectId });

        console.log('step 4');

        if (!order) {
            return NextResponse.json({
                message: "Order not found.",
                success: false,
                status: 404,
            });
        }

        console.log('step 5');

        order.deliveryDate = deliveryDate;
        order.delivered = 'unverified';
        await order.save();

        console.log('step 6');

        return NextResponse.json({
            message: "Delivery information updated successfully.",
            success: true,
            status: 200,
        });

    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({
            message: "Something went wrong while processing the request, please try again later.",
            success: false,
            status: 500,
        });
    }
}
