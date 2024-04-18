"use client";
import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";

const OtpForm = ({ _id }: { _id: string }) => {
	const [otp, setOtp] = useState('');
	const [contact, setContact] = useState("");
	const [trackingId, setTrackingId] = useState("");

	const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
	};

	const handleContactChange = (e: ChangeEvent<HTMLInputElement>) => {
		setContact(e.target.value);
	};

	const handleTrackingIdChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTrackingId(e.target.value);
	};

	const orderDetails = { otp, contact, trackingId, _id };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await axios.post("/api/users/orderObjectId", {orderDetails});
			console.log(response)
			console.log("Submitting OTP:", otp);
			console.log("Submitting Contact:", contact);
			// Clear form fields after submission
			setOtp('');
			setContact("");
			setTrackingId("")
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<form
			className="form flex flex-col justify-start"
			onSubmit={handleSubmit}
		>
			<label htmlFor="otp">
				OTP <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="otp"
				placeholder="Enter OTP"
				value={otp}
				onChange={handleOtpChange}
				required
			/>

			<label htmlFor="contact">
				Contact <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				id="contact"
				placeholder="Enter Contact Number"
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
				placeholder="Enter Contact Number"
				value={trackingId}
				onChange={handleTrackingIdChange}
				required
			/>

			<button
				type="submit"
				className="text-white border rounded-3xl py-4 px-3 bg-primaryBgClr w-96"
			>
				Submit
			</button>
		</form>
	);
};

export default OtpForm;
