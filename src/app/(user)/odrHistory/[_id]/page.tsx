"use client";
import ProductDetails from "@/app/components/ProductDetails";
import productList, { order } from "@/interface/productList";
import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import BackwardButton from "@/app/components/BackwardButton";
import Loader from "@/app/components/loader";
import { MyArrayItem } from "../../deals/[placeorder]/page";
import CopyDivToClipboard from "@/app/components/CopyToClipboard";
import Popup from "@/app/components/Popup";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
	DialogOverlay,
	DialogPortal
} from "@/components/ui/dialog";
import Link from "next/link";
// import { DialogOverlay } from "@radix-ui/react-dialog";

const SubmitOTP = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<order>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);

	const [orderBy, setOrderBy] = useState('');
	const [orderID, setOrderID] = useState('');
	const [trackingID, setTracking] = useState('');
	const [otp, setOTP] = useState('');
	const [last4digits, setLast4digits] = useState(Number);

	const [deliveryDate, setDeliveryDate] = useState(new Date());
	
	const router = useRouter();

	async function getData() {
		try {
			console.log("starts");
			const response = await axios.get(
				`/api/users/orderData?odrId=${params._id}`
			);
			console.log(response.data.data);
			const { info } = response.data.data.product;
			// console.log(info);
			setArr(Object.entries(info));
			// setOtpStatus(response.data.data.otp);
			setData(response.data.data);

			console.log("end here");
			return;
		} catch {
			console.log(
				"something went wrong please try again later"
			);
		}
	}

	useEffect(() => {
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params._id]);

	const deleteOrder = async () => {
		try {

			const decision = confirm("Are you sure you want to delete this order");
			if(!decision)return;

			const response = await axios.delete(`/api/users/deleteOrder/`, {
				data: { orderId: params._id } // Send orderId in the request body
			});
			
			if (response.data.success) {
				// Handle successful deletion (e.g., redirect or show a success message)
				router.push('/odrHistory'); // Redirect to a success page or wherever you want
			} else {
				// Handle errors
				alert(response.data.message);
			}
		} catch (error) {
			console.error("Error deleting the order:", error);
			alert("An error occurred while trying to delete the order.");
		}
	};

	const editOrderDetails = async () =>{
		try {
			console.log("starts");
			const response = await axios.post(
				`/api/orders/editDetails?odrId=${params._id}`,
				{orderBy, orderID, trackingID, otp, last4digits}
			);
			if (response.data.success) {
				Popup("success", response.data.message);
				getData();
			} else {
				Popup("error", response.data.message);
			}
			return;
		} catch {
			console.log(
				"something went wrong please try again later"
			);
			Popup("error", 'something went wrong please try again later');
		}
	}

	const onEditClick = () =>{
		setOrderBy(data?.ordererName || '');
		setOrderID(data?.orderId || '');
		setTracking(data?.trackingID || '');
		setOTP(data?.otp || '');
		setLast4digits(data?.last4digits || 0);
	}
	
	const onEditDeliveryClick = () =>{
		setDeliveryDate(data?.deliveryDate || new Date());
	}
	  
	const editOrderDelivery = async () =>{
		try {
			
			const response = await axios.post(
				`/api/orders/deliverySubmission?odrId=${params._id}`,
				{deliveryDate}
			);
			if (response.data.success) {
				Popup("success", response.data.message);
				getData();
			} else {
				Popup("error", response.data.message);
			}
			return;
		} catch {
			console.log(
				"something went wrong please try again later"
			);
			Popup("error", 'something went wrong please try again later');
		}
	}

	return (
		<div>
			<div className="w-full sm:ml-0">
				
				<BackwardButton />
				{!data ? (
					<Loader />
				) : (
					<>
						{data?.delivered !== 'delivered' && (
							<div className="flex mb-2 sm:mb-0">
								<button
									onClick={deleteOrder}
									className="ml-auto text-red-500 sm:mx-auto"
								>
									Delete Order
								</button>
							</div>
						)}

						<section className="flex items-start text-sm justify-around flex-wrap gap-4">

							<div className="flex flex-col items-start justify-around sm:gap-0">
								<ProductDetails
									observer="user"
									data={data?.product}
									arr={arr}
								/>
							</div>
							
							<div className="border px-10 py-7 rounded-2xl sm:px-4 sm:py-4 sm:w-full">
								<div className="text-base font-semibold text-primaryBgClr text-center">
									Order Details
								</div>
								<hr className="my-5 sm:my-2" />

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Order By:
									</span>
									<span className="ml-auto pl-4">
										{data?.ordererName}
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Order Date:
									</span>
									<span className="ml-auto pl-4">
										{new Date(
											data?.orderedAt
										).toDateString()}
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Order ID: 
									</span>
									<span className="ml-auto pl-4">
										{data?.orderId}
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Tracking ID: 
									</span>
									<span className="ml-auto pl-4">
										{data?.trackingID}
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										OTP:
									</span>
									<span className="ml-auto pl-4">
										{data?.otp}
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										OTP Submission Date:
									</span>
									<span className="ml-auto pl-4">
										{
											data?.otpDate ?
												new Date(data.otpDate).toDateString()
											:
												''
										}
										
									</span>
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Mobile no. last 4 digits:
									</span>
									<span className="ml-auto pl-4">
										{data?.last4digits} 
									</span>
									
								</div>

								<div className="mt-3 mr-auto flex text-sm font-semibold text-gray-500">
									<span>
										Delivery Date:
									</span>
									<span className="ml-auto pl-4">
										{

											data?.deliveryDate?
												typeof(data?.deliveryDate) == 'string' ?
												 	new Date(data?.deliveryDate).toDateString()
													: 
													data?.deliveryDate.toDateString()
											:
											''
										}
									</span>
									
								</div>

								{data?.delivered !== 'delivered' && (
									<Dialog>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Edit Order Details
												</DialogTitle>
												{/* <DialogDescription>
												</DialogDescription> */}
											</DialogHeader>

											<label
												htmlFor="orderBy"
												className="font-bold sm:text-[13px]"
											>
												Order By:
											</label>
											<input
												required
												id="orderBy"
												type="text"
												value={orderBy}
												onChange={(e)=>setOrderBy(e.target.value)}
												className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												placeholder="Order By"
											/>

											<label
												htmlFor="orderID"
												className="font-bold sm:text-[13px]"
											>
												Order ID:
											</label>
											<input
												required
												id="orderID"
												type="text"
												value={orderID}
												onChange={(e)=>setOrderID(e.target.value)}
												className="border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												placeholder="Order ID"
											/>

											<label
												htmlFor="trackingID"
												className="font-bold sm:text-[13px]"
											>
												Tracking ID:
											</label>
											<input
												required
												id="trackingID"
												type="text"
												value={trackingID}
												onChange={(e)=>setTracking(e.target.value)}
												className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												placeholder="Tracking ID"
											/>

											<label
												htmlFor="otp"
												className="font-bold sm:text-[13px]"
											>
												OTP:
											</label>
											<input
												required
												id="otp"
												type="text"
												value={otp}
												onChange={(e)=>setOTP(e.target.value)}
												className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												placeholder="OTP"
											/>

											<label
												htmlFor="last4digits"
												className="font-bold sm:text-[13px]"
											>
												Mobile No. last 4 digits:
											</label>
											<input
												required
												id="last4digits"
												type="number"
												value={last4digits}
												onChange={(e)=>setLast4digits(parseInt(e.target.value))}
												className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												placeholder="Last 4 digits"
											/>
											
											<DialogFooter className=" gap-3">
												<DialogClose className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50">
													Cancel
												</DialogClose>
												<DialogClose
													className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50"
													onClick={editOrderDetails}
												>
													Submit
												</DialogClose>
											</DialogFooter>

										</DialogContent>
										<DialogTrigger onClick={onEditClick} className="text-primaryBgClr border-primaryBgClr border order-form rounded-2xl py-2 px-4 sm:w-48 sm:py-2 mt-3 mx-auto w-full font-medium">
											Edit Details
										</DialogTrigger>
									</Dialog>
								)}

								{data?.otp && data?.delivered !== 'delivered' && (
									<Dialog>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>
													Edit Submission Details
												</DialogTitle>
												{/* <DialogDescription>
												</DialogDescription> */}
											</DialogHeader>

											<label
												htmlFor="deliveryDate"
												className="font-bold sm:text-[13px]"
											>
												Delivery Date:
											</label>
											<input
												required
												id="deliveryDate"
												type="date"
												value={deliveryDate.toDateString()}
												onChange={(e)=>setDeliveryDate(new Date(e.target.value))}
												className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
												
											/>

											<DialogFooter className=" gap-3">
												<DialogClose className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50">
													Cancel
												</DialogClose>
												<DialogClose
													className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50"
													onClick={editOrderDelivery}
												>
													Submit
												</DialogClose>
											</DialogFooter>

										</DialogContent>
										<DialogTrigger onClick={onEditDeliveryClick} className="text-primaryBgClr border-primaryBgClr border order-form rounded-2xl py-2 px-4 sm:w-48 sm:py-2 mt-3 mx-auto w-full font-medium">
											Mark as Delivered
										</DialogTrigger>
									</Dialog>
								)}

							</div>
						</section>
					</>
				)}
			</div>
		</div>
	);
};

export default SubmitOTP;
