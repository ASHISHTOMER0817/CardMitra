"use client";
import BackwardButton from "@/app/components/BackwardButton";
import UserOrders from "@/app/components/userOrders";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { UserDetails, order, user } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { VscEdit } from "react-icons/vsc";
import { GoCodeReview } from "react-icons/go";

import Link from "next/link";

const UserProfile = () => {
	const [data, setData] = useState<{
		user: user;
		verifiedAmt: string;
		totalUnVerifiedAmt: string;
		// orderList:order[]
	}>();

	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect starts");
				const response = await axios.get(`/api/users/details`);
				console.log(response.data.message);
				if (!response.data.success) {
					console.log("false success");
					return Popup(
						"error",
						"something went wrong, please refresh"
					);
				}
				setData(response.data.data);
			} catch {
				console.log("catchpart");
				Popup("error", "something went wrong, please refresh");
			}
		}
		getData();
	}, []);

	return (
		<>
			<div className="w-[100%] mb-10 mx-auto sm:ml-0 mt-4 ">
				{/* <div
					className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
				></div> */}

				<div className="flex justify-between items-center flex-wrap gap-4 mb-4">
					<div className="w-full flex justify-between gap-2">
						<h3 className="font-semibold text-primaryBgClr w-full">
							{data?.user.name}
						</h3>
						<Link
							href="/editUserDetails"
							// onClick={() => setOverlay("")}

							className="rounded-3xl float-right text-nowrap cursor-pointer flex py-1 px-2 border justify-center items-center border-gray-400 hover:border-gray-600 text-gray-500 hover:text-gray-600 sm:py-1 sm:text-[12px]"
						>
							Edit
							<VscEdit className="float-right ml-2" />
						</Link>
						<Link
							href="/reviewForm"
							className="rounded-3xl float-right text-nowrap cursor-pointer flex py-1 px-2 border justify-center items-center border-gray-400 hover:border-gray-600 text-primaryBgClr hover:text-green-600 sm:py-1 sm:text-[10px]"
						>
							Submit a Feedback
							<GoCodeReview className="float-right ml-2" />
						</Link>
					</div>

					<div className="p-3 flex bg-gray-200 rounded-[12px] w-full sm:flex-col justify-around">
						<div className="flex items-center text-lg sm:text-[14px] sm:leading-none">
							Earnings:{" "}
							<LiaRupeeSignSolid
								width={20}
								height={20}
								className="text-primaryBgClr"
							/>{" "}
							<div className="text-primaryBgClr font-bold">
								{data?.user.paid}
							</div>
						</div>
						<div className="text-gray-600 flex flex-col text-sm sm:text-[12px] sm:leading-none sm:mt-3">
							<div className="font-medium text-base sm:text-[11px]">
								pending amount{" "}
							</div>

							<div className="flex items-center">
								Verified:{" "}
								<LiaRupeeSignSolid
									width={10}
									height={10}
									className="under"
								/>{" "}
								{data?.verifiedAmt}
							</div>
							<div className="flex items-center mb-2">
								Unverified:{" "}
								<LiaRupeeSignSolid
									width={10}
									height={10}
									className="under"
								/>{" "}
								{data?.totalUnVerifiedAmt}
							</div>
						</div>
					</div>
				</div>
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[12px] sm:mb-1">
					PERSONAL
				</h6>
				<section className=" flex justify-between sm:text-[12px] flex-wrap  sm:flex-col sm:justify-start">
					<div>Name: {data?.user.name}</div>
					<div>Email: {data?.user.email}</div>
					<div>Contact: {data?.user.contact} </div>
				</section>

				<hr className="border w-full my-7" />
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[12px] sm:mb-1">
					BANK DETAILS
				</h6>

				<section className="flex justify-between sm:text-[12px] flex-wrap sm:flex-col sm:justify-start">
					<div>
						Bank Account Number: {data?.user.accountNo}
					</div>
					<div>IFSC Code: {data?.user.ifsc} </div>
					<div className="">UPI ID: {data?.user.upi}</div>
				</section>

				<h6 className="text-gray-400 text-sm mt-10 mb-4 rounded-full font-semibold">
					TRANSACTIONS
				</h6>

				{!data ? (
					<Loader />
				) : data?.user._id ? (
					<Transactions _id={data?.user._id} />
				) : (
					""
				)}
			</div>
		</>
	);
};

export default UserProfile;
