import Database from '@/database/database';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/userModel';

Database();

export async function GET(request: NextRequest) {
    try {
        // Extract query parameter
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        // Fetch users based on the query
        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'name'
                { email: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'email'
                { contact: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'email'
            ],
        });

        return NextResponse.json({
            message: 'Users fetched successfully',
            success: true,
            users,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({
            message: 'Failed to fetch users',
            success: false,
        });
    }
}
