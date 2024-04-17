'use client'
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

const OrderForm = ({ objectId }:{objectId:string}) => {
	const [orderNumber, setOrderNumber] = useState("");
	const [deliveryDate, setDeliveryDate] = useState(Date);
	const [address, setAddress] = useState("");

	const handleOrderNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
		setOrderNumber(e.target.value);
	};

	const handleDeliveryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDeliveryDate(e.target.value);
	};

	const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAddress(e.target.value);
	};

	const handleSubmit = async(e: FormEvent) => {
		e.preventDefault();

		try{
			const formData = {
				orderNumber,
				deliveryDate,
				address,
				objectId, // Include the objectId prop in the formData
			};
			const response = await axios.post("/api/users/orderForm", {formData})
			console.log(response.data)

		}catch{
			console.log("Failed to perform operation, please try again later")
		}
		
		// Reset the form fields after submission (optional)
		setOrderNumber("");
		setDeliveryDate("");
		setAddress("");
	};

	return (
		<form
			className="form flex flex-col justify-start"
			onSubmit={handleSubmit}
		>
			<label htmlFor="number">
				Order Number <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				placeholder="Order Number"
				value={orderNumber}
				onChange={handleOrderNumberChange}
				required
			/>

			<label htmlFor="date">Date of Delivery</label>
			<input
				type="date"
				placeholder="DD-MM-YYYY"
				value={deliveryDate}
				onChange={handleDeliveryDateChange}
			/>

			<label htmlFor="address">Address</label>
			<input
				type="text"
				placeholder="Address"
				value={address}
				onChange={handleAddressChange}
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

export default OrderForm;
