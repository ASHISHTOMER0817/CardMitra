import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";

Database()
export const POST = async (request: NextRequest) => {

      try {
            const reqBody = await request.json()
            const {
                  orderNumber,
                  objectId, // Include the objectId prop in the formData
                  deliveryDate
            } = reqBody.formData
            console.log(reqBody)
            const userId = GetToken()
            console.log(userId)
            if (userId) {
                  const userObjectId = new mongoose.Types.ObjectId(userId)
                  const productId = new mongoose.Types.ObjectId(objectId); // Replace with your actual product _id
                  console.log(productId)

                  const newOrder = await Order.create({
                        product: productId,
                        user: userObjectId,
                        orderId: orderNumber,
                        deliveryDate: deliveryDate,
                        otp: false,
                  })

                  console.log(newOrder)
                  return NextResponse.json({
                        message: "Details of order has been successfully saved ", success: true
                  })
            }

      } catch {
            return NextResponse.json({
                  message: "failed to fill the order form", success: false
            })
      }
}

