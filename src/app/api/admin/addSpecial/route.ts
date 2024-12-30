import Database from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';
import { Product, User, SpecialQuantity } from '@/models/userModel'; // Assuming SpecialQuantity is part of the models
import mongoose from 'mongoose';

Database();

export async function POST(request: NextRequest) {
    try {
        // Connect to the database (already done by Database())

        const reqBody = await request.json();

        const {user, quantity, product} = reqBody;

        if (!user || !quantity || !product) {
            return NextResponse.json({
                message: 'User ID, quantity, and product are required',
                success: false,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(product)) {
            return NextResponse.json({
                message: 'Invalid user or product ID format. Must be a 24-character hex string.',
                success: false,
            });
        }

        // Convert to ObjectId
        const userId = new mongoose.Types.ObjectId(user);
        const productId = new mongoose.Types.ObjectId(product);

        // Add to SpecialQuantity table
        const specialQuantityEntry = await SpecialQuantity.create({
            product: productId,
            user: userId,
            quantity,
        });

        // Return success response
        return NextResponse.json({
            message: 'Special quantity added successfully',
            success: true,
            data: specialQuantityEntry,
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Failed to add special quantity',
            success: false,
        });
    }
}
