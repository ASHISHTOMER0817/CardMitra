"use client";
import BackwardButton from "@/app/components/BackwardButton";
import axios from "axios";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
// import Image from "next/image";
// import redCross from "@/../public/redCross.svg";
// import accept from "@/../public/accept.svg";
// import acceptAffiliate from "@/app/components/acceptAffiliate";
import UserOrders from "@/app/components/userOrders";
import { order, user } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { UserDetails } from "@/interface/productList";
import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";
import { IoIosArrowDown } from "react-icons/io";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const InfoCard = ({
	title,
	children,
}: {
	title: string | undefined;
	children: ReactNode;
}) => (
	<div className="bg-white shadow-md rounded-[8px] overflow-hidden">
		<div className="px-6 py-4 md:px-4 md:py-3 sm:px-3 sm:py-2 bg-gray-50 border-b">
			<h3 className="text-lg md:text-base sm:text-sm font-semibold text-gray-800">
				{title}
			</h3>
		</div>
		<div className="p-6 md:p-4 sm:p-3 space-y-4 md:space-y-3 sm:space-y-2">
			{children}
		</div>
	</div>
);

const InfoItem = ({
	label,
	value,
}: {
	label: string | undefined;
	value: string | undefined;
}) => (
	<div className="flex justify-between items-center">
		<span className="text-base md:text-sm sm:text-xs text-gray-600">
			{label}:
		</span>
		<span className="text-base md:text-sm sm:text-xs font-medium">
			{value}
		</span>
	</div>
);

