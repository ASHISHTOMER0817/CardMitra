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
            // let deleteUser = searchparams.get('delete')
            // let disApprove = searchparams.get('dis_approve')
            // if(deleteUser){}
            // // if(disApprove){
            // //       const user
            // // }
            console.log('thisis userId', userId)
            const adminSideUserId = userId;
            console.log('passing value', adminSideUserId)
            // const listType = searchparams.get('listType')
            let amount = searchparams.get('paid')
            let orderList;

            if (!userId || userId === 'basicInfo') {
                  const { _id } = await GetToken()
                  if (!userId) userId = _id
                  else {
                        const user = await User.findOne({ _id: _id })
                        console.log('basicinfo', user)
                        return NextResponse.json({
                              message: "Returning basic info about the user", success: true, data: user
                        })

                  }
            }

            const user = await User.findOne({ _id: userId })
            if (!user) return NextResponse.json({ message: "User not found", success: false });

            orderList = await Order.find({ user: userId }).populate({path:"product", select:"-image"})

            // Current amount to pay
            let total = 0;
            let totalUnVerifiedAmt = 0;

            for (const order of orderList) {
                  const { delivered, paid, product } = order;
                  if (paid === null) {
                      if (delivered === 'delivered') total += product.price + product.commission;
                      if (delivered === 'unverified') totalUnVerifiedAmt += product.price + product.commission;
                  }
            }

            const totalAmt = user.unpaid + total
            const verifiedAmt = totalAmt
            const unpaid = user.unpaid
            // console.log(totalAmt, unpaid, 'these are some')

            let deliveredData = { user, orderList, totalAmt, unpaid }
            // console.log('complete data', deliveredData)

            if (amount && +amount > 0) {
                  console.log(amount)
                  orderList = await Order.updateMany(
                        { user: userId, delivered: 'delivered', paid: null },
                        { $set: { paid: new Date() } }
                  );

                  console.log(orderList)
                  // console.log('this is -- ', userId, '--', totalAmt - +amount!)
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