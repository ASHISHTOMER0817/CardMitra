import axios from "axios";
import React from "react";
// import Popup from "./Popup";
import { order } from "@/interface/productList";
import dateFormat from "./dateFormat";
const UserOrders = ({ data }: { data: order[] }) => {
	// const [data, setData] = useState()

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
		<div className="mx-24">
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
						{/* <th className="py-6 px-12 text-left">
							Time
						</th> */}
						<th className="py-6 px-12 text-left">
							Order Date
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map(({deliveryDate,
							delivered,
							orderedAt, orderId},
							index
						) =>{
                                        const date = new Date(deliveryDate)  
                                          let delivery = dateFormat(date)
                                          
                                          
                                          
                                          return  (
							<tr
								key={index}
								className="even:bg-gray-100"
							>
								<td className="py-4 px-12">
									{orderId}
								</td>
								<td className="py-4 px-12">
									{delivery}
								</td>
								<td className="py-4 px-12">
									{delivered? 'Delivered':'Pending'}
								</td>
								{/* <td className="py-4 px-12">
									{}
								</td> */}
								<td className="py-4 px-12">
									{orderedAt}
								</td>
							</tr>
						)}
					)}
				</tbody>
			</table>
		</div>
	);
};

export default UserOrders;
