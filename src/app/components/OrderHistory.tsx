import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";
import productList, { order, otp } from "@/interface/productList";

const OrderHistory = ({
	product,
	_id,
	otp,
	delivered,
}: {
	product: productList;
	_id: string;
	otp: boolean;
	delivered: string;
}) => {
	// console.log(data[0]?.product?.site)
	return (
		<Link className="cursor-pointer" href={`/odrHistory/${_id}`}>
			<CardLayout
				placeOrder={
					otp && delivered === "undelivered" ? (
						<div className="mx-auto bg-orange-200 rounded-full px-2 py-1 text-orange-700">
							OTP submitted
						</div>
					) : (
						<div className="mx-auto bg-green-200 rounded-full px-3 py-0.5 text-green-700">
							{delivered}
						</div>
					)
				}
				quantity={product?.requirement}
				name={product?.name}
				price={product?.price}
				commission={product?.commission}
				classList="hover:border-primaryBgClr"
				site={product?.site}
				deviceImage={product?.image}
				cards={product?.cards}
			/>
		</Link>
	);
};

export default OrderHistory;
