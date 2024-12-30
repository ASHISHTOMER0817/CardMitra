import Database from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';
import { SpecialQuantity } from '@/models/userModel'; // Assuming SpecialQuantity model is exported here
import mongoose from 'mongoose';

Database();

export async function GET(request: NextRequest) {
    try {
        // Extract product ID from query parameters
        

        const product = request.nextUrl.searchParams.get('product');

        if (!product) {
            return NextResponse.json({
                message: 'Product ID is required',
                success: false,
            });
        }

        // Validate that the product ID is valid
        if (!mongoose.Types.ObjectId.isValid(product)) {
            return NextResponse.json({
                message: 'Invalid product ID format. Must be a 24-character hex string.',
                success: false,
            });
        }

        // Fetch all SpecialQuantity instances for the specific product
        const specialQuantities = await SpecialQuantity.find({ product: product }).populate('user');

        // Check if no records were found
        if (specialQuantities.length === 0) {
            return NextResponse.json({
                message: 'No special quantity records found for the specified product',
                success: false,
            });
        }

        // Return the special quantities
        return NextResponse.json({
            message: 'Special quantity records fetched successfully',
            success: true,
            data: specialQuantities,
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Failed to fetch special quantity records',
            success: false,
        });
    }
}
