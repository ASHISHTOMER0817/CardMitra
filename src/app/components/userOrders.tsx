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
		<>
			{/* <table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap rounded-small">
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
						{

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
		</table> */}
			<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">

			
			<table className="min-w-full divide-y divide-gray-200 text-nowrap">
				<thead className="bg-green-100">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider sm:px-2 sm:py-1 sm:text-[10px]">
							Order ID
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
							Date
						</th>
							
						<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
						Product
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
							Price
						</th>
					</tr>
				</thead>
				<tbody className="text-[13px]">
					{data.map(
						(
							{
								product,
								orderedAt,
								orderId,
								delivered,
							},
							index
						) => {
							return (
								<>
									{listType ===
										delivered && (
										<UserOrdersListRow
											key={index}
											orderId={
												orderId
											}
											orderedAt={new Date(
												orderedAt
											).toDateString()}
											product={
												product
											}
											index={index}
										/>
									)}{" "}
								</>
							);
						}
					)}
				</tbody>
			</table>
			</div>
		</>
	);
};

export default UserOrders;
