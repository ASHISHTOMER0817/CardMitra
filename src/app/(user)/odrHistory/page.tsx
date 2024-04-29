'use client'
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
const OdrHistory = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/odrHistory"
				);
				console.log(response.data.data);
				setData(response.data.data);
			} catch {
				console.log("please try again later");
			}
		}
		getData();
	}, []);
	return (
		<div className="mx-8">
			<ProductDisplayFormat heading={"Order History"}>
				{" "}
				<OrderHistory data={data} />
			</ProductDisplayFormat>
		</div>
	);
};

export default OdrHistory;
