"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
import productList from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";

// interface OrderHistory {
// 	product: productList;
// }
const AdminOrderHistory = () => {
	const [data, setData] = useState<productList[]>([]);

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/admin/dashboard?query=orderHistory"
				);
				console.log(response.data.data);
				setData(response.data.data);
			} catch {
				console.log("what is happening here !!");
			}
		}
		getData();
	}, []);

	return (
		<ProductDisplayFormat heading={"Order History"}>
			<CardLayoutAdminDashboard data={data} />
		</ProductDisplayFormat>
	);
};

export default AdminOrderHistory;
