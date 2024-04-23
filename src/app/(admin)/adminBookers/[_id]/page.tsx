"use client";
import BackwardButton from "@/app/components/BackwardButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import redCross from "@/../public/redCross.svg";
import accept from "@/../public/accept.svg";
import acceptAffiliate from "@/app/components/acceptAffiliate";

interface User {
	name: string;
	email: string;
	contact: string;
	bank_account_number: string;
	IFSC_code: string;
	UPI_ID: string;
}
const Bookers = ({ params }: { params: { _id: string } }) => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/details?query=${params._id}`
				);
				const status = response.data.status;
				const msg = response.data.message;
				setUser(response.data.data);
				console.log(response.data.data);
			} catch {
				console.log(
					"Something went wrong, please try again later"
				);
			}
		}
		getData();
	}, [params._id]);

	return (
		<div className="w-full mx-10 mt-6 ">
			<BackwardButton />
			<div className="flex justify-between mb-8 items-center">
				<h3>{user?.name}</h3>
				<div className="flex gap-6 text-sm">
					<button className="rounded-3xl flex text-center items-center justify-center w-36 py-1 bg-primaryBgClr">
						<Image
							onClick={() =>
								acceptAffiliate(
									true,
									user?.email!
								)
							}
							src={accept}
							alt="accept"
							width={30}
							height={30}
							className="cursor-pointer"
						/>{" "}
						Accept
					</button>
					<button className="rounded-3xl flex w-36 py-1 border justify-center items-center border-red-500 text-red-500">
						<Image
							onClick={() =>
								acceptAffiliate(
									false,
									user?.email!
								)
							}
							src={redCross}
							alt="reject"
							width={18}
							height={18}
							className="cursor-pointer"
						/>{" "}
						Reject
					</button>
				</div>
			</div>
			<h6 className="text-gray-400 mb-2 text-sm">PERSONAL</h6>
			<section className=" flex justify-between items-center">
				<div>Name: {user?.name}</div>
				<div>Email: {user?.email}</div>
				<div>Contact: {user?.contact} </div>
			</section>

			<hr className="border w-4/5 my-7" />
			<h6 className="text-gray-400 mb-4 text-sm">BANK DETAILS</h6>

			<section className="flex justify-between items-center">
				<div>
					Bank Account Number: {user?.bank_account_number}
				</div>
				<div>IFSC Code: {user?.bank_account_number} </div>
				<div className="mr-20">UPI ID: {user?.UPI_ID}</div>
			</section>
		</div>
	);
};

export default Bookers;
