import { Order } from "@/models/userModel";
import dateFormat from "./dateFormat";
import { User } from "@/models/userModel";


//today's date
export const todaysDate = dateFormat(new Date());

export default async function ordersToday() {
      const noOfDelivery = await Order.find({ deliveryDate: todaysDate }).populate('user').sort({otp:1});
      console.log(todaysDate,noOfDelivery)
      return { deliveries: noOfDelivery.length, noOfDelivery };
    }