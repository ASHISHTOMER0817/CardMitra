import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";
import productList, { order, otp } from "@/interface/productList";
import StatusBadge from "./StatusBadge";

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
		<Link
			className="cursor-pointer"
			href={
				delivered !== "cancelled" && delivered !== "delivered"
					? `/odrHistory/${_id}`
					: ""
			}
		>
			<CardLayout
				placeOrder={
					otp && delivered === "undelivered" ? (
						<StatusBadge status={"OTP submitted"} />
					) : (
						<StatusBadge status={delivered} />
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
