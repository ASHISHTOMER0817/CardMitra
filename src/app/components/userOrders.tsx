// import axios from "axios";
import React, { useState } from "react";
// import Popup from "./Popup";
import { order } from "@/interface/productList";
// import dateFormat from "./dateFormat";
import userOrdersListRow from "./userOrdersListRow";
import UserOrdersListRow from "./userOrdersListRow";
const UserOrders = ({
	data,
	listType,
}: {
	data: order[];
	listType: string;
}) => {
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
		<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap rounded-small">
			<thead>
				<tr className="bg-green-100 text-[#2f4f4f] sm:text-[10px]">
					<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
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
					({
						deliveryDate,
						product,
						orderedAt,
						orderId,
						delivered,
					}) =>
						// index
						{
							// const date = new Date(deliveryDate);
							// let delivery = dateFormat(date);
							// const orderDate = new Date(orderedAt);
							// let order_at = dateFormat(orderDate);

							return (
								<>
									{listType ===
										delivered && (
										<UserOrdersListRow
											orderId={
												orderId
											}
											deliveryDate={
												deliveryDate
											}
											orderedAt={new Date(
												orderedAt
											).toDateString()}
											product={
												product
											}
										/>
									)}{" "}
								</>
							);
						}
				)}
			</tbody>
		</table>
	);
};

export default UserOrders;
