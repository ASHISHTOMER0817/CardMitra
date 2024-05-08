"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
import Loader from "@/app/components/loader";
import productList from "@/interface/productList";
import axios from "axios";
import Link from "next/link";
import React, { Suspense, useEffect, useState } from "react";

const AdminOrderHistory = () => {
	const [data, setData] = useState<productList[]>();

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
		<ProductDisplayFormat
			heading={"Order History"}
			Children={
				<Link
					href="/adminAddProduct/newProduct"
					className="w-36 text-center md:p-1 md:text-xs py-3 px-4 text-white bg-primaryBgClr rounded-full"
				>
					Add Product
				</Link>
			}
		>
			{/* <Suspense fallback={<Loader />}> */}

			{!data ? (
				<Loader />
			) : data.length > 0 ? (
				<CardLayoutAdminDashboard data={data} />
			) : (
				<div className="text-red-500 text-sm mx-auto w-fit">
					Currently there are no orders
				</div>
			)}
			{/* </Suspense> */}
		</ProductDisplayFormat>
	);
};

export default AdminOrderHistory;
