import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";
import { order } from "@/interface/productList";

const OrderHistory = ({ data }: { data: order[] }) => {

	return (
		<>
			{data.map(({ product, _id, otp}, index) => {
				return (
					<Link key={index} className="cursor-pointer" href={`/odrHistory/${_id}`}>
						<CardLayout
							placeOrder={otp && <div className="mx-auto text-gray-500">OTP submitted</div>}
							quantity={product?.requirement}
							name={product?.name}
							price={product?.price}
							commission={product?.commission}
							classList="hover:border-blue-400" site={product.site} deviceImage={product.image} cards={product.cards}						/>
					</Link>
				);
			})}
		</>
	);
};

export default OrderHistory;
