"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import Header from "@/app/components/Header";
import StatusBadge from "@/app/components/StatusBadge";
import Loader from "@/app/components/loader";
import productList, { order } from "@/interface/productList";
import { Product } from "@/models/userModel";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { IoListOutline } from "react-icons/io5";

interface joint {
	orderHistory: productList[];
	orders: order[];
}
const AdminOrderHistory = () => {
	const [data, setData] = useState<joint>();
	const [view, setView] = useState("grid");

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
		<div className="flex flex-col mx-auto w-[90%] sm:mx-0 sm:w-[90%]">
			<Header
				className="sm:mb-4"
				heading={"Order History"}
				Children={
					<div className="flex gap-[10px]">
						<div
							onClick={() => setView("list")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm border border-black hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-xs sm:text-nowrap ${
								view === "list" && "bg-gray-200"
							}`}
						>
							<IoGridOutline />
							<div> List view</div>
						</div>
						<div
							onClick={() => setView("grid")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm border border-black hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-xs sm:text-nowrap ${
								view === "grid" && "bg-gray-200"
							}`}
						>
							<IoListOutline />
							<div>Grid view</div>
						</div>
						<Link
							href="/adminAddProduct/newProduct"
							className="w-36 text-center md:p-1 md:text-xs py-3 px-4 text-white bg-primaryBgClr hover:bg-green-600 rounded-full sm:w-[8rem]"
						>
							Add Product
						</Link>
					</div>
				}
			/>

			{!data ? (
				<Loader />
			) : view === "grid" ? (
				data.orderHistory.length < 1 ? (
					<div className="text-red-500 text-sm mx-auto w-fit font-serif">
						Currently there are no orders
					</div>
				) : (
					<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3 transition-all sm:grid-cols-2">
						{data.orderHistory.map(
							(
								data: productList,
								index: number
							) => {
								return (
									<CardLayoutAdminDashboard
										key={index}
										data={data}
									/>
								);
							}
						)}
						{/* <CardLayoutAdminDashboard
							data={data.orderHistory}
						/> */}
					</div>
				)
			) : data.orderHistory.length < 1 ? (
				<div className="text-red-500 text-sm mx-auto w-fit font-serif">
					Currently there are no orders
				</div>
			) : (
				<>
					<table className="w-full rounded-2xl overflow-hidden text-nowrap transition-all sm:text-wrap">
						<thead>
							<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
								<th className="py-4 px-12 text-left sm:pr-0.5 sm:pl-2 sm:py-1">
									Affiliate
								</th>
								<th className="py-4 px-12 text-left sm:px-0.5 sm:py-1">
									Device
								</th>
								<th className="py-4 px-12 text-left sm:px-0.5 sm:py-1">
									Order ID
								</th>
								<th className="py-4 px-12 text-left sm:px-0.5 sm:py-1">
									Order on
								</th>
								<th className="py-4 px-12 text-left sm:px-0.5 sm:py-1">
									Delivery on
								</th>
								<th className="py-4 px-12 text-left sm:px-0.5 sm:py-1">
									Order Status
								</th>
							</tr>
						</thead>
						<tbody>
							{data.orders.map(
								(
									{
										user,
										product,
										orderedAt,
										deliveryDate,
										delivered,
										_id,
									},
									index
								) => (
									<tr
										key={index}
										className="even:bg-gray-100 sm:text-[8px]"
									>
										<td className="py-4 px-12 font-semibold sm:px-0.5 sm:py-1">
											{user.name}
										</td>
										<td className="py-4 px-12 sm:px-0.5 sm:py-1">
											{product.name}
										</td>
										<td className="py-4 px-12 text-sm sm:px-0.5 sm:py-1 sm:text-[8px]">
											{(() => {
												const midIndex =
													Math.floor(
														_id.length /
															2
													);
												const firstHalf =
													_id.slice(
														0,
														midIndex
													);
												const secondHalf =
													_id.slice(
														midIndex
													);

												return (
													<>
														{
															firstHalf
														}
														<br />
														{
															secondHalf
														}
													</>
												);
											})()}
										</td>
										<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
											{new Date(
												orderedAt
											).toDateString()}
										</td>
										<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
											{deliveryDate}
										</td>
										<td className="py-4 px-12 sm:px-0.5 sm:py-0">
											{/* {delivered} */}
											<StatusBadge
												status={
													delivered
												}
											/>
										</td>
									</tr>
								)
							)}
						</tbody>
					</table>
				</>
			)}
		</div>
	);
};

export default AdminOrderHistory;
