import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import { Product } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            const searchparams = request.nextUrl.searchParams

            // Searchparams
            const _id = searchparams.get('query')
            const listType = searchparams.get('listType')
            const amount = searchparams.get('paid')
            const user = await User.findOne({ _id })

            let orderList;

            orderList = await Order.find({ user: _id, delivered: true, paid: false }).populate("product")

            // Current amount to pay
            let total = 0;
            for (let i = 0; i < orderList.length; i++) {
                  total += orderList[i].product.price;
            }
            const totalAmt = user.unpaid + total;

            if (listType === "delivered") {
                  const data = { user, orderList, totalAmt }
                  console.log(totalAmt)
                  return NextResponse.json({
                        message: "delivered is being shown", data: data, success: true
                  })
            } else if (listType === "nonDelivered") {
                  orderList = await Order.find({ user: _id, delivered: false })
                  const data = { user, orderList }
                  console.log(user, orderList, 'HMM these are nonDelivred',)
                  return NextResponse.json({
                        message: "nonDelivered is being shown", data: data, success: true
                  })
            } else if (listType === "reduce") {
                  orderList = await Order.updateMany(
                        { user: _id, delivered: true, paid: false },
                        { $set: { paid: true } }
                  );
                  user.unpaid += totalAmt - +amount!
                  user.paid += +amount!
                  user.save()
                  return NextResponse.json({
                        message: "Paid to user, Status updated", success:true, status: 250
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}