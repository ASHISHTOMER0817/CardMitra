import { Order } from "@/models/userModel";
import dateFormat from "./dateFormat";
// import { User } from "@/models/userModel";
import Image from "next/image";
// import multer from "multer";
// import path from "path";
// import fs from "fs";
import transactions from "@/../public/transactions.svg";
import amazon from "@/../public/static/amazon.svg";
import flipkart from "@/../public/static/flipkart.svg";
import jiomart from "@/../public/static/jiomart.png";
import shopsy from "@/../public/static/shopsy.jpg";
import vivo from "@/../public/static/vivo.webp";
import oppo from "@/../public/static/oppo.png";
import mi from "@/../public/static/mi.jpg";
import samsung from "@/../public/static/samsung.png";

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




