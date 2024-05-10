"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import Header from "@/app/components/Header";
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
		<div className="flex flex-col mx-auto w-11/12">
			<Header
				heading={"Order History"}
				Children={
					<Link
						href="/adminAddProduct/newProduct"
						className="w-36 text-center md:p-1 md:text-xs py-3 px-4 text-white bg-primaryBgClr rounded-full"
					>
						Add Product
					</Link>
				}
			/>
			<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3">
				{!data ? (
					<Loader />
				) : data.length > 0 ? (
					<CardLayoutAdminDashboard data={data} />
				) : (
					<div className="text-red-500 text-sm mx-auto w-fit font-serif">
						Currently there are no orders
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminOrderHistory;
