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

const AffiliateRequest = ({ heading }: { heading?: string }) => {
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
		<div className={`${heading === 'approved' && 'w-[85%]'} mx-auto my-8 md:text-[10px]`}>
			{heading === 'approved' && (
				<h3 className="font-semibold mb-4 pb-2">
					User List
				</h3>
			)}
			<div className={`rounded-lg overflow-hidden ${heading ? 'border border-gray-300': '' } `}>
				{!users? <Loader/> : users.length >0 ? <table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th className="px-4 py-2 text-left">
								Name
							</th>
							<th className="px-4 py-2 text-left">
								Email
							</th>
							<th className="px-4 py-2 text-left">
								Contact No
							</th>
							<th className="px-4 py-2 text-left">
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
									className="border-b"
								>
									<td className="px-4 py-5 text-left">
										{name}
									</td>
									<td className="px-4 py-5 text-left">
										{email}
									</td>
									<td className="px-4 py-5 text-left">
										{contact}
									</td>
									<td className="px-4 py-5 text-center flex justify-start gap-2">
										{!isApprove ? (
											<>
												<div
													onClick={() =>
														isAccept(
															true,
															_id
														)
													}
													className="text-sm hover:bg-green-600 py-2 px-5 cursor-pointer  rounded-full border bg-primaryBgClr"
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
													className="text-sm py-2 px-5 cursor-pointer hover:bg-slate-100 rounded-full border text-red-500"
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
													className="cursor-pointer h-auto"
												/>
											</Link>
										)}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>: <div className="mx-auto w-fit mt-20 text-red-500">No data to show !!</div>}
			</div>
		</div>
	);
};

export default AffiliateRequest;
