import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product, Lock } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import dateFormat from "@/app/components/dateFormat";

Database()

export const POST = async (request: NextRequest) => {

  try {
    const reqBody = await request.json();
    const { orderNumber, ordererName, objectId } = reqBody.formData;
    const { _id } = await GetToken();

    if (_id) {

      // Convert to MongoDB ObjectIds
      const userObjectId = new mongoose.Types.ObjectId(_id);
      const productId = new mongoose.Types.ObjectId(objectId);

      // Check for lock
      const lock = await Lock.findOne({ userId: userObjectId, productId });

      if (!lock) {
        // If no lock found, return error
        return NextResponse.json({
          message: "No active lock found for this product. Please try again.", 
          success: false, 
          status: 400
        });
      }

      // Check if the lock has expired
      const currentTime = new Date();
      if (currentTime > lock.expiresAt) {
        // If lock is expired, return error and delete lock
        await Lock.deleteOne({ userId: userObjectId, productId });
        return NextResponse.json({
          message: "Lock has expired. Please try again.", 
          success: false, 
          status: 400
        });
      }

      // If lock is valid, create new order
      const newOrder = await Order.create({
        product: productId,
        user: userObjectId,
        orderId: orderNumber,
        orderedAt: new Date(),
        delivered: 'undelivered',
        paid: null,
        acknowledgment: false,
        ordererName
      });

      // Delete the lock after order creation
      await Lock.deleteOne({ userId: userObjectId, productId });

      // Return success response
      return NextResponse.json({
        message: "Order created successfully.", 
        success: true, 
        status: 200
      });
    }

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      message: "Something went wrong in form submission, please try again later.", 
      success: false, 
      status: 500
    });
  }
};
