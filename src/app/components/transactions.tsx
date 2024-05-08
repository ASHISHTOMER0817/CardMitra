'use client'
import { transactions } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import dateFormat from "./dateFormat";

const Transactions = ({
	userPage,
	_id,
}: {
	userPage: boolean;
	_id?: string;
}) => {
	const [data, setData] = useState<transactions[]>([]);
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/transactions?userPage=${userPage}&_id=${_id}`
				);
				if (response.data.success) {
					setData(response.data.data);
				} else {
					Popup("error", response.data.message);
				}
			} catch {
				Popup("error", "Something missing, refresh the page");
			}
		}
		getData();
	}, [_id, userPage]);

	return (
		<>
			{data.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden">
					<thead>
						<tr className="bg-gray-200">
							<th className="py-6 px-12 text-left">
								Transaction ID
							</th>
							{userPage.toString() === 'false' && (
								<th className="py-6 px-12 text-left">
									User name
								</th>
							)}
							{/* {heading} */}
							<th className="py-6 px-12 text-left">
								Date
							</th>

							<th className="py-6 px-12 text-left">
								Amount Paid
							</th>
						</tr>
					</thead>
					<tbody>
						{data.map(
							(
								{
									user,
									dateOfPayment,
									_id,
									amount,
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
											{_id}
										</td>
										{userPage.toString() === "false" && (
											<td className="py-4 px-12">
												{
													user.name
												}
											</td>
										)}
										<td className="py-4 px-12">
											{
											dateFormat(new Date(dateOfPayment))	
											}
										</td>

										<td className="py-4 px-12">
											{amount}
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			) : (
				<div className="text-red-500 ">No data to show !!</div>
			)}
		</>
	);
};

export default Transactions;
