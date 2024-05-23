"use client";
import { transactions } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import dateFormat from "./dateFormat";
import Loader from "./loader";

const Transactions = ({
	// userPage,
	_id,
}: {
	// userPage: boolean;
	_id: string;
}) => {
	const [data, setData] = useState<transactions[]>();
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/transactions?_id=${_id}`
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
	}, [_id]);

	return (
		<>
			{!data ? (
				<Loader />
			) : data.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
					<thead>
						<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
							<th className="py-6 px-12 text-left sm:pr-0.5 sm:pl-2 sm:py-1">
								Transaction ID
							</th>
							{!_id && (
								<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
									User name
								</th>
							)}
							{/* {heading} */}
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Date
							</th>

							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
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
										className="even:bg-gray-100 sm:text-[8px]"
									>
										<td className="py-4 px-12 text-sm sm:text-[8px] sm:px-0.5 sm:py-1">
											{_id}
										</td>
										{!_id && (
											<td className="py-4 px-12 font-semibold sm:px-0.5 sm:py-1">
												{
													user.name
												}
											</td>
										)}
										<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
											{dateFormat(
												new Date(
													dateOfPayment
												)
											)}
										</td>

										<td className="py-4 px-12 text-primaryBgClr sm:px-0.5 sm:py-1">
											{amount}
										</td>
									</tr>
								);
							}
						)}
					</tbody>
				</table>
			) : (
				<div className="text-red-500 font-serif mx-auto mt-20 w-fit sm:text-[10px]">
					No data to show !!
				</div>
			)}
		</>
	);
};

export default Transactions;
