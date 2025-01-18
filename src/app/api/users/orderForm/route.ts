import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product, Lock, SpecialQuantity } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import dateFormat from "@/app/components/dateFormat";

Database()

export const POST = async (request: NextRequest) => {

  try {
    const reqBody = await request.json();
    const { orderNumber, ordererName, objectId } = reqBody.formData;
    const { _id } = await GetToken();

    const special = request.nextUrl.searchParams.get('special');

    if(special == 'true'){
      
      // Convert to MongoDB ObjectIds
      const userObjectId = new mongoose.Types.ObjectId(_id);
      const spec_id = new mongoose.Types.ObjectId(objectId);

      // Check if a specialQuantity exists for this user and product
      const specialQuantity = await SpecialQuantity.findOne({ _id: spec_id });

      // console.log('speci: ', specialQuantity);

      // If no specialQuantity is found, return an error
      if (!specialQuantity) {
        return NextResponse.json({
          message: "No special quantity found for this user and product.",
          success: false,
          status: 404
        });
      }

      // Check if the ordered quantity is less than the available quantity
      if (specialQuantity.orderedQuantity >= specialQuantity.quantity) {
        return NextResponse.json({
          message: "Order quantity exceeds the available special quantity.",
          success: false,
          status: 400
        });
      }

      // If lock is valid, create new order
      const newOrder = await Order.create({
        product: specialQuantity.product,
        user: userObjectId,
        orderId: orderNumber,
        orderedAt: new Date(),
        delivered: 'undelivered',
        paid: null,
        acknowledgment: false,
        ordererName
      });

      // Increment the ordered quantity in specialQuantities
      specialQuantity.orderedQuantity = (specialQuantity.orderedQuantity || 0) + 1;
      await specialQuantity.save();

      // Return success response
      return NextResponse.json({
        message: "Order created successfully.", 
        success: true, 
        status: 200
      });
    }

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
