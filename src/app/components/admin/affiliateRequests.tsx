"use client";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Image from "next/image";
import reject from "@/../public/reject.svg";
import accept from "@/../public/accept.svg";
import view from "@/../public/view.svg";
import Link from "next/link";
import acceptAffiliate from "../acceptAffiliate";
import Popup from "../Popup";
import { user } from "@/interface/productList";
import Loader from "../loader";

const AffiliateRequest = ({ heading }: { heading: string }) => {
	const [users, setUsers] = useState<user[]>();
	const [refreshData, setRefreshData] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`api/affiliate/affiliateRequest?isApproved=${heading}`
				);
				console.log(response.data.data);
				setUsers(response.data.data); // Assuming API response is an array of user objects
			} catch (error) {
				console.error(
					"Something went wrong; Please reload the page",
					error
				);
			}
		};

		fetchData();
	}, [heading, refreshData]);

	async function isAccept(choice: boolean, _id: string) {
		try {
			const response = await axios.get(
				`/api/affiliate/affiliateAcceptOrReject?choice=${choice}&objectId=${_id}`
			);
			const msg = response.data.message;
			const status = response.data.status;
			if (status === 200) {
				Popup("success", msg);
				setRefreshData(!refreshData);
			}
			if (status === 400) {
				Popup("info", msg);
				setRefreshData(!refreshData);
			}
			if (status === 500) {
				Popup("error", msg);
			}
		} catch {
			Popup("error", "Something went wrong, REFRESH");
		}
	}

	return (
		<div
			className={`${
				heading === "approved" && "w-[90%]"
			} mx-auto my-8 md:text-[10px]`}
		>
			{heading === "approved" && (
				<h3 className="font-semibold mb-4 pb-2">User List</h3>
			)}
			{/* <div className={`rounded-lg overflow-hidden ${heading ? 'border border-gray-300': '' } `}> */}
			{!users ? (
				<Loader />
			) : users.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
					<thead>
						<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
							<th className="py-6 px-12 text-left sm:pr-0.5 sm:pl-2 sm:py-1">
								Name
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Email
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Contact No
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map(
							(
								{
									name,
									email,
									contact,
									isApprove,
									_id,
								},
								index
							) => (
								<tr
									key={index}
									className="even:bg-gray-100 sm:text-[8px]"
								>
									<td className="py-4 px-12 font-semibold text-primaryBgClr sm:px-0.5 sm:py-1">
										{name}
									</td>
									<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
										{email}
									</td>
									<td className="py-4 px-12 text-gray-500 text-sm text-[8px] sm:px-0.5 sm:py-1 sm:text-[8px]">
										{contact}
									</td>
									<td className="py-4 px-12 text-gray-500 flex justify-start gap-2 sm:px-0.5 sm:py-1">
										{!isApprove ? (
											<>
												<div
													onClick={() =>
														isAccept(
															true,
															_id
														)
													}
													className="text-sm hover:bg-green-600 py-2 px-5 cursor-pointer  rounded-full border bg-primaryBgClr sm:py-0 sm:text-[8px] sm:my-auto sm:h-fit sm:px-1"
												>
													Accept
												</div>
												<div
													onClick={() =>
														isAccept(
															false,
															_id
														)
													}
													className="text-sm py-2 px-5 cursor-pointer hover:bg-slate-100 rounded-full border text-red-500 sm:py-0 sm:text-[8px] sm:my-auto sm:h-fit sm:px-1"
												>
													Reject
												</div>
											</>
										) : (
											<Link
												href={`/adminBookers/${_id}`}
											>
												<Image
													src={
														view
													}
													alt="View"
													width={
														30
													}
													className={`cursor-pointer h-auto sm:h-[17px] sm:w-[17px] sm:mt-[1px] ${
														!(
															index %
															2
														)
															? "hover:bg-gray-200"
															: "hover:bg-[#d3d1d1]"
													} rounded-full`}
												/>
											</Link>
										)}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			) : (
				<div className="mx-auto w-fit mt-20 text-red-500 font-serif">
					No data to show !!
				</div>
			)}
			{/* </div> */}
		</div>
	);
};

export default AffiliateRequest;
