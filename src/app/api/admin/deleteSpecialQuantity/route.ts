import Database from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';
import { SpecialQuantity } from '@/models/userModel'; // Assuming SpecialQuantity model is exported here
import mongoose from 'mongoose';

Database();

export async function POST(request: NextRequest) {
    try {

        const jsonReq = await request.json();
        
        const {id} = jsonReq;

        if (!id) {
            return NextResponse.json({
                message: 'ID is required',
                success: false,
            });
        }

        // Validate that the product ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({
                message: 'Invalid product ID format. Must be a 24-character hex string.',
                success: false,
            });
        }

        // Find and delete the SpecialQuantity record by ID
        const deletedRecord = await SpecialQuantity.findByIdAndDelete(id);

        if (!deletedRecord) {
            return NextResponse.json({
                message: 'No record found with the provided ID.',
                success: false,
            });
        }

        return NextResponse.json({
            message: 'Special quantity deleted successfully.',
            success: true,
            data: deletedRecord._id, // Optionally return the deleted record
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            message: 'Failed to fetch special quantity records',
            success: false,
        });
    }
}
