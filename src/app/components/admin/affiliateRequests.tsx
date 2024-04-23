"use client";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import Image from "next/image";
import reject from "@/../public/reject.svg";
import accept from "@/../public/accept.svg";
import view from "@/../public/view.svg";
import Link from "next/link";
import acceptAffiliate from "../acceptAffiliate";

interface details {
	name: string;
	contact: string;
	email: string;
	_id: string;
}
const AffiliateRequest = () => {
	const [users, setUsers] = useState<details[]>([]);

	const [arr, setArr] = useState()
	// function buttonclick(boolean: boolean) {
	// 	acceptAffiliate(boolean);
	// }
	// const [acceptbutton, setAcceptButton] = useState<ReactNode>(
	// 	<Image
	// 		onClick={() => acceptAffiliate(true)}
	// 		src={accept}
	// 		alt="Edit"
	// 		width={30}
	// 		height={30}
	// 		className="cursor-pointer"
	// 	/>
	// );
	// const [rejectbuton, setRejectButton] = useState<ReactNode>(
	// 	<Image
	// 		onClick={() => acceptAffiliate(false)}
	// 		src={reject}
	// 		alt="Delete"
	// 		height={30}
	// 		width={30}
	// 		className="cursor-pointer"
	// 	/>
	// );

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"api/affiliate/affiliateRequest"
				);
				setUsers(response.data.data); // Assuming API response is an array of user objects
			} catch (error) {
				console.error(
					"Something went wrong; Please reload the page",
					error
				);
			}
		};

		fetchData();
	}, []);

	
	

	// function acceptButtonState() {
	// 	setAcceptButton(
	// 		<div className="rounded-3xl flex items-center justify-center pr-[9px] bg-primaryBgClr">
	// 			<Image
	// 				onClick={() => acceptAffiliate(true)}
	// 				src={accept}
	// 				alt="Edit"
	// 				width={30}
	// 				height={30}
	// 				className="cursor-pointer"
	// 			/>
	// 			<div className="text-sm">Accepted</div>
	// 		</div>
	// 	);
	// 	setRejectButton(
	// 		<Image
	// 			onClick={() => acceptAffiliate(false)}
	// 			src={reject}
	// 			alt="Delete"
	// 			height={30}
	// 			width={30}
	// 			className="cursor-pointer"
	// 		/>
	// 	);
	// }

	// function rejectButtonState() {
	// 	setRejectButton(
	// 		<div className="rounded-3xl flex items-center justify-center pr-[9px] bg-primaryBgClr">
	// 			<Image
	// 				onClick={() => acceptAffiliate(true)}
	// 				src={reject}
	// 				alt="Edit"
	// 				width={30}
	// 				height={30}
	// 				className="cursor-pointer"
	// 			/>
	// 			<div className="text-sm">Rejected</div>
	// 		</div>
	// 	);
	// 	setAcceptButton(
	// 		<Image
	// 			onClick={() => acceptAffiliate(false)}
	// 			src={accept}
	// 			alt="Delete"
	// 			height={30}
	// 			width={30}
	// 			className="cursor-pointer"
	// 		/>
	// 	);
	// }

	return (
		<div className="container mx-auto my-8">
			<h5 className="font-semibold text-lg mb-4 pb-2 border-b">
				User List
			</h5>
			<div className="rounded-lg overflow-hidden border border-gray-300">
				{/* <table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">
								Contact No
							</th>
							<th className="px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map(
							({ name, email, contact }, index) => (
								<tr
									key={index}
									className="border-b"
								>
									<td className="px-4 py-2">
										{name}
									</td>
									<td className="px-4 py-2">
										{email}
									</td>
									<td className="px-4 py-2">
										{contact}
									</td>
									<td className="px-4 py-2 flex gap-2">
										<Image onClick={()=>acceptAffiliate(true)}
											src={accept}
											alt="Edit"
											width={30}
											height={30}
											className="cursor-pointer"
										/>
										<Image onClick={()=>acceptAffiliate(false)}
											src={reject}
											alt="Delete"
											height={30}
											width={30}
											className="cursor-pointer"
										/>
										<Image
											src={view}
											alt="View"
											width={30}
											height={30}
											className="cursor-pointer"
										/>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table> */}
				<table className="min-w-full divide-y divide-gray-300">
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
								{ name, email, contact, _id },
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
										<Image
											onClick={() =>
												acceptAffiliate(
													true,
													email
												)
											}
											src={accept}
											alt="Edit"
											width={30}
											height={30}
											className="cursor-pointer"
										/>
										<Image
											onClick={() =>
												acceptAffiliate(
													false, email
												)
											}
											src={reject}
											alt="Delete"
											height={30}
											width={30}
											className="cursor-pointer"
										/>
										{/* <Link
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
												height={
													30
												}
												className="cursor-pointer"
											/>
										</Link> */}
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AffiliateRequest;
