import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product, Lock } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { productId } = reqBody;
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
        
        const userObjectId = new mongoose.Types.ObjectId(_id);
        
        console.log('step 3');
        // Check if the product exists
        const product = await Product.findOne({ _id: productId });
        if (!product) {
            return NextResponse.json({
                message: "Product not found or you are not authorized to access this order.",
                success: false,
                status: 404,
            });
        }
        console.log('step 4');
        
        // Check if there's an existing lock for the user and product
        let existingLock = await Lock.findOne({ userId: userObjectId, productId });

        console.log('step 5', existingLock);
        
        if (existingLock) {
            // If the existing lock is expired, remove it
            if (existingLock.expiresAt < new Date()) {
                await Lock.findByIdAndDelete(existingLock._id);
                existingLock = null; // Reset to create a new lock
            } else {
                // Return the remaining time if the lock is still active
                const remainingTime = Math.max(0, (existingLock.expiresAt.getTime() - Date.now()) / 1000);
                return NextResponse.json({
                    message: "Lock already exists and is active.",
                    success: true,
                    status: 200,
                    remainingTime,
                });
            }
        }

        console.log('step 6');
        
        // Check if the product quantity is greater than zero
        if (product.quantity <= 0) {
            return NextResponse.json({
                message: "Product quantity is zero.",
                success: false,
                status: 400,
            });
        }
        
        console.log('step 7');
        // Create a new lock if no active lock exists
        const lock = new Lock({
            userId: userObjectId,
            productId,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
        });

        await lock.save();

        console.log('step 8');

        return NextResponse.json({
            message: "Lock successfully created.",
            success: true,
            status: 200,
            remainingTime: 10 * 60, // 10 minutes in seconds
        });

    } catch (error) {
        return NextResponse.json({
            message: "Something went wrong while processing the request, please try again later.",
            success: false,
            status: 500,
        });
    }
}
