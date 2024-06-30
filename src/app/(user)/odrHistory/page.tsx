"use client";
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
import Header from "@/app/components/Header";
import { order, otp } from "@/interface/productList";
import Loader from "@/app/components/loader";
const OdrHistory = () => {
	// const [data, setData] = useState<order[]>();
	const [arr, setArr] = useState<order[][]>();
	const [listType, setListType] = useState("undelivered");
	// const newArr = [[[{}], [{}],], [[{}],[{}]]];
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/odrHistory`
				);
				const orderArr = response.data.data;
				console.log(orderArr);
				const newArr: order[][] = [];

				orderArr.forEach((order: order) => {
					const orderDate = new Date(order.orderedAt);
					const month = orderDate.getMonth();
					const year = orderDate.getFullYear();
					const index = newArr.findIndex(
						(group) =>
							new Date(
								group[0].orderedAt
							).getMonth() === month &&
							new Date(
								group[0].orderedAt
							).getFullYear() === year
					);

					if (index !== -1) {
						newArr[index].push(order);
					} else {
						newArr.push([order]);
					}
				});
				console.log("this is new arr", newArr);
				setArr(newArr);
				// setData(orderArr);
			} catch {
				console.log("please try again later");
			}
		}
		getData();
		// console.log("this is arr", arr);
	}, []);

	return (
		<div className="flex flex-col mx-auto px-4 sm:px-0">
			<Header
				heading={"Order History"}
				Children={
					<nav
						className="flex items-center gap-3 text-gray-800 sm:text-sm order-history-navbar overflow-auto"
						style={{ justifyContent: "space-evenly" }}
					>
						<div
							onClick={() => setListType("all")}
							className={`${
								listType === "all" &&
								"underline-offset-4 underline text-primaryBgClr"
							} hover:text-primaryBgClr cursor-pointer`}
						>
							All
						</div>
						<div
							onClick={() =>
								setListType("delivered")
							}
							className={`${
								listType === "delivered" &&
								"underline-offset-4 underline text-primaryBgClr"
							} hover:text-primaryBgClr cursor-pointer`}
						>
							Delivered
						</div>
						<div
							onClick={() =>
								setListType("undelivered")
							}
							className={`${
								listType === "undelivered" &&
								"underline-offset-4 underline text-primaryBgClr"
							} hover:text-primaryBgClr cursor-pointer`}
						>
							Undelivered
						</div>
						<div
							onClick={() =>
								setListType("cancelled")
							}
							className={`${
								listType === "cancelled" &&
								"underline-offset-4 underline text-primaryBgClr"
							}  hover:text-primaryBgClr cursor-pointer`}
						>
							Cancelled
						</div>
						<div
							onClick={() =>
								setListType("wrong OTP")
							}
							className={`${
								listType === "wrong OTP" &&
								"underline-offset-4 underline text-primaryBgClr"
							}  hover:text-primaryBgClr cursor-pointer sm:text-nowrap`}
						>
							wrong OTP
						</div>
					</nav>
				}
			/>

			{!arr ? (
				<Loader />
			) : arr.length < 1 ? (
				<div className="mx-auto w-fit text-red-500 font-serif my-20 sm:text-xs">
					You don&apos;t have any order history...
				</div>
			) : (
				<>
					{/*<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3 sm:gap-1 sm:grid-cols-2">
					{data.map(
						(
							{
								product,
								_id,
								otp,
								delivered,
								paid,
							},
							index
						) => {
							let show =
								listType === "all" ||
								listType === delivered;
							if (
								listType === "delivered" &&
								delivered === "unverified"
							) {
								show = true;
							}
							return (
								show && (
									<>
										<OrderHistory
											key={index}
											product={
												product
											}
											_id={_id}
											otp={otp}
											delivered={
												delivered
											}
											paid={paid}
										/>
									</>
								)
							);
						}
					)}
				</div> */}

					{arr.map((orderarr, index) => {
						let noOfOrders = 0;
						orderarr.forEach((order) => {
							if (
								listType === "all" ||
								listType === order.delivered ||
								(listType === "delivered" &&
									order.delivered ===
										"unverified")
							) {
								noOfOrders += 1;
							}
						});
						return (
							<div key={index}>
								{noOfOrders > 0 && (
									<div className="custom_dateShadow px-5 py-2 mb-5 w-fit sm:text-[12px] sm:py-0 sm:px-2 rounded-full ml-auto bg-transparent text-[#2F4F4F] text-base">
										{" "}
										{new Date(
											orderarr[0].orderedAt
										).toLocaleString(
											"default",
											{
												month: "long",
											}
										)}{" "}
										-{" "}
										{new Date(
											orderarr[0].orderedAt
										).getFullYear()}
									</div>
								)}
								{/* grid grid-flow-row gap-7 grid-cols-3 md:gap-3 sm:gap-1 sm:grid-cols-2 */}
								<div className="flex gap-6 flex-wrap justify-center">
									{orderarr.map(
										(
											{
												product,
												_id,
												otp,
												delivered,
												paid,
											},
											index
										) => {
											let show =
												listType ===
													"all" ||
												listType ===
													delivered;
											if (
												listType ===
													"delivered" &&
												delivered ===
													"unverified"
											) {
												show =
													true;
												// noOfOrders += 1;
											}
											return (
												show && (
													<>
														<OrderHistory
															key={
																index
															}
															product={
																product
															}
															_id={
																_id
															}
															otp={
																otp
															}
															delivered={
																delivered
															}
															paid={
																paid
															}
														/>
													</>
												)
											);
										}
									)}
								</div>
							</div>
						);
					})}
				</>
			)}
		</div>
	);
};

export default OdrHistory;
