// import axios from "axios";
import React, { useState } from "react";
// import Popup from "./Popup";
import { order } from "@/interface/productList";
// import dateFormat from "./dateFormat";
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
		<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
			<thead>
				<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
					<th className="py-6 px-12 text-left sm:pr-0.5 sm:pl-2 sm:py-1">
						Order ID
					</th>
					<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
						Delivery Date
					</th>
					<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
						Order Date
					</th>
					<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
						Product Name
					</th>
					<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
						Price
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map(
					(
						{
							deliveryDate,
							product,
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
								className="even:bg-gray-100 sm:text-[8px]"
							>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1 text-gray-500">
									{orderId}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1">
									{deliveryDate}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1">
									{new Date(
										orderedAt
									).toDateString()}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1 text-primaryBgClr">
									{product.name}
								</td>
								<td className="py-4 px-12 sm:px-0.5 sm:py-1 font-semibold">
									{product.price}
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
