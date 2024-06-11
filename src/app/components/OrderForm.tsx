"use client";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Popup from "./Popup";

const OrderForm = ({ objectId }: { objectId: string }) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [deliveryDate, setDeliveryDate] = useState(Date);
	// const [address, setAddress] = useState("");
	const router = useRouter();

	const handleOrderNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOrderNumber(e.target.value);
	};

	const handleDeliveryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDeliveryDate(e.target.value);
	};

	// const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	setAddress(e.target.value);
	// };

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const formData = {
				orderNumber,
				deliveryDate,
				objectId,
			};
			const response = await axios.post("/api/users/orderForm", {
				formData,
			});
			const message = response.data.message;
			const status = response.data.status;

			if (status === 400) {
				Popup("info", message);
				return;
			}
			if (status === 500) {
				Popup("error", message);
				return;
			}

			Popup("success", message);
			// console.log(response.data);
			setTimeout(() => {
				router.back();
			}, 2000);
		} catch {
			Popup("error", "Failed to submit form, please try again");
			console.log("Failed to submit form, please try again");
		}

		// Reset the form fields after submission (optional)
		setOrderNumber("");
		setDeliveryDate("");
		// setAddress("");
	};

	return (
		<form
			className="form flex flex-col justify-start"
			onSubmit={handleSubmit}
		>
			<label htmlFor="number">Order Number</label>
			<input
				type="text"
				placeholder="Order Number"
				value={orderNumber}
				onChange={handleOrderNumberChange}
				required
				style={{width: '100% !important'}}
			/>

			<label htmlFor="date">Date of Delivery</label>
			<input
				type="date"
				placeholder="DD-MM-YYYY"
				value={deliveryDate}
				onChange={handleDeliveryDateChange}
				required
				style={{width: '100% !important'}}
			/>

			{/* <label htmlFor="address">Address</label> */}
			{/* <input
				type="text"
				placeholder="Address"
				value={address}
				onChange={handleAddressChange}
				required
				style={{width: '100% !important'}}
			/> */}

			<button
				type="submit"
				className="text-white border rounded-3xl py-4 px-3 hover:bg-green-600 bg-primaryBgClr w-96 sm:w-48 sm:py-2" style={{alignSelf: 'center'}}
			>
				Submit
			</button>
		</form>
	);
};

export default OrderForm;
