import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";
import React, { Suspense } from "react";

const AdminTransactions = () => {
	// const [data, setData] = useState<transactions[]>([]);
	// useEffect(() => {
	// 	async function getData() {
	// 		try {
	// 			const response = await axios.get(
	// 				"/api/admin/transactions"
	// 			);
	// 			if (response.data.success) {
	// 				setData(response.data.data);
	// 			} else {
	// 				Popup("error", response.data.message);
	// 			}
	// 		} catch {
	// 			Popup("error", "Something missing, refresh the page");
	// 		}
	// 	}
	// 	getData();
	// }, []);

	return (
		// <table className="w-full rounded-2xl overflow-hidden">
		// 	<thead>
		// 		<tr className="bg-gray-200">
		// 			<th className="py-6 px-12 text-left">
		// 				Transaction ID
		// 			</th>
		// 			<th className="py-6 px-12 text-left">
		// 				User name
		// 			</th>
		// 			<th className="py-6 px-12 text-left">Date</th>

		// 			<th className="py-6 px-12 text-left">
		// 				Amount Paid
		// 			</th>
		// 		</tr>
		// 	</thead>
		// 	<tbody>
		// 		{data.map(
		// 			({ user, dateOfPayment, _id, amount }, index) => {
		// 				// const date = new Date(deliveryDate);
		// 				// let delivery = dateFormat(date);
		// 				// const orderDate = new Date(orderedAt);
		// 				// let order_at = dateFormat(orderDate);

		// 				return (
		// 					<tr
		// 						key={index}
		// 						className="even:bg-gray-100"
		// 					>
		// 						<td className="py-4 px-12">
		// 							{_id}
		// 						</td>
		// 						<td className="py-4 px-12">
		// 							{user.name}
		// 						</td>
		// 						<td className="py-4 px-12">
		// 							{dateOfPayment}
		// 						</td>

		// 						<td className="py-4 px-12">
		// 							{amount}
		// 						</td>
		// 					</tr>
		// 				);
		// 			}
		// 		)}
		// 	</tbody>
		// </table>

		<div className="w-[85%] mx-auto mt-6 ">
			<h3 className="font-semibold my-12">Transactions</h3>
		{/* <Suspense fallback={<Loader />}> */}
			<Transactions userPage={false} />
		{/* </Suspense> */}
		</div>
	);
};

export default AdminTransactions;
