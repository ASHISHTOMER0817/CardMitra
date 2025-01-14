import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import { Order } from "@/models/userModel";

// Initialize database connection
Database();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { order_ids } = reqBody;

        // Step 1: Verify the user's identity and role
        const { _id, role } = await GetToken();

        if (!_id) {
            return NextResponse.json({
                message: "Unauthorized access.",
                success: false,
                status: 401,
            });
        }

        // Step 2: Check if the user has admin privileges
        if (role !== 'admin') {
            return NextResponse.json({
                message: "Unauthorized access. Admin rights required.",
                success: false,
                status: 403,
            });
        }

        // Step 3: Validate and update orders
        let updatedOrders = 0;

        for (const orderId of order_ids) {
            if (!mongoose.Types.ObjectId.isValid(orderId)) {
                return NextResponse.json({
                    message: `Invalid order ID: ${orderId}`,
                    success: false,
                    status: 400,
                });
            }

            // Find and update each order
            const order = await Order.findById(orderId);
            if (order) {
                order.delivered = 'delivered';
                await order.save();
                updatedOrders++;
            }
        }

        // Step 4: Respond with the result
        return NextResponse.json({
            message: `${updatedOrders} orders marked as delivered.`,
            success: true,
            status: 200,
        });

    } catch (error) {
        console.error("Error updating order statuses:", error);
        return NextResponse.json({
            message: "Something went wrong while processing the request. Please try again later.",
            success: false,
            status: 500,
        });
    }
}
