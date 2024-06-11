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

const UserProfile = () => {
	const [ifsc, setIfsc] = useState("");
	const [accountNo, setAccountNo] = useState("");
	const [upi, setUpi] = useState("");
	const [overlay, setOverlay] = useState("hidden");
	const [data, setData] = useState<{
		user: user;
		verifiedAmt: string;
		totalUnVerifiedAmt: string;
		// orderList:order[]
	}>();

	console.log("page.tsx");
	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect starts");
				const response = await axios.get(`/api/users/details`);
				console.log(response.data.message);
				setData(response.data.data);
				if (!response.data.success) {
					Popup(
						"error",
						"something went wrong, please refresh"
					);
				}
			} catch {
				Popup("error", "something went wrong, please refresh");
			}
		}
		getData();
	}, []);

	const bankDetails = { ifsc, accountNo, upi };

	// Save bank details
	async function sendData() {
		try {
			const response = await axios.post("/api/users/bankDetails", {
				bankDetails,
			});
			if (!response.data.success) {
				return Popup("error", response.data.message);
			} else {
				return Popup("success", response.data.message);
			}
		} catch {
			return Popup("error", "server error, please refresh");
		}
	}

	function overlayFeature() {
		setOverlay("hidden");
	}
	return (
		<>
			<div className="w-[100%] mb-10 mx-auto sm:ml-0">
				<div
					className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
				></div>
				<form
					onSubmit={sendData}
					className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
				>
					<RxCross1
						className=" cursor-pointer ml-auto w-[30px] h-[30px] p-1 rounded-full hover:bg-green-100 "
						onClick={overlayFeature}
					/>
					<h4 className="sm:text-nowrap">
						Fill all the Bank details
					</h4>
					<input
						type="text"
						required
						placeholder="Bank Account Number"
						className="outline-none border-b pb-1 text-sm border-black"
						value={accountNo}
						onChange={(e) =>
							setAccountNo(e.target.value)
						}
					/>{" "}
					<input
						type="text"
						required
						placeholder="IFSC code"
						className="outline-none border-b pb-1 text-sm border-black"
						value={ifsc}
						onChange={(e) => setIfsc(e.target.value)}
					/>{" "}
					<input
						type="text"
						required
						placeholder="UPI ID"
						className="outline-none border-b pb-1 text-sm border-black"
						value={upi}
						onChange={(e) => setUpi(e.target.value)}
					/>{" "}
					<button
						type="submit"
						className="px-3 hover:bg-green-100 py-1"
					>
						Submit
					</button>
				</form>
				<div className="flex justify-between mb-2 items-center flex-wrap gap-4 mb-4">
					<h3 className="font-semibold text-primaryBgClr w-full">
						{data?.user.name}
					</h3>
					<div className="p-4 w-full flex pr-[3rem] gap-[10rem] items-center bg-gray-200 rounded-[20px] sm:pr-4 sm:py-1 sm:text-[10px] sm:gap-0.5" style={{justifyContent: 'space-evenly'}}>
						<div className="flex justify-center items-center text-lg sm:text-[11px] sm:leading-none">
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
						<div className="text-gray-600 flex flex-col text-sm  justify-center items-center sm:text-[9px] sm:leading-none">
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
					{!data
						? ""
						: !data?.user.accountNo && (
								<div
									onClick={() =>
										setOverlay("")
									}
									className="rounded-3xl text-nowrap cursor-pointer bg-primaryBgClr flex py-2 px-4 border justify-center items-center text-white sm:py-1 sm:text-[10px]"
								>
									fill Bank Details
								</div>
						  )}
				</div>
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[10px] sm:mb-1">
					PERSONAL
				</h6>
				<section className=" flex justify-between items-center sm:text-[10px] flex-wrap">
					<div>Name: {data?.user.name}</div>
					<div>Email: {data?.user.email}</div>
					<div>Contact: {data?.user.contact} </div>
				</section>

				<hr className="border w-full my-7" />
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[10px] sm:mb-1">
					BANK DETAILS
				</h6>

				<section className="flex justify-between items-center sm:text-[10px] flex-wrap">
					<div>
						Bank Account Number: {data?.user.accountNo}
					</div>
					<div>IFSC Code: {data?.user.ifsc} </div>
					<div className="">
						UPI ID: {data?.user.upi}
					</div>
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
