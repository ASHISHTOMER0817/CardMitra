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
		<div className="overflow-hidden rounded-2xl">
		<div className="overflow-x-auto bg-white shadow-md rounded-[8px] text-sm">
			{!orders ? (
				<Loader />
			) : orders.length > 0 ? (
				<table className=" min-w-full divide-y divide-gray-200 text-nowrap">
					<thead>
						<tr className="bg-green-100">
							<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
								User
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
								Order ID
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
								Order
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
								Status
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr
								key={index}
								className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
							>
								<td className="py-4 px-12 font-semibold text-primaryBgClr">
									{order.user.name}
								</td>
								<td className="py-4 px-12 text-gray-500">
									{order._id}
								</td>
								<td className="py-4 px-12 text-gray-500">
									{new Date(
										order.orderedAt
									).toDateString()}
								</td>
								<td className="py-4 px-12 text-gray-500">
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
		</div>
		</div>
	);
};

export default ProductOrderList;
