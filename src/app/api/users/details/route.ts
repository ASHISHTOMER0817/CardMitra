import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Transactions, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import { order } from "@/interface/productList";

Database()

export async function GET(request: NextRequest) {
      try {
            console.log('hello')
            const searchparams = request.nextUrl.searchParams

            // Searchparams
            let userId = searchparams.get('query')

            const listType = searchparams.get('listType')
            const amount = searchparams.get('paid')
            let orderList;

            if (!userId) {
                  const { role, _id } = await GetToken()
                  console.log('if condtion')
                  console.log(role, _id)
                  if (role === 'user') {
                        const userInfo = await User.findOne({_id:_id})
                        console.log(userInfo)
                        return NextResponse.json({
                              message: 'here is your details', data:userInfo, success:true
                        })
                  }
            }
            const user = await User.findOne({ _id: userId })
            // console.log(listType, userId, amount)
            console.log(user)

            // console.log('skip if condition')
            // console.log(userId)
            orderList = await Order.find({ user: userId, delivered: 'delivered', paid: false }).populate("product")
            console.log('this is orderlist', orderList)

            // Current amount to pay
            let total = 0;
            if (orderList.length > 0) {
                  for (let i = 0; i < orderList.length; i++) {
                        total += orderList[i].product.price;
                  }
            }
            const totalAmt = user.unpaid + total
            const unpaid = user.unpaid
            // console.log('lrkjghlkhf')
            // console.log(totalAmt, unpaid)

            let deliveredData = { user, orderList, totalAmt, unpaid }

            // Delivered but not paid List
            if (listType === "delivered") {
                  console.log('condition reached delivered', totalAmt, userId, listType)

                  console.log(deliveredData)
                  return NextResponse.json({
                        message: "delivered is being shown", data: deliveredData, success: true
                  })

                  // Non delivered Products list
            } else if (listType === "nonDelivered") {
                  orderList = await Order.find({ user: userId, delivered: 'undelivered' }).populate("product")
                  const data = { user, orderList }
                  return NextResponse.json({
                        message: "nonDelivered is being shown", data: data, success: true
                  })

                  // Paid to user
            } else if (listType === "reduce") {
                  orderList = await Order.updateMany(
                        { user: userId, delivered: true, paid: false },
                        { $set: { paid: true } }
                  );
                  console.log(orderList)
                  console.log('this is -- ', userId, '--', totalAmt - +amount!)
                  user.unpaid = totalAmt - +amount!
                  user.paid += +amount!
                  await user.save()
                  Transactions.create({
                        user: userId,
                        dateOfPayment: new Date(),
                        amount: +amount!
                  })

                  // Delete and add updated totalAmt to deliveryData
                  delete deliveredData.totalAmt;
                  deliveredData.totalAmt = user.unpaid

                  return NextResponse.json({
                        message: `${amount} paid to ${user.name}`, success: true, status: 250, data: deliveredData
                  })
            }
            else if (listType === 'transactions') {
                  return NextResponse.json({
                        message: "List of Transactions ", success: true, return: user
                  })
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}