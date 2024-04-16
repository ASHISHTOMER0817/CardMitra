import React, { useState } from "react";
import CardLayout from "./CardLayout";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface orderHistory {
	order: {
		name: string
		price: number
		commission: number
	};
	// quantity: number;
	orderNumber:string
}

const OrderHistory = ({ data }: { data: orderHistory[] }) => {
	const router = useRouter();
	// function submitOTP(submitOTP:string) {
	// 	router.push(`/odrHistory/${submitOTP}`);
	// }
	return (
		<>
			{data.map(({ order, orderNumber}, index) => {
				return (
					<Link key={index} href={`/odrHistory/${orderNumber}`}>
						<CardLayout
							quantity={0}
							name={order.name}
							randomNo={65456141161}
							price={order.price}
							commission={order.commission}
						/>
					</Link>
				);
			})}
		</>
	);
};

export default OrderHistory;
