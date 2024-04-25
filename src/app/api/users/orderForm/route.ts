import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Product } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import mongoose from "mongoose";
import dayjs from "dayjs";
import dateFormat from "@/app/components/dateFormat";

Database()
export const POST = async (request: NextRequest) => {

      try {
            const reqBody = await request.json()
            const {
                  orderNumber,
                  objectId,
                  deliveryDate
            } = reqBody.formData
            const userId = GetToken()
            if (userId) {

                  // Object Id 
                  const userObjectId = new mongoose.Types.ObjectId(userId)
                  const productId = new mongoose.Types.ObjectId(objectId)
                  // console.log(productId)

                  //check the requirement
                  const product = await Product.findOne({ _id:objectId })
                  console.log(product)
                  const requirement = product.requirement
                  console.log(requirement)
                  console.log(deliveryDate)

                  //Change Format
                  const delivery_date = dateFormat(deliveryDate)
                  console.log( 'delivery date',delivery_date)

                  //check if requirement fulfilled
                  if (requirement === 0) {
                        return NextResponse.json({
                              message: "Quantity got fulfilled, better luck next time", success: true, status:400
                        })
                  }
                  console.log("still workin...")

                  console.log(delivery_date)
                  // Create new Order
                  const newOrder = await Order.create({
                        product: productId,
                        user: userObjectId,
                        orderId: orderNumber,
                        deliveryDate:  delivery_date,
                        orderedAt: dateFormat(new Date()),
                        otp: false,
                  })

                  // Decrease requirement by 1
                  product.requirement = requirement - 1
                  await product.save();
                  console.log(product.requirement)

                  console.log(newOrder)
                  return NextResponse.json({
                        message: "Details of order has been successfully saved ", success: true, status: 200
                  })
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong in form submission, please try again later", success: false, status: 500
            })
      }
}

