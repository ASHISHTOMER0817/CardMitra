"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Popup from "./Popup";
import { useRouter } from "next/navigation";
import CopyDivToClipboard from "./CopyToClipboard";
import Link from "next/link";

const OtpForm = ({ _id }: { _id: string }) => {
	// const [deliveryStatus, setDeliveryStatus] = useState(false);
	// const [otp, setOtp] = useState("");
	// const [contact, setContact] = useState("");
	// const [trackingId, setTrackingId] = useState("");
	// const router = useRouter();
	// const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setOtp(e.target.value);
	// };

	// const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setContact(e.target.value);
	// };

	// const handleTrackingIdChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setTrackingId(e.target.value);
	// };
	// const order_id = _id;
	// const orderDetails = { otp, contact, trackingId, order_id };
	// const orderDetails = { order_id };

	// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	try {
	// 		const response = await axios.post(
	// 			"/api/users/OTPsubmission",
	// 			{ orderDetails }
	// 		);
	// 		// console.log(response)
	// 		// console.log("Submitting OTP:", otp);
	// 		// console.log("Submitting Contact:", contact);
	// 		console.log(response.data.success);
	// 		// Clear form fields after submission
	// 		if (response.data.success !== true) {
	// 			Popup("error", "Server side problem, try again");
	// 		} else {
	// 			Popup("success", "OTP submitted");
	// 			setTimeout(() => {
	// 				router.back();
	// 			}, 500);

	// 			setOtp("");
	// 			setContact("");
	// 			setTrackingId("");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		Popup("error", "Something went wrong, please refresh");
	// 	}
	// };

	// const openGoogleForm = () => {};
	return (
		<div
			className=" flex flex-col justify-start"
			// onSubmit={handleSubmit}
		>
			{/* <label htmlFor="otp">
				OTP <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="otp"
				placeholder="Enter OTP"
				value={otp}
				onChange={handleOtpChange}
				required
			/> */}
			<CopyDivToClipboard orderId={_id} />

			{/* <label htmlFor="contact">
				Contact <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="contact"
				placeholder="Contact"
				value={contact}
				onChange={handleContactChange}
				required
			/>

			<label htmlFor="trackingId">
				Tracking Id <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="trackingId"
				placeholder="Tracking ID"
				value={trackingId}
				onChange={handleTrackingIdChange}
				required
			/> */}

			<button
				className="text-white border rounded-3xl px-4 py-3 hover:bg-green-600 bg-primaryBgClr w-96 sm:w-48 sm:py-2"
				onClick={() => handleSubmit(false)}
			>
				{/* <Link
				href={
					"https://docs.google.com/forms/d/e/1FAIpQLSeHWBZSHdKOpVySmjtTKwRvBUt00SbySSSDWNThh6iLo0iOaQ/viewform?vc=0&c=0&w=1&flr=0"
				}
			> */}
				Proceed to google form
				{/* </Link> */}
			</button>
			<div
				onClick={() => handleSubmit(true)}
				className="cursor-pointer mx-auto mt-1 text-xs border-b border-b-gray-500 hover:border-b-gray-800 hover:text-gray-800 text-gray-500"
			>
				Click to confirm if the product got delivered
			</div>
		</div>
	);
};

export default OtpForm;
