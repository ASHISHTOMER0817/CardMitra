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
            console.log('thisis userId', userId)
            const adminSideUserId = userId;
            console.log('passing value', adminSideUserId)
            // const listType = searchparams.get('listType')
            let amount = searchparams.get('paid')
            let orderList;

            if (!userId) {
                  const { role, _id } = await GetToken()
                  // console.log('if condtion')
                  // console.log(role, _id)
                  userId = _id
                  // if (role === 'user') {
                  //       console.log('this is user')
                  //       // const userInfo = await User.findOne({ _id: _id })
                  //       // console.log(userInfo)
                  //       // return NextResponse.json({
                  //       //       message: 'here is your details', data: userInfo, success: true
                  //       // })
                  // }
            }
            const user = await User.findOne({ _id: userId })

            orderList = await Order.find({ user: userId }).populate("product")

            // Current amount to pay
            let total = 0;
            let totalUnVerifiedAmt = 0;
            if (orderList.length > 0) {
                  for (let i = 0; i < orderList.length; i++) {
                        if (orderList[i].delivered === 'delivered' && orderList[i].paid === false) {
                              total += orderList[i].product.price;
                        }
                        if (orderList[i].delivered === 'un-verified' && orderList[i].paid === false) {
                              totalUnVerifiedAmt += orderList[i].product.price;
                        }
                  }
            }
            const totalAmt = user.unpaid + total
            const verifiedAmt = totalAmt
            const unpaid = user.unpaid
            // console.log(totalAmt, unpaid, 'these are some')

            let deliveredData = { user, orderList, totalAmt, unpaid }
            // console.log('complete data', deliveredData)

            if (amount && +amount > 0) {
                  orderList = await Order.updateMany(
                        { user: userId, delivered: 'undelivered', paid: false },
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
            else {
                  console.log('else condition')
                  return NextResponse.json({
                        message: "List of Transactions ", success: true, data: !adminSideUserId ? { user, verifiedAmt, totalUnVerifiedAmt } : { user, orderList, totalAmt, unpaid }
                  })
            }

      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}