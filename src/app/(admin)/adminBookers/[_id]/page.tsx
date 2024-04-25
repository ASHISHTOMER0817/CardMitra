"use client";
import BackwardButton from "@/app/components/BackwardButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import redCross from "@/../public/redCross.svg";
import accept from "@/../public/accept.svg";
import acceptAffiliate from "@/app/components/acceptAffiliate";
import UserOrders from "@/app/components/userOrders";
import { order } from "@/interface/productList";

interface User {
user:{
	name: string;
	email: string;
	contact: string;
	bank_account_number: string;
	IFSC_code: string;
	UPI_ID: string;
}
orderList:order[]
} 
const Bookers = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<User>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/details?query=${params._id}`
				);
				const status = response.data.status;
				const msg = response.data.message;
				setData(response.data.data)
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
		<div className="w-[90%] mx-10 mt-6 ">
			<BackwardButton />
			<div className="flex justify-between mb-8 items-center">
				<h3>{data?.user?.name}</h3>
				{/* <div className="flex gap-6 text-sm"> */}
					{/* <button className="rounded-3xl flex text-center items-center justify-center w-36 py-1 bg-primaryBgClr">
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
					</button> */}
					<div className="rounded-3xl text-nowrap cursor-pointer hover:bg-slate-100 flex py-2 px-4 border justify-center items-center border-red-500 text-red-500">
						{/* <Image
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
						/>{" "} */}
						<div>Remove account</div>
					</div>
				{/* </div> */}
			</div>
			<h6 className="text-gray-400 mb-2 text-sm">PERSONAL</h6>
			<section className=" flex justify-between items-center">
				<div>Name: {data?.user?.name}</div>
				<div>Email: {data?.user?.email}</div>
				<div>Contact: {data?.user?.contact} </div>
			</section>

			<hr className="border w-4/5 my-7" />
			<h6 className="text-gray-400 mb-4 text-sm">BANK DETAILS</h6>

			<section className="flex justify-between items-center">
				<div>
					Bank Account Number: {data?.user?.bank_account_number}
				</div>
				<div>IFSC Code: {data?.user?.bank_account_number} </div>
				<div className="mr-20">UPI ID: {data?.user?.UPI_ID}</div>
			</section>
			<UserOrders data={data?.orderList!}/>
		</div>
	);
};

export default Bookers;
