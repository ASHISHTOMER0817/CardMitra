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
	const [zipcode, setZipcode] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [name, setName] = useState("");
	// const [total, setTotal] = useState<number | null>();

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
	console.log(endDate);
	return (
		<div className="flex flex-col mx-auto">
			<Header
				className="sm:mb-4"
				heading={"Order History"}
				Children={
					<div className="flex gap-[10px] sm:w-full">
						<button
							onClick={() => window.print()}
							className={`px-3 py-1 gap-1 rounded-2xl cursor-pointer flex justify-center items-center text-sm hover:bg-gray-200 sm:px-3 sm:py-0 ${
								view === "grid" && "hidden"
							}`}
						>
							Print
						</button>
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

					<div className=" flex md:flex-col md:w-fit mb-7">
						<input
							className="mr-2"
							type="text"
							placeholder="pincode"
							value={zipcode}
							onChange={(e) =>
								setZipcode(e.target.value)
							}
						/>
						<input
							className="mr-2"
							type="text"
							placeholder="Name"
							value={name}
							onChange={(e) =>
								setName(e.target.value)
							}
						/>
						{/* <input type="Date" placeholder="start Date" value={startDate?.toString()} onChange={(e)=> setStartDate(new Date(e.target.value))}/>
							<input type="Date" placeholder="End Date" value={endDate?.toString()} onChange={(e)=> setEndDate(new Date(e.target.value))} /> */}
						{/* <div className="flex ml-auto w-fit"> */}
						<input
							className="md:mr-auto"
							type="date"
							placeholder="Start Date"
							value={
								startDate
									? startDate
											.toISOString()
											.substring(
												0,
												10
											)
									: ""
							}
							onChange={(e) =>
								setStartDate(
									e.target.value
										? new Date(
												e.target.value
										  )
										: null
								)
							}
						/>

						<div className="mx-4 text-gray-400">to</div>
						<input
							className="md:mr-auto"
							type="date"
							placeholder="End Date"
							value={
								endDate
									? endDate
											.toISOString()
											.substring(
												0,
												10
											)
									: ""
							}
							onChange={(e) =>
								setEndDate(
									e.target.value
										? new Date(
												e.target.value
										  )
										: null
								)
							}
						/>
						<div className="ml-auto">
							Total:{" "}
							{data.orders.reduce((sum, order) => {
								const orderedAt = new Date(
									order.orderedAt
								); // Assuming orderedAt is a property of product
								let show = true;

								if (
									(zipcode &&
										order.product
											.zipCode !==
											zipcode) ||
									(startDate &&
										orderedAt.valueOf() <=
											startDate.valueOf()) ||
									(endDate &&
										orderedAt.valueOf() >=
											endDate.valueOf()) ||
									(name &&
										(order.ordererName ||
											order.user.name) !==
											name)
								) {
									show = false;
								}

								return show
									? sum +
											(+order
												.product
												.price +
												+order
													.product
													.commission)
									: sum;
							}, 0)}
						</div>
						{/* </div> */}
					</div>

					{/*Latest Design changes */}
					<div className="">
						<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
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
											Return Amt
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Pincode
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Order ID
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
											Date
										</th>

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
												delivered,
												_id,
												ordererName,
											},
											index
										) => {
											let show =
												true;
											if (
												(zipcode &&
													product.zipCode !==
														zipcode) ||
												(startDate &&
													new Date(
														orderedAt
													).valueOf() <=
														startDate.valueOf()) ||
												(endDate &&
													new Date(
														orderedAt
													).valueOf() >=
														endDate.valueOf()) ||
												(name &&
													(ordererName ||
														user.name) !==
														name)
											)
												show =
													false;
											return (
												show && (
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
															{+product.price +
																+product.commission}
														</td>
														<td className="py-4 px-6 text-sm text-gray-500">
															{
																product.zipCode
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

														<td className="py-4 px-6 text-sm text-gray-500">
															<StatusBadge
																status={
																	delivered
																}
															/>
														</td>
													</tr>
												)
											);
										}
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
