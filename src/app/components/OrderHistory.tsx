import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";


interface orderHistory {
	product: {
		_id:string
		name: string
		price: number
		commission: number
	};
	orderId:string,
	_id:string
}

const OrderHistory = ({ data }: { data: orderHistory[] }) => {

	return (
		<>
			{data.map(({ product, _id}, index) => {
				return (
					<Link key={index} className="cursor-pointer" href={`/odrHistory/${_id}`}>
						<CardLayout
							quantity={0}
							name={product?.name}
							randomNo={65456141161}
							price={product?.price}
							commission={product?.commission}
							classList="hover:border-blue-400"
						/>
					</Link>
				);
			})}
		</>
	);
};

export default OrderHistory;
