"use client";
import BackwardButton from "@/app/components/BackwardButton";
import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
// import Image from "next/image";
// import redCross from "@/../public/redCross.svg";
// import accept from "@/../public/accept.svg";
// import acceptAffiliate from "@/app/components/acceptAffiliate";
import UserOrders from "@/app/components/userOrders";
import { order } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { UserDetails } from "@/interface/productList";
import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";

const Bookers = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<UserDetails>();
	const [listType, setListType] = useState("delivered");
	const [amount, setAmount] = useState<number>();
	const [overlay, setOverlay] = useState("hidden");
	const [transactions, setTransactions] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const router = useRouter();

	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect running");
				const response = await axios.get(
					`/api/users/details?query=${params._id}&listType=${listType}&paid=${amount}`
				);
				setData(response.data.data);
				if (response.data.status === 250) {
					Popup("success", response.data.message);
					console.log("really----");
					// setRefresh(true)
				}
			} catch {
				Popup("error", "something went wrong!!");
			}
		}
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listType, params._id]);
	// if(refresh){
	// 	setRefresh(false)
	// 	router.refresh()
	// }

	// Function to remove account of the user
	// async function removeAccount() {
	// 	try {
	// 		const response = await axios.delete(
	// 			`/api/users/deleteAccount?objectId=${params._id}`
	// 		);
	// 		const success = await response.data.success;
	// 		const msg = await response.data.message;
	// 		console.log(success);
	// 		if (success !== true) {
	// 			Popup("error", msg);
	// 		} else if (success) {
	// 			Popup("success", msg);
	// 			setTimeout(() => {
	// 				router.back();
	// 			}, 3000);
	// 		}
	// 	} catch {
	// 		Popup("error", "something went wrong, REFRESH");
	// 	}
	// }
	// function overlayFeature() {
	// 	setOverlay("hidden");
	// 	console.log(overlay);
	// }

	console.log(data?.totalAmt);
	return (
		<div className="w-[90%] mx-10 mt-6 relative sm:ml-0">
			<div
				className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
			></div>
			<div
				className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
			>
				<RxCross1
					width={20}
					height={20}
					className=" cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
					onClick={() => setOverlay("hidden")}
				/>
				<h4 className="sm:text-nowrap">
					Write, the amount you paid
				</h4>
				<input
					type="number"
					required
					placeholder="Amount"
					className="outline-none border-b pb-2 border-black sm:text-sm"
					value={amount}
					onChange={(e) => setAmount(+e.target.value)}
				/>{" "}
				<button
					onClick={() => {
						setListType("reduce");
						setOverlay("hidden");
					}}
					className="px-3 py-1 hover:bg-gray-200 active:bg-gray-200"
				>
					Submit
				</button>
			</div>
			<BackwardButton />
			<div className="flex justify-between mb-10 items-center">
				<h3 className="font-semibold">{data?.user?.name}</h3>
				{(listType === "delivered" || listType === "reduce") &&
					data?.totalAmt! > 0 && (
						<div
							onClick={() => setOverlay("")}
							className="rounded-3xl text-nowrap cursor-pointer bg-primaryBgClr flex py-2 px-4 border justify-center items-center text-white sm:py-1 sm:text-[10px]"
						>
							pay Rs.{data?.totalAmt}
						</div>
					)}
			</div>
			<h6 className="text-gray-400 mb-4 text-sm sm:text-[10px] sm:mb-1">
				PERSONAL
			</h6>
			<section className=" flex justify-between items-center sm:text-[10px] ">
				<div>Name: {data?.user?.name}</div>
				<div>Email: {data?.user?.email}</div>
				<div>Contact: {data?.user?.contact} </div>
			</section>

			<hr className="border w-full my-7 sm:my-3" />
			<h6 className="text-gray-400 mb-4 text-sm  sm:text-[10px] sm:mb-1">
				BANK DETAILS
			</h6>

			<section className="flex justify-between items-center sm:text-[10px]">
				<div>
					Account Number: <div>{data?.user?.accountNo}</div>
				</div>
				<div>
					IFSC Code: <div>{data?.user?.ifsc} </div>
				</div>
				<div className="mr-20">
					UPI ID: <div>{data?.user?.upi}</div>
				</div>
			</section>

			<div className="flex justify-start gap-4 mt-8 mb-4 items-center ">
				<h6
					onClick={() => {
						setListType("delivered");
						setTransactions(false);
					}}
					className={` text-sm p-[10px] rounded-full cursor-pointer sm:text-[10px] sm:text-nowrap ${
						(listType === "delivered" ||
							listType === "reduce") &&
						!transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Delivered List
				</h6>
				<h6
					onClick={() => {
						setListType("nonDelivered");
						setTransactions(false);
					}}
					className={` text-sm p-[10px] rounded-full cursor-pointer sm:text-[10px] sm:text-nowrap ${
						listType === "nonDelivered" &&
						!transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					non-delivered List
				</h6>
				<h6
					onClick={() => setTransactions(true)}
					className={` text-sm p-[10px] rounded-full cursor-pointer sm:text-[10px] sm:text-nowrap ${
						transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Transactions
				</h6>
			</div>

			{transactions ? (
				<Suspense fallback={<Loader classList="mt-20" />}>
					<Transactions userPage={true} _id={params._id} />
				</Suspense>
			) : data ? (
				data?.orderList?.length > 0 ? (
					<UserOrders data={data?.orderList!} />
				) : (
					<div className="mt-28 mx-auto w-fit text-sm text-red-500 font-serif sm:text-[8px]">
						User was In-active !!
					</div>
				)
			) : (
				<Loader classList="mt-20" />
			)}
		</div>
	);
};

export default Bookers;
