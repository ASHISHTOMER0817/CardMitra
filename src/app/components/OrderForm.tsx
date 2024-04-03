import React from "react";

const OrderForm = () => {
	return (
		<form className="form flex flex-col justify-start">
			<label htmlFor="number">Order Number  <span className="text-red-500">*</span></label>
			<input type="text" placeholder="Order Number" />

			<label htmlFor="tracking">Tracking ID <span className="text-red-500">*</span></label>
			<input type="text" placeholder="Tracking ID" />

			<label htmlFor="date">Date of Delivery</label>
			<input type="date" placeholder="DD-MM-YYYY" />

			<label htmlFor="address">Address</label>
			<input type="text" placeholder="Address" />
			<button className="text-white border rounded-3xl py-4 px-3 bg-primaryBgClr w-96">Sumbit</button>
		</form>
	);
};

export default OrderForm;
