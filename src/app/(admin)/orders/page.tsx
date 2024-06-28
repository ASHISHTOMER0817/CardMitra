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
		<div className="flex flex-col mx-auto">
			<Header
				className="sm:mb-4"
				heading={"Order History"}
				Children={
					<div className="flex gap-[10px] sm:w-full">
						<div
							onClick={() => setView("list")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-nowrap ${
								view === "list" &&
								"bg-gray-200 rounded-2xl"
							}`}
						>
							<IoGridOutline />
							<div> List view</div>
						</div>
						<div
							onClick={() => setView("grid")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-nowrap ${
								view === "grid" &&
								"bg-gray-200 rounded-2xl"
							}`}
						>
							<IoListOutline />
							<div>Grid view</div>
						</div>
						<Link
							href="/adminAddProduct/newProduct"
							className="w-36 text-center ml-auto-small md:p-1 md:text-sm py-3 px-4 text-white bg-primaryBgClr hover:bg-green-600 rounded-full sm:w-[8rem]"
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
					<div className="flex flex-wrap justify-center gap-4 transition-all">
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
					{/* <div className="overflow-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										User
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Device
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Order ID
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Delivery Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
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
											className={
												index %
													2 ===
												0
													? "bg-white"
													: "bg-gray-50"
											}
										>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{
													user.name
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{
													product.name
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{new Date(
													orderedAt
												).toDateString()}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{
													deliveryDate
												}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
					</div> */}

					{/*Latest Design changes */}
					<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
						{/* <h1 className="text-2xl font-semibold mb-6">
							Order List
						</h1> */}
						<div className="overflow-x-auto bg-white shadow-md rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 text-nowrap">
								<thead className="bg-green-100">
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Affiliate
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Device
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Order ID
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Date
										</th>
										{/* <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Delivery Date
										</th> */}
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Status
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{data.orders.map(
										(
											{
												user,
												product,
												orderedAt,
												// deliveryDate,
												delivered,
												_id,
											},
											index
										) => (
											<tr
												key={
													index
												}
												className={
													index %
														2 ===
													0
														? "bg-gray-100"
														: "bg-white"
												}
											>
												<td className="py-4 px-6 text-sm font-semibold text-primaryBgClr">
													{
														user.name
													}
												</td>
												<td className="py-4 px-6 text-sm text-gray-500">
													{
														product.name
													}
												</td>
												<td className="py-4 px-6 text-sm text-gray-500">
													<span
														className="block overflow-hidden text-ellipsis whitespace-nowrap"
														title={
															_id
														}
													>
														{
															_id
														}
													</span>
												</td>
												<td className="py-4 px-6 text-sm text-gray-500">
													{new Date(
														orderedAt
													).toDateString()}
												</td>
												{/* <td className="py-4 px-6 text-sm text-gray-500">
													{
														deliveryDate
													}
												</td> */}
												<td className="py-4 px-6 text-sm text-gray-500">
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
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default AdminOrderHistory;
