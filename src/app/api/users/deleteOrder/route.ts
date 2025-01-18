import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database();

export const DELETE = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { orderId } = reqBody; // Extract orderId from request body
        const { _id } = await GetToken(); // Get the user ID from the token

        if (_id) {
            // Convert user ID to ObjectId
            const userObjectId = new mongoose.Types.ObjectId(_id);

            // Find the order by orderId and ensure it belongs to the current user
            const order = await Order.findOne({ _id: orderId, user: userObjectId });

            const odr = await Order.findOne({_id: orderId});
            // console.log('odr: ', odr, 'user: ', userObjectId);

            if (!order) {
                return NextResponse.json({
                    message: "Order not found or you are not authorized to delete this order.",
                    success: false,
                    status: 404,
                });
            }

            // Delete the order
            await order.deleteOne();

            // Increase the product's requirement back by 1
            const product = await Product.findOne({ _id: order.product });
            if (product) {
                product.requirement = product.requirement + 1;
                await product.save();
            }

            return NextResponse.json({
                message: "Order successfully deleted.",
                success: true,
                status: 200,
            });
        } else {
            return NextResponse.json({
                message: "Unauthorized access.",
                success: false,
                status: 401,
            });
        }
    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong while deleting the order, please try again later.",
            success: false,
            status: 500,
        });
    }
};
