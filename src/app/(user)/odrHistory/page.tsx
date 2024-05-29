"use client";
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
import Header from "@/app/components/Header";
import { order, otp } from "@/interface/productList";
import Loader from "@/app/components/loader";
const OdrHistory = () => {
	const [data, setData] = useState<order[]>();

	const [listType, setListType] = useState("undelivered");

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/odrHistory`
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
		<div className="flex flex-col mx-auto">
			<Header
				heading={"Order History"}
				Children={
					<nav className="flex justify-end items-center gap-3 text-gray-800 sm:text-xs">
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

			{!data ? (
				<Loader />
			) : data.length < 1 ? (
				<div className="mx-auto w-fit text-red-500 font-serif my-20 sm:text-xs">
					You don&apos;t have any order history...
				</div>
			) : (
				<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3 sm:gap-1 sm:grid-cols-2">
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
								delivered === "un-verified"
							) {
								show = true;
							}
							// if(listType === 'delivered')
							return (
								show && (
									<OrderHistory
										key={index}
										product={product}
										_id={_id}
										otp={otp}
										delivered={
											delivered
										}
										paid={paid}
									/>
								)
							);
						}
					)}
				</div>
			)}
		</div>
	);
};

export default OdrHistory;
