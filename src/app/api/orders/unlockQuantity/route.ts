import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Lock, Product } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { productId } = reqBody;
        const { _id } = await GetToken();

        // console.log('step 1');

        if (!_id) {
            return NextResponse.json({
                message: "Unauthorized access.",
                success: false,
                status: 401,
            });
        }

        // console.log('step 2');
        
        const userObjectId = new mongoose.Types.ObjectId(_id);
        
        // console.log('step 3');

        // Check if there's an existing lock for the user and product
        const existingLock = await Lock.findOne({ userId: userObjectId, productId });

        // console.log('step 4', existingLock);
        
        if (!existingLock) {
            return NextResponse.json({
                message: "No active lock found for this product and user.",
                success: false,
                status: 404,
            });
        }
        
        // console.log('step 5');
        
        // Delete the existing lock
        await Lock.findByIdAndDelete(existingLock._id);

        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json({
                message: "Product not found.",
                success: false,
                status: 404,
            });
        }

        // Increase the quantity of the product by 1
        product.requirement += 1;
        await product.save();

        // console.log('step 6');

        return NextResponse.json({
            message: "Lock successfully released.",
            success: true,
            status: 200,
        });

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong while processing the request, please try again later.",
            success: false,
            status: 500,
        });
    }
}
