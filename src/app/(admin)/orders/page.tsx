"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import Header from "@/app/components/Header";
import Loader from "@/app/components/loader";
import productList from "@/interface/productList";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { IoListOutline } from "react-icons/io5";

const AdminOrderHistory = () => {
	const [data, setData] = useState<productList[]>();
	const [view, setView] = useState("");

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
		<div className="flex flex-col mx-auto w-[85%]">
			<Header
				heading={"Order History"}
				Children={
					<>
						<Link
							href="/adminAddProduct/newProduct"
							className="w-36 text-center md:p-1 md:text-xs py-3 px-4 text-white bg-primaryBgClr rounded-full"
						>
							Add Product
						</Link>
						<div
							onClick={() => setView("list")}
							className={`px-3 py-1 flex justify-center items-center text-sm border border-black hover:bg-gray-200 ${
								view === "list" && "bg-gray-500"
							}`}
						>
							<IoGridOutline />
							<div> List view</div>
						</div>
						<div
							onClick={() => setView("grid")}
							className={`px-3 py-1 flex justify-center items-center text-sm border border-black hover:bg-gray-200 ${
								view === "grid" && "bg-gray-500"
							}`}
						>
							<IoListOutline />
							<div>Grid view</div>
						</div>
					</>
				}
			/>
			{!data ? (
				<Loader />
			) : data.length > 0 ? (
				<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3">
					<CardLayoutAdminDashboard data={data} />
				</div>
			) : (
				<div className="text-red-500 text-sm mx-auto w-fit font-serif">
					Currently there are no orders
				</div>
			)}
		</div>
	);
};

export default AdminOrderHistory;
