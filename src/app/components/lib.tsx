import { Order } from "@/models/userModel";
import dateFormat from "./dateFormat";
import Image from "next/image";
import transactions from "@/../public/transactions.svg";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
dayjs.extend(utc)

//today's date
export const todaysDate = dateFormat(new Date());

export default async function ordersToday() {
	const noOfDelivery = await Order.find({ deliveryDate: todaysDate })
		.populate("user")
		.sort({ otp: 1 });
	console.log(todaysDate, noOfDelivery);
	return { deliveries: noOfDelivery.length, noOfDelivery };
}

// export const hello = amazon;
export const Transactions = () => {
	return (
		<Image
			src={transactions}
			className="min-w-[30px] min-h-7"
			alt={""}
		/>
	);
};

export function convertDates(initial: string, last: string) {
	let startDate;
	let endDate;
	// console.log(typeof initial, typeof last, initial, last);
    
	if (!initial) {
	  startDate = dayjs().startOf("day").local()
	} else {
	  startDate = dayjs(new Date(initial)).startOf('day').local()
	}
    
	// console.log(startDate.toDate());
    
	if (!last) {
	  endDate = startDate.endOf("day").local()
	} else {
	  endDate = dayjs(new Date(last)).endOf("day").local();
	}
    
	console.log(endDate.toDate());
    
	console.log("Start Date (IST):", startDate);
	console.log("End Date (IST):", endDate);
	console.log("-----------------------------------------------------------------------------------------------------");
    
	return { startDate,endDate };
    }
