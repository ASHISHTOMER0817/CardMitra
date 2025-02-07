import { Order, Transactions } from "@/models/userModel";


export default async function getBalance(userId: string){

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