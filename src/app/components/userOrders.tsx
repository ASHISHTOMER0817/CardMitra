import axios from "axios";
import React, { useState } from "react";
// import Popup from "./Popup";
import { order } from "@/interface/productList";
import dateFormat from "./dateFormat";
const UserOrders = ({ data }: { data: order[] }) => {
	// const [datas, setDatas] = useState<order[]>(data)

	// useEffect(()=>{
	//       async function getData(){
	//             try{
	//                   const response = await axios.get(`/api/users/orders?objectId=${objectId}`)
	//                   setData(response.data.data)
	//             }catch{
	//                   Popup("error", "something went wrong, please REFRESH")
	//                   console.log("something went wrong, please REFRESH")
	//             }
	//       }
	// })
	return (
			<table className="w-full rounded-2xl overflow-hidden">
				<thead>
					<tr className="bg-gray-200">
						<th className="py-6 px-12 text-left">
							Order ID
						</th>
						<th className="py-6 px-12 text-left">
							Delivery Date
						</th>
						<th className="py-6 px-12 text-left">
							delivery Status
						</th>

						<th className="py-6 px-12 text-left">
							Order Date
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map(
						(
							{
								deliveryDate,
								delivered,
								orderedAt,
								orderId,
							},
							index
						) => {
							// const date = new Date(deliveryDate);
							// let delivery = dateFormat(date);
							// const orderDate = new Date(orderedAt);
							// let order_at = dateFormat(orderDate);

							return (
								<tr
									key={index}
									className="even:bg-gray-100"
								>
									<td className="py-4 px-12">
										{orderId}
									</td>
									<td className="py-4 px-12">
										{deliveryDate}
									</td>
									<td className="py-4 px-12">
										{delivered
											? "Delivered"
											: "Pending"}
									</td>

									<td className="py-4 px-12">
										{orderedAt}
									</td>
								</tr>
							);
						}
					)}
				</tbody>
			</table>
	);
};

export default UserOrders;
