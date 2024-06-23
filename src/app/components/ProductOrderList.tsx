import axios from "axios";
import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { order } from "@/interface/productList";
import Loader from "./loader";
import StatusBadge from "./StatusBadge";

const ProductOrderList = ({ _id }: { _id: string }) => {
	const [orders, setOrders] = useState<order[]>();

	useEffect(() => {
		async function getData() {
			try {
				console.log("productOrderList", _id);
				const response = await axios.get(
					`/api/users/orderData?productId=${_id}`
				);
				setOrders(response.data.data);
				console.log(response.data.data);
			} catch {
				Popup("error", "Something went wrong, please refresh");
			}
		}
		getData();
	}, [_id]);

	return (
		<>
			{!orders ? (
				<Loader />
			) : orders.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
					<thead>
						<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								User
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Order ID
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Order
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Delivery
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr
								key={index}
								className="even:bg-gray-100 sm:text-[8px]"
							>
								<td className="py-4 px-12 text-primaryBgClr sm:px-0.5 sm:py-1">
									{order.user.name}
								</td>
								<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
									{order._id}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1">
									{new Date(
										order.orderedAt
									).toDateString()}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1">
									{order.deliveryDate}
								</td>
								<td className="py-4 px-12 font-semibold sm:px-0.5 sm:py-1">
									<StatusBadge
										status={
											order.delivered
										}
									/>
									{/* {order.delivered} */}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<div className="mt-24 mx-auto text-red-500 font-serif">
					No order has been placed yet...
				</div>
			)}
		</>
	);
};

export default ProductOrderList;
