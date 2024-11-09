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
	paid,
}: {
	product: productList
	_id: string
	otp: string
	delivered: string
	paid: null | Date
}) => {
	// function deliveryStatus(returnValue: string) {
	// 	if (
	// 		delivered !== "cancelled" &&
	// 		delivered !== "delivered" &&
	// 		delivered !== "unverified"
	// 	) {
	// 		return returnValue;
	// 	} else {
	// 		return "";
	// 	}
	// }

	// console.log(data[0]?.product?.site)
	return (
		<Link
			className="cursor-pointer "
			// style={{ boxShadow:  }}
			// href={deliveryStatus(`/odrHistory/${_id}`)}
			href={`/odrHistory/${_id}`}
		>
			<CardLayout
				placeOrder={
					otp && otp !=='false' && delivered === "undelivered" ? (
						<StatusBadge status={"OTP submitted"} />
					) : paid && delivered === "delivered" ? (
						<StatusBadge
							paid={paid}
							status={delivered}
						/>
					) : (
						<StatusBadge status={delivered} />
					)
				}
				quantity={1}
				name={product?.name}
				price={product?.price}
				commission={product?.commission}
				// classList={`${deliveryStatus(
				// 	"hover:border-primaryBgClr "
				// )} custom_shadow`}
				classList={`
					hover:border-primaryBgClr custom_shadow`}
				site={product?.site}
				deviceImage={product?.image}
				cards={product?.cards}
			/>
		</Link>
	);
};

export default OrderHistory;
