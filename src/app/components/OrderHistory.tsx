import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";
import { order } from "@/interface/productList";

const OrderHistory = ({ data }: { data: order[] }) => {
	return (
		<>
			{data.map(({ product, _id, otp, delivered }, index) => {
				return (
					<Link
						key={index}
						className="cursor-pointer"
						href={`/odrHistory/${_id}`}
					>
						<CardLayout
							placeOrder={
								otp ? (
									delivered ? (
										<div className="mx-auto bg-green-200 rounded-full px-3 py-0.5 text-green-700">
											Delivered
										</div>
									) : (
										<div className="mx-auto bg-orange-200 rounded-full px-2 py-1 text-orange-700">
											OTP submitted
										</div>
									)
								) : (
									""
								)
							}
							quantity={product?.requirement}
							name={product?.name}
							price={product?.price}
							commission={product?.commission}
							classList="hover:border-primaryBgClr"
							site={product.site}
							deviceImage={product.image}
							cards={product.cards}
						/>
					</Link>
				);
			})}
		</>
	);
};

export default OrderHistory;
