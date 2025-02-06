import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Order, Transactions, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import { order } from "@/interface/productList";

Database();

export async function getBalance(userId: string){
//      Database()

      const orderList = await Order.find({ user: userId }).populate({path:"product", select:"-image"})

      const delivered_orders = orderList.filter((order)=>order.delivered == 'delivered');
      const delivered_orders_sum = delivered_orders.reduce((acc, odr)=>{
            acc += odr.product.price+odr.product.commission;
            return acc;
      }, 0);

      const transactions = await Transactions.find({user: userId});
      const transaction_sum = transactions.reduce((acc, curr)=>{
            acc += curr.amount;
            return acc;
      }, 0);
            console.log(delivered_orders_sum, transaction_sum)
      const finalBalance = delivered_orders_sum - transaction_sum;

      return finalBalance || 0;
}

export async function GET(req: NextRequest) {
      try {
           const _id = req.nextUrl.searchParams.get("userId")
           const user = await User.findOne({_id});
            const orderList = await Order.find({ user: _id }).populate({path:"product", select:"-image"})
            const balance = _id ? await getBalance(_id) : 0;

            return NextResponse.json({message: "showing user details", success: true, data:{user, orderList, balance} })
      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}



// export async function GET(request: NextRequest) {
//       try {
//             const searchparams = request.nextUrl.searchParams

//             // Searchparams
//             let userId = searchparams.get('query')
//             const adminSideUserId = userId;

//             let amount = searchparams.get('paid')
//             let orderList;

//             if (!userId || userId === 'basicInfo') {
//                   const { _id } = await GetToken()
//                   if (!userId) userId = _id;
//                   else {
//                         const user = await User.findOne({ _id: _id })
//                         // console.log('basicinfo', user)
//                         return NextResponse.json({
//                               message: "Returning basic info about the user", success: true, data: user
//                         })

//                   }
//             }

//             const user = await User.findOne({ _id: userId })
//             if (!user) return NextResponse.json({ message: "User not found", success: false });
//             // console.log('user name:-',user.name)
//             orderList = await Order.find({ user: userId }).populate({path:"product", select:"-image"})

//             // Current amount to pay
//             let total = 0;
//             let totalUnVerifiedAmt = 0;

//             // for (const order of orderList) {
//             //       const { delivered, paid, product } = order;
//             //       if (paid === null) {
//             //           if (delivered === 'delivered') total += product.price + product.commission;
//             //           if (delivered === 'unverified') totalUnVerifiedAmt += product.price + product.commission;
//             //       }
//             // }





//             let totalProductPrice = 0;
//             for (const order of orderList) {
//                   const {  product, orderedAt } = order;
//                   if(orderedAt < new Date('2025-01-10T00:00:00Z').getTime()){
//                         console.log(product.name, 'this is the date type')

//                         totalProductPrice+=   product.price + product.commission;
//                   }

//                   // if (paid === null) {
//                   //     if (delivered === 'delivered') total += product.price + product.commission;
//                   //     if (delivered === 'unverified') totalUnVerifiedAmt += product.price + product.commission;
//                   // }
//             }
//             console.log('this is total Product price:-',totalProductPrice, 'amount user has been paid:-',user.paid, "amount due:-", user.unpaid,  'total of paid, unpaid:- ', user.paid + user.unpaid)






//             console.log(total, 'these are some')

//             const totalAmt = user.unpaid + total
//             const verifiedAmt = totalAmt
//             const unpaid = user.unpaid

//             let deliveredData = { user, orderList, totalAmt, unpaid }
//             // console.log('complete data', deliveredData)

//             if (amount && +amount > 0) {
//                   // console.log(amount)
//                   orderList = await Order.updateMany(
//                         { user: userId, delivered: 'delivered', paid: null },
//                         { $set: { paid: new Date() } }
//                   );

//                   user.unpaid = totalAmt - +amount!
//                   user.paid += +amount!
//                   await user.save()
//                   Transactions.create({
//                         user: userId,
//                         dateOfPayment: new Date(),
//                         amount: +amount!
//                   })

//                   // Delete and add updated totalAmt to deliveryData
//                   delete deliveredData.totalAmt;
//                   deliveredData.totalAmt = user.unpaid

//                   return NextResponse.json({
//                         message: `${amount} paid to ${user.name}`, success: true, status: 250, data: deliveredData
//                   })
//             }
//             else {
//                   return NextResponse.json({
//                         message: "List of Transactions ", success: true, data: !adminSideUserId ? { user, verifiedAmt, totalUnVerifiedAmt } : { user, orderList, totalAmt, unpaid }
//                   })
//             }

//       } catch {
//             return NextResponse.json({
//                   message: "Something went wrong, please try again later", success: false
//             })
//       }

// }