import { NextRequest, NextResponse } from "next/server";
import { Order, Otp, User, Product } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
// import { Product } from "@/models/userModel";
import mongoose from "mongoose";
// import { NextResponse } from 'next/server'
// import { NextRequest } from 'next/server'


Database()
export async function GET(request: NextRequest) {

      try {
            const { _id } = await getToken()
            const orderObjectId = request.nextUrl.searchParams.get('query')
            if (orderObjectId) {
                  console.log(orderObjectId, 'what is this???')
                  const otpAction = await Order.findOneAndUpdate({ _id: orderObjectId }, { $set: { acknowledgment: true } })
                  console.log(otpAction)
            }
            
            // Convert the userId string to a mongoose.Schema.Types.ObjectId object
            const userObjectId = new mongoose.Types.ObjectId(_id);
            console.log(userObjectId)
            // const immediateActionOrders = await Order.find({
            //       _id: userObjectId, $or: [
            //             { delivered: 'wrong OTP' },
            //             { delivered: 'cancelled' }
            //       ], acknowledgment: false
            // }).populate('product')
            // console.log(immediateActionOrders, 'otpaction is this')
            console.log('till here')
            const order = await Order.find({ user: userObjectId })
                  .sort({ orderedAt: -1 })
                  .populate({
                        path: 'product',
                        populate: [
                              { path: 'cards' },
                              { path: 'site' }
                        ]
                  })
                  .limit(3) // Limit the number of documents to 3
                  .lean();
                  console.log(order, "so this is order")

            const orders = order.map(order => ({
                  ...order,
                  product: {
                        ...order.product,
                        image: order.product.image ? order.product.image.toString('base64') : null,
                        cards: order.product.cards.map((card: any) => ({
                              ...card,
                              image: card.image ? card.image.toString('base64') : null
                        })),
                        site: {
                              ...order.product.site,
                              image: order.product.site?.image ? order.product.site.image.toString('base64') : null
                        }
                  }  
            }));
            console.log('these are converted', orders)
            // console.log(orderHistory[0].cards,orderHistory[0].site , 'this is orders')



            // const todaysOrders = await Order.find({ createdAt: dateFormat(new Date()) }).populate('product')
            return NextResponse.json({
                  data: orders, message: 'User data successfully retrieved', success: true
            })

      } catch (error) {
            return NextResponse.json({
                  message: 'Something is mussing, please come later', success: true
            })
      }
}