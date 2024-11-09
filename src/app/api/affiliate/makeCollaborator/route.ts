import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";

Database();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userId } = reqBody; // Extract userId from request body

        // Check if userId is provided
        if (!userId) {
            return NextResponse.json({
                message: "User ID is required.",
                success: false,
                status: 400,
            });
        }

        // Find and update the user to disapprove
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { role: 'collaborator' } },
            { new: true } // Return the updated document
        );

        // If no user is found
        if (!updatedUser) {
            return NextResponse.json({
                message: "User not found.",
                success: false,
                status: 404,
            });
        }

        return NextResponse.json({
            message: "User edited successfully.",
            success: true,
            status: 200,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({
            message: "Something went wrong. Please try again later.",
            success: false,
            status: 500,
        });
    }
}
