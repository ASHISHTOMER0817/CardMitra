"use client";
import BackwardButton from "@/app/components/BackwardButton";
import axios from "axios";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
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
import { IoIosArrowDown } from "react-icons/io";

const Bookers = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<UserDetails>();
	const [listType, setListType] = useState("delivered");
	const [amount, setAmount] = useState<number>();
	const [overlay, setOverlay] = useState("hidden");
	const [overlayElement, setOverlayElement] = useState<{
		action: string;
		heading: string;
		button: string;
	}>();
	const [deleteOperation, setDeleteOperation] = useState(false);
	const [dis_approve, setDis_approve] = useState(false);
	const [transactions, setTransactions] = useState(false);
	const [dropDown, setdropDown] = useState(false);
	// const [refresh, setRefresh] = useState(false);
	// const router = useRouter();

	const paymentElement = {
		action: "payment",
		heading: "Write, the amount you paid",
		button: "Submit",
	};
	const deleteAccountElement = {
		action: "delete",
		heading: "You really want to delete this account",
		button: "Delete",
	};
	const dis_approveAccountElement = {
		action: "dis_approve",
		heading: "Are you sure about dis-approving this user",
		button: "Dis-Approve",
	};

	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect running");
				console.log(params._id);
				const response = await axios.get(
					`/api/users/details?query=${params._id}&delete=${deleteOperation}&dis_approve=${dis_approve}`
				);
				setData(response.data.data);
				console.log(response.data);
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
	}, [params._id, deleteOperation, dis_approve]);
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

	// 	const crossElement = (<RxCross1
	// 	width={20}
	// 	height={20}
	// 	className=" cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
	// 	onClick={() => setOverlay("hidden")}
	// />)
	// 	const paymentElement = (
	// 		<form
	// 			onSubmit={payment}
	// 			className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
	// 		>
	// 			{crossElement}
	// 			<h4 className="sm:text-nowrap">Write, the amount you paid</h4>
	// 			<input
	// 				type="number"
	// 				required
	// 				placeholder="Amount"
	// 				className="outline-none border-b pb-2 border-black sm:text-sm"
	// 				value={amount}
	// 				onChange={(e) => setAmount(+e.target.value)}
	// 			/>{" "}
	// 			<button
	// 				onClick={() => {
	// 					setListType("undelivered");
	// 					// payment();
	// 					setOverlay("hidden");
	// 				}}
	// 				type="submit"
	// 				className="px-3 py-1 hover:bg-gray-200 active:bg-gray-200"
	// 			>
	// 				Submit
	// 			</button>
	// 		</form>
	// 	);

	// 	const deleteAccountElement = (
	// 		<div className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
	// 		>
	// 			<RxCross1
	// 				width={20}
	// 				height={20}
	// 				className=" cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
	// 				onClick={() => setOverlay("hidden")}
	// 			/>
	// 		</div>
	// 	)

	async function payment() {
		try {
			const response = await axios.get(
				`/api/users/details?paid=${amount}&query=${params._id}`
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

	console.log(data?.totalAmt);

	const buttonOperation = () => {
		if (overlayElement?.action === "payment") {
			payment();
		} else if (overlayElement?.action === "delete") {
			setDeleteOperation(true);
		} else if (overlayElement?.action === "payment") {
			setDis_approve(true);
		}
		setListType("undelivered");
		// payment();
		setOverlay("hidden");
	};

	const bankDetails = [{key:'Account Number',value: data?.user?.accountNo},{key:'IFSC Code',value: data?.user?.ifsc},{key:'UPI ID',value: data?.user?.upi}]
	const personal = [{key:'Name',value: data?.user?.name},{key:'Email',value: data?.user?.email},{key:'Contact',value: data?.user?.contact}]
	const deliveryStatus = ['undelivered','cancelled','wrong OTP','transactions'] 

	return (
		<div
			className="w-[90%] mx-10 mt-6 relative sm:mx-0 sm:w-full sm:mt-2"
			// onClick={() => setdropDown(false)}
		>
			<div
				className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
			></div>
			<form
				onSubmit={payment}
				className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
			>
				<RxCross1
					width={20}
					height={20}
					className=" cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
					onClick={() => setOverlay("hidden")}
				/>
				<h4 className="sm:text-nowrap text-xl">
					{/* Write, the amount you paid */}
					{overlayElement?.heading}
				</h4>
				<input
					hidden={
						overlayElement?.action !== "payment"
							? true
							: false
					}
					type="number"
					required
					placeholder="Amount"
					className="outline-none border-b pb-2 border-black sm:text-sm"
					value={amount}
					onChange={(e) => setAmount(+e.target.value)}
				/>{" "}
				<div className="flex justify-center gap-3 items-center">
					<button
						onClick={() => {
							// setListType("undelivered");
							// payment();
							setOverlay("hidden");
						}}
						type="button"
						className="px-3 py-1 hover:bg-gray-200 border-gray-200 border rounded-full active:bg-gray-200"
					>
						Cancel
					</button>
					<button
						onClick={buttonOperation}
						type="submit"
						className="px-3 py-1 hover:bg-green-600 bg-primaryBgClr rounded-full text-white"
					>
						{/* Submit */} {overlayElement?.button}
					</button>
				</div>
			</form>
			{/* {overlayElement} */}
			<BackwardButton />
			<div className="flex justify-between mb-10 items-center sm:mb-0">
				<h3 className="font-semibold">{data?.user?.name}</h3>
				{(listType === "delivered" || listType === "reduce") &&
					data?.totalAmt! > 0 && (
						<div
							onClick={() => {
								setOverlay("");
								setOverlayElement(
									paymentElement
								);
							}}
							className="rounded-3xl text-nowrap ml-auto mr-4 cursor-pointer bg-primaryBgClr flex py-2 px-4 border justify-center items-center text-white sm:py-1 sm:text-[10px]"
						>
							pay Rs.{data?.totalAmt}
						</div>
					)}
				<div
					className={`h-10 sm:h-6 text-sm ${
						dropDown
							? "overflow-visible"
							: "overflow-hidden"
					}`}
				>
					<div
						className={`flex gap-2 border border-black rounded-2xl px-2 justify-center transition-all sm:h-6 items-center h-10 cursor-pointer`}
						onClick={() => setdropDown(!dropDown)}
					>
						<div>Action</div>
						<IoIosArrowDown
							className={
								!dropDown ? "" : "rotate-180"
							}
						/>
					</div>
					<div
						onClick={() => {
							setOverlay("");
							setOverlayElement(
								deleteAccountElement
							);
						}}
						className="h-10 px-2 flex justify-center sm:h-6 items-center cursor-pointer border-l border-l-black border-r border-r-black hover:bg-gray-200 acti"
					>
						Delete account
					</div>
					<div
						onClick={() => {
							setOverlay("");
							setOverlayElement(
								dis_approveAccountElement
							);
						}}
						className="h-10 px-2 flex justify-center sm:h-6 items-center border border-black cursor-pointer hover:bg-gray-200"
					>
						Dis-approve
					</div>
				</div>
			</div>

			<h6 className="text-gray-400 mb-4 text-sm sm:text-[12px] sm:mb-1 sm:mt-4">
				PERSONAL
			</h6>
			<section className="flex flex-wrap justify-between items-center align-left-small sm:flex-col sm:text-[14px] ">
				{/* <div>Name: {data?.user?.name}</div>
				<div>Email: {data?.user?.email}</div>
				<div>Contact: {data?.user?.contact} </div> */}
				{personal.map(({key, value},index)=>{
					return (
						<div key={index}>{key}{value} </div>
					)
				})}
			</section>

			<hr className="border w-full my-7 sm:my-3" />
			<h6 className="text-gray-400 mb-4 text-sm  sm:text-[12px]  sm:mb-1">
				BANK DETAILS
			</h6>

			<section className="flex flex-wrap justify-between align-left-small items-center sm:flex-col sm:text-[14px]">
				{/* <div>
					Account Number:{" "}
					<div className="float-right">
						{data?.user?.accountNo}
					</div>
				</div>
				<div>
					IFSC Code:{" "}
					<div className="float-right">
						{data?.user?.ifsc}{" "}
					</div>
				</div>
				<div className="mr-20">
					UPI ID:{" "}
					<div className="float-right">
						{data?.user?.upi}
					</div>
				</div> */}
				{bankDetails.map(({key, value}, index)=>{
					return (
						<div key={index} className="mr-20">
					{key}{" "}
					<div className={`float-right ${index === bankDetails.length -1 && 'mr-20'}`}>
						{value}
					</div>
				</div>
					)
				})}
			</section>

			<div className="flex justify-start gap-4 mt-8 mb-4 sm:mt-4 items-center overflow-auto">
				<h6
					onClick={() => {
						setListType("delivered");
						// setTransactions(false);
					}}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
						(listType === "delivered" ||
							listType === "reduce") &&
						// !transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Delivered
				 </h6>
				{/*<h6
					onClick={() => {
						setListType("undelivered");
						// setTransactions(false);
					}}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
						listType === "undelivered" &&
						!transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Un-delivered
				</h6>
				<h6
					onClick={() => {
						setListType("cancelled");
						// setTransactions(false);
					}}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
						listType === "cancelled" &&
						// !transactions &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Cancelled
				</h6>
				<h6
					onClick={() => {
						setListType("wrong OTP");
						// setTransactions(false);
					}}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
						listType === "wrong OTP" &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Wrong OTP
				</h6>
				<h6
					onClick={() => setListType("transactions")}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
						listType === "transactions" &&
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					Transactions
				</h6> */}

				{deliveryStatus.map((status,index)=>{
					return (
						<h6 key={index}
					onClick={() => setListType(status)}
					className={` text-sm p-[12px] sm:p-0 rounded-full cursor-pointer sm:text-[12px] sm:text-nowrap ${
					listType === status && 
						"underline underline-offset-4 text-primaryBgClr"
					}`}
				>
					{status}
				</h6>
					)
				})}

			</div>

			{listType === "transactions" ? (
				<Transactions _id={params._id} />
			) : data ? (
				<UserOrders data={data.orderList} listType={listType} />
			) : (
				<div className="mt-28 mx-auto w-fit text-sm text-red-500 font-serif sm:text-[8px]">
					User was In-active !!
				</div>
			)}
		</div>
	);
};

export default Bookers;
