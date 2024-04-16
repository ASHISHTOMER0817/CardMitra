"use client";
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
const OdrHistory = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/odrHistory"
				);
				setData(response.data.data);
			} catch {
				console.log("please try again later");
			}
		}
		getData();
	}, []);
	return (
		<div className="mx-8">
			<h2 className="my-7 ">Order History</h2>
			<div className="grid grid-flow-row gap-7 grid-cols-3">
				<OrderHistory data={data} />
			</div>
		</div>
	);
};

export default OdrHistory;
