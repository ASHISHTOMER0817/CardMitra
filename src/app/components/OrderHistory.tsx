import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Link from "next/link";
import { order } from "@/interface/productList";

const OrderHistory = ({ data }: { data: order[] }) => {

	return (
		<>
			{data.map(({ product, _id}, index) => {
				return (
					<Link key={index} className="cursor-pointer" href={`/odrHistory/${_id}`}>
						<CardLayout
							quantity={product?.requirement}
							name={product?.name}
							price={product?.price}
							commission={product?.commission}
							classList="hover:border-blue-400" site={product.site}						/>
					</Link>
				);
			})}
		</>
	);
};

export default OrderHistory;
