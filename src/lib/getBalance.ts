import { Order, Transactions } from "@/models/userModel";
import mongoose from "mongoose";


export default async function getBalance(userId: mongoose.Types.ObjectId){
      // console.log(userId)
      const filterDate = new Date("2025-01-10T00:00:00.000Z");

      const orderTotal = await Order.aggregate([
            { $match: { user: userId, delivered: "delivered", orderedAt: { $gt: filterDate } } }, // Filter only delivered orders
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
          // console.log('this is order total', orderTotal)
          const delivered_orders_sum = orderTotal.length > 0 ? orderTotal[0].totalSum : 0;

      const transactionTotal = await Transactions.aggregate([
            { $match: { user: userId, dateOfPayment: { $gt: filterDate } } }, // Filter transactions for the user
            {
              $group: {
                _id: null,
                totalSum: { $sum: "$amount" } // Sum the "amount" field
              }
            }
          ]);
          // console.log('this is transactions total', transactionTotal)

          const transaction_sum = transactionTotal.length > 0 ? transactionTotal[0].totalSum : 0;
      const finalBalance = delivered_orders_sum - transaction_sum;

      return finalBalance || 0;
}