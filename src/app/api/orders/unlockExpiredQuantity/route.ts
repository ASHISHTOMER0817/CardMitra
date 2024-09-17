import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Lock, Product } from "@/models/userModel";

Database();

export async function POST(request: NextRequest) {
    try {
        const currentTime = new Date();

        // Find all expired locks
        const expiredLocks = await Lock.find({ expiresAt: { $lt: currentTime } });

        if (expiredLocks.length === 0) {
            return NextResponse.json({
                message: "No expired locks found.",
                success: true,
                status: 200,
            });
        }

        console.log(`Found ${expiredLocks.length} expired locks.`);

        // Iterate over each expired lock to increment product quantity and delete the lock
        for (const lock of expiredLocks) {
            const productId = lock.productId;

            // Find the product by ID and increment its quantity
            const product = await Product.findById(productId);
            if (product) {
                product.quantity += 1; // Increment the quantity
                await product.save();   // Save the updated product
                console.log(`Product ${productId} quantity incremented.`);
            } else {
                console.log(`Product with ID ${productId} not found.`);
            }

            // Delete the lock after processing the product update
            await Lock.findByIdAndDelete(lock._id);
            console.log(`Lock ${lock._id} deleted.`);
        }

        return NextResponse.json({
            message: `${expiredLocks.length} Locks successfully released.`,
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
