import React, { useState, useEffect } from "react";

interface Order {
	affiliateName: string;
	orderId: string;
	date: Date;
	time: Date;
	orderStatus: string;
}

const OrderTable = () => {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		// Simulating data from the backend
		const mockData: Order[] = [
			{
				affiliateName: "Affiliate 1",
				orderId: "ORD001",
				date: new Date("2023-04-22"),
				time: new Date("2023-04-22T10:30:00"),
				orderStatus: "Pending",
			},
			{
				affiliateName: "Affiliate 2",
				orderId: "ORD002",
				date: new Date("2023-04-21"),
				time: new Date("2023-04-21T14:45:00"),
				orderStatus: "Completed",
			},
			{
				affiliateName: "Affiliate 3",
				orderId: "ORD003",
				date: new Date("2023-04-20"),
				time: new Date("2023-04-20T09:15:00"),
				orderStatus: "Cancelled",
			},
		];

		setOrders(mockData);
	}, []);

	return (
			<table className="w-full rounded-2xl overflow-hidden">
				<thead>
					<tr className="bg-gray-200">
						<th className="py-6 px-12 text-left">
							Affiliate Name
						</th>
						<th className="py-6 px-12 text-left">
							Order ID
						</th>
						<th className="py-6 px-12 text-left">
							Date
						</th>
						<th className="py-6 px-12 text-left">
							Time
						</th>
						<th className="py-6 px-12 text-left">
							Order Status
						</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order, index) => (
						<tr
							key={index}
							className="even:bg-gray-100"
						>
							<td className="py-4 px-12">
								{order.affiliateName}
							</td>
							<td className="py-4 px-12">
								{order.orderId}
							</td>
							<td className="py-4 px-12">
								{order.date.toLocaleDateString()}
							</td>
							<td className="py-4 px-12">
								{order.time.toLocaleTimeString()}
							</td>
							<td className="py-4 px-12">
								{order.orderStatus}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		
	);
};

export default OrderTable;
