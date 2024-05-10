import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Transactions, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";

Database()

export async function GET(request: NextRequest) {
      try {
            console.log('hello')
            const searchparams = request.nextUrl.searchParams

            // Searchparams
            let userId = searchparams.get('query')
            
            const listType = searchparams.get('listType')
            const amount = searchparams.get('paid')
            const user = await User.findOne({ userId })
            // console.log(listType, userId, amount)
            console.log(user)
            let orderList;

            if(!userId){
                  const {role,_id } = await GetToken()
                  console.log('if condtion')
                  console.log(role, _id)
                  if(role === 'user'){
                        userId = _id
                  }
            }
            console.log('skip if condition')
            console.log(userId)
            orderList = await Order.find({ user: userId, delivered: true, paid: false }).populate("product")
            console.log('this is orderlist',orderList)
            // console.log('starts here', orderList)
            // Current amount to pay
            let total = 0;
            for (let i = 0; i < orderList.length; i++) {
                  total += orderList[i].product.price;
            }
            const totalAmt = user.unpaid + total
            const unpaid = user.unpaid
            console.log(totalAmt, unpaid)

            if (listType === "delivered") {
                  console.log('condition reached delivered', totalAmt, userId, listType)
                  const data = { user, orderList, totalAmt, unpaid }
                  // console.log(totalAmt)
                  return NextResponse.json({
                        message: "delivered is being shown", data: data, success: true
                  })
            } else if (listType === "nonDelivered") {
                  orderList = await Order.find({ user: userId, delivered: false }).populate("product")
                  const data = { user, orderList }
                  // console.log(user, orderList, 'HMM these are nonDelivred',)
                  return NextResponse.json({
                        message: "nonDelivered is being shown", data: data, success: true
                  })
            } else if (listType === "reduce") {
                  // const userId = new mongoose.Types.ObjectId(_id!)
                  orderList = await Order.updateMany(
                        { user: userId, delivered: true, paid: false },
                        { $set: { paid: true } }
                  );
                  console.log(orderList)
                  console.log('this is -- ',userId,'--', totalAmt - +amount!)
                  user.unpaid = totalAmt - +amount!
                  // console.log(totalAmt - +amount!)
                  user.paid += +amount!
                  user.save()
                  // const userId = new mongoose.Types.ObjectId(_id!)
                   Transactions.create({
                        user: userId,
                        dateOfPayment: new Date(),
                        amount: +amount!
                  })
                  return NextResponse.json({
                        message: "Paid to user, Status updated", success: true, status: 250
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