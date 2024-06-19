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
	const userId = _id;

	return (
		<>
			{!data ? (
				<Loader />
			) : data.length > 0 ? (
				<div className="" style={{overflow: 'auto'}}>
					<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
						<thead>
							<tr className="bg-green-100 text-[#2f4f4f] sm:text-[12px]">
								<th className="p-3 text-left  sm:px-2 sm:py-2">
									Transaction ID
								</th>
								{!userId && (
									<th className="p-3 text-left  sm:px-2 sm:py-2">
										User name
									</th>
								)}
								{/* {heading} */}
								<th className="p-3 text-left  sm:px-2 sm:py-2">
									Date
								</th>

								<th className="p-3 text-left  text-nowrap sm:px-2 sm:py-2">
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

									return (
										<tr
											key={index}
											className="even:bg-gray-100 sm:text-[12px]"
										>
											<td className="p-3 text-sm sm:px-2 sm:py-2 text-nowrap">
												{_id}
											</td>
											{!userId && (
												<td className="p-3 font-semibold sm:px-2 sm:py-2 text-nowrap">
													{
														user.name
													}
												</td>
											)}
											<td className="p-3 text-gray-500 sm:px-2 sm:py-2 text-nowrap">
												{new Date(
													dateOfPayment
												).toDateString()}
											</td>

											<td className="p-3 text-primaryBgClr sm:px-2 sm:py-2 text-nowrap">
												{amount}
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</table>
				</div>
			) : (
				<div className="text-red-500 font-serif mx-auto mt-20 w-fit sm:text-[10px]">
					No data to show !!
				</div>
			)}
		</>
	);
};

export default Transactions;
