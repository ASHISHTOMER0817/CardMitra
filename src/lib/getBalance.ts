import { Order, Transactions } from "@/models/userModel";
import mongoose from "mongoose";


export default async function getBalance(userId: mongoose.Types.ObjectId){
      console.log(userId)
      const orderTotal = await Order.aggregate([
            { $match: { user: userId, delivered: "delivered" } }, // Filter only delivered orders
            {
              $lookup: {  // Join with the Product collection
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productDetails"
              }
            },
            { $unwind: "$productDetails" }, // Convert product array into object
            {
              $group: {
                _id: null,
                totalSum: { $sum: { $add: ["$productDetails.price", "$productDetails.commission"] } }
              }
            }
          ]);
          console.log('this is order total', orderTotal)
          const delivered_orders_sum = orderTotal.length > 0 ? orderTotal[0].totalSum : 0;
      const transactionTotal = await Transactions.aggregate([
            { $match: { user: userId } }, // Filter transactions for the user
            {
              $group: {
                _id: null,
                totalSum: { $sum: "$amount" } // Sum the "amount" field
              }
            }
          ]);
          console.log('this is transactions total', transactionTotal)

          const transaction_sum = transactionTotal.length > 0 ? transactionTotal[0].totalSum : 0;
      const finalBalance = delivered_orders_sum - transaction_sum;

      return finalBalance || 0;
}








      // const orderList = await Order.find({ user: userId }).populate({path:"product", select:"-image"})

      // const delivered_orders = orderList.filter((order)=>order.delivered == 'delivered');
      // const delivered_orders_sum = delivered_orders.reduce((acc, odr)=>{
      //       acc += odr.product.price+odr.product.commission;
      //       return acc;
      // }, 0);







      

      // const transactions = await Transactions.find({user: userId});
      // const transaction_sum = transactions.reduce((acc, curr)=>{
      //       acc += curr.amount;
      //       return acc;
      // }, 0);