const Bookers = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<{user:user, orderList:order[], balance:number }>();
	const [listType, setListType] = useState("delivered");
	const [amount, setAmount] = useState("");
	const [overlayElement, setOverlayElement] = useState<{
		heading: string;
		desc: string;
		button: string;
		action: string;
	}>();
	const [deleteOperation, setDeleteOperation] = useState(false);
	const [dis_approve, setDis_approve] = useState(false);
	const [transactions, setTransactions] = useState(false);
	const [dropDown, setdropDown] = useState(false);
	// const [refresh, setRefresh] = useState(false);
	const router = useRouter();

	const paymentElement = {
		heading: `The pending amount is ₹ ${data?.balance}`,
		desc: "Write the amount, you have paid to the user.",
		button: "Confirm",
		action: "payment",
	};
	const deleteAccountElement = {
		heading: `Delete ${data?.user.name} account`,
		desc: "You really want to delete this account. This action is irreversible",
		button: "Delete",
		action: "delete",
	};
	const dis_approveAccountElement = {
		heading: "Are you sure about dis-approving this user",
		desc: "Are you sure about this. Remember it causes discomfort to the user",
		button: "Dis-Approve",
		action: "dis-approve",
	};
	const makeCollaboratorElement = {
		heading: "Make this user a collaborator",
		desc: "Are you sure about this. Remeber user can get to see internal information",
		button: "Make Collaborator",
		action: "make-collaborator",
	};

	// useEffect(() => {
	// 	async function getData() {
	// 		try {
	// 			// console.log("useEffect running");
	// 			// console.log(params._id);
	// 			const response = await axios.get(
	// 				`/api/users/details?query=${params._id}&delete=${deleteOperation}&dis_approve=${dis_approve}`
	// 			);
	// 			const data = response.data.data;
	// 			console.log(data.user.unpaid, '-:this is unpaid amt')
	// 			setData(data);
	// 			setAmount((+data.totalAmt).toString());
	// 			// console.log(response.data.data);
	// 			if (response.data.status === 250) {
	// 				Popup("success", response.data.message);

	// 				// setRefresh(true)
	// 			}
	// 		} catch {
	// 			Popup("error", "something went wrong!!");
	// 		}
	// 	}
	// 	getData();
	// }, [params._id, deleteOperation, dis_approve]);
	
	
	
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/details?userId=${params._id}`
				);
				const data = response.data.data;
				console.log(data)
				setData(data);
				
			} catch {
				Popup("error", "something went wrong!!");
			}
		}
		getData();
	}, [params._id]);

	async function payment() {
		try {
			const response = await axios.get(
				`/api/admin/payment?paid=${amount}&query=${params._id}`
				// `/api/users/details?paid=${amount}&query=${params._id}`
			);
			Popup('success', `payment of ${amount}`)
			// router.back();
			return;
			// setData(response.data.data);
			// if (response.data.status === 250) {
			// 	Popup("success", response.data.message);
			// 	console.log("really----");
			// 	// setRefresh(true)
			// }
		} catch {
			Popup("error", "something went wrong!!");
		}
	}

	async function disapproveUser() {
		try {
			const response = await axios.post(
				"/api/affiliate/disapproveUser", // Endpoint for disapproving users
				{ userId: params._id } // Pass the user ID
			);
			if (response.data.success) {
				Popup("success", response.data.message);
				// Optionally, you can refresh or redirect here
				router.push("/adminBookers/");
			} else {
				Popup("error", response.data.message);
			}
		} catch {
			Popup(
				"error",
				"Something went wrong while disapproving the user."
			);
		}
	}

	async function makeCollaborator() {
		try {
			const response = await axios.post(
				"/api/affiliate/makeCollaborator", // Endpoint for editing user type
				{ userId: params._id } // Pass the user ID
			);
			if (response.data.success) {
				Popup("success", response.data.message);
				// Optionally, you can refresh or redirect here
				router.push("/adminBookers/");
			} else {
				Popup("error", response.data.message);
			}
		} catch {
			Popup(
				"error",
				"Something went wrong while making the user a collaborator."
			);
		}
	}

	// console.log(data?.totalAmt);

	const buttonOperation = () => {
		if (overlayElement?.action === "payment") {
			if((data?.balance || 1) < Number(amount) || Number(amount) <= 0){
				Popup("warning", `keep it in the range of 0 to ${data?.balance}`)
				return;
			}
			payment();
		} else if (overlayElement?.action === "delete") {
			setDeleteOperation(true);
		} else if (overlayElement?.action === "dis-approve") {
			// setDis_approve(true);
			disapproveUser();
		} else if (overlayElement?.action === "make-collaborator") {
			// setDis_approve(true);
			makeCollaborator();
		}
		setListType("undelivered");
	};

	return (
		<>
			
			<Dialog>
				<DropdownMenu>
					<DialogContent className="bg-white rounded-[20px]">
						<DialogHeader>
							<DialogTitle>
								{overlayElement?.heading}
								{/* The pending amount is ₹
								{data?.totalAmt}
								{" + "}
								{data?.unpaid} */}
							</DialogTitle>
							<DialogDescription>
								{overlayElement?.desc}
								{/* Write the amount, you have paid
								to the user. */}
							</DialogDescription>
						</DialogHeader>
						<input
						
						//  max={data?.balance}
							type="number"
							className={`border border-solid rounded-[10px] px-3 py-2 ${
								overlayElement?.button ===
								"Confirm"
									? ""
									: "hidden"
							}`}
							placeholder="Paid Amount"
							value={amount}
							onChange={(e) =>
								setAmount(e.target.value)
							}
						/>
						<DialogFooter className=" gap-3">
							<DialogClose className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50">
								Cancel
							</DialogClose>
							<DialogClose
								className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50"
								onClick={buttonOperation}
							>
								{overlayElement?.button}
							</DialogClose>
						</DialogFooter>
					</DialogContent>
					<div className="max-w-6xl mx-auto">
						<div className="flex justify-between items-start md:items-center mb-4">
							<h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-gray-800 mb-4 md:mb-0">
								{data?.user?.name}
							</h1>
							<div className="flex space-x-4 md:space-x-3 sm:space-x-2">
								<DialogTrigger
									onClick={() =>
										setOverlayElement(
											paymentElement
										)
									}
									className="text-gray-700 border border-gray-300 rounded-[6px] px-3 py-2 md:px-2 md:py-1 sm:text-xs hover:bg-gray-100 transition-colors duration-200"
								>
									Pay
								</DialogTrigger>

								<DropdownMenuTrigger className=" text-gray-700 border border-gray-300 rounded-[6px] px-3 py-2 md:px-2 md:py-1 sm:text-xs hover:bg-gray-100 transition-colors duration-200">
									Action
								</DropdownMenuTrigger>

								{/* <DropdownMenuTrigger>
									Open
								</DropdownMenuTrigger> */}
								<DropdownMenuContent className="bg-white">
									<DropdownMenuItem
										className="cursor-pointer "
										onClick={() =>
											setOverlayElement(
												dis_approveAccountElement
											)
										}
									>
										<DialogTrigger>
											Dis-Approve
										</DialogTrigger>
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									<DropdownMenuItem
										className="cursor-pointer "
										onClick={() =>
											setOverlayElement(
												deleteAccountElement
											)
										}
									>
										<DialogTrigger>
											Delete Account
										</DialogTrigger>
									</DropdownMenuItem>

									<DropdownMenuSeparator />

									<DropdownMenuItem
										className="cursor-pointer "
										onClick={() =>
											setOverlayElement(
												makeCollaboratorElement
											)
										}
									>
										<DialogTrigger>
											Make
											Collaborator
										</DialogTrigger>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</div>
						</div>

						<div className="grid md:grid-cols-1 gap-8 md:gap-6 sm:gap-4 mb-8 md:mb-6 sm:mb-4">
							<InfoCard title="Personal Information">
								<InfoItem
									label="Name"
									value={data?.user.name}
								/>
								<InfoItem
									label="Email"
									value={data?.user.email}
								/>
								<InfoItem
									label="Contact"
									value={data?.user.contact}
								/>
							</InfoCard>
							<InfoCard title="Bank Details">
								<InfoItem
									label="Account Number"
									value={
										data?.user.accountNo
									}
								/>
								<InfoItem
									label="IFSC Code"
									value={data?.user.ifsc}
								/>
								<InfoItem
									label="UPI ID"
									value={data?.user.upi}
								/>
							</InfoCard>
						</div>

						<div className="bg-white shadow-lg rounded-[8px] overflow-hidden mb-8 md:mb-6 sm:mb-4">
							<div className="flex justify-start gap-4 p-4 border-b overflow-x-auto">
								{[
									"Delivered",
									"Undelivered",
									"Cancelled",
									"Wrong OTP",
									"Transactions",
								].map((status) => (
									<button
										key={status}
										onClick={() =>
											setListType(
												status.toLowerCase()
											)
										}
										className={`text-sm p-2 rounded-sm cursor-pointer whitespace-nowrap ${
											listType ===
											status.toLowerCase()
												? "bg-gray-100"
												: "hover:bg-gray-100"
										} sm:text-xs sm:p-1`}
									>
										{status}
									</button>
								))}
							</div>
							<div className="p-6 md:p-4 sm:p-3">
								{listType === "transactions" ? (
									<Transactions
										_id={params._id}
									/>
								) : (
									data && (
										<UserOrders
											data={
												data?.orderList
											}
											listType={
												listType
											}
										/>
									)
								)}
							</div>
						</div>
					</div>
				</DropdownMenu>
			</Dialog>
		</>
	);
};

export default Bookers;
