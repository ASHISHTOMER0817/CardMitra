"use client";
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
import Header from "@/app/components/Header";
import { order, otp } from "@/interface/productList";
import Loader from "@/app/components/loader";
const OdrHistory = () => {
	const [data, setData] = useState<order[]>([]);
	const [otpData, setOtpData] = useState<otp[]>([]);
	const [listType, setListType] = useState("undelivered");

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/odrHistory?listType=${listType}`
				);
				console.log(response.data.data);
				if (listType === "cancelled" || listType === "wrong OTP") {
					setOtpData(response.data.data);
				}
				setData(response.data.data);
			} catch {
				console.log("please try again later");
			}
		}
		getData();
	}, [listType]);
	return (
		<div className="flex flex-col mx-auto w-[90%]">
			<Header
				heading={"Order History"}
				Children={
					<nav className="flex justify-end items-center gap-3 text-gray-800">
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
							}  hover:text-primaryBgClr cursor-pointer`}
						>
							wrong OTP
						</div>
					</nav>
				}
			/>
			<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3">
				{" "}
				{(listType === "cancelled" ||
				listType === "wrong OTP") ? (
					!otpData ? (
						<Loader />
					) : data.length < 1 ? (
						<div className="mx-auto w-fit text-red-500 font-serif my-20">
							You don&apos;t have any order
							history...
						</div>
					) : (
						otpData?.map(({ orderObjectId }, index) => {
							const {
								product,
								_id,
								otp,
								delivered,
							} = orderObjectId;
							return (
								<>
									<OrderHistory
										key={index}
										product={product}
										_id={_id}
										otp={otp}
										delivered={
											delivered
										}
									/>
								</>
							);
						})
					)
				) : !data ? (
					<Loader />
				) : data.length < 1 ? (
					<div className="mx-auto w-fit text-red-500 font-serif my-20">
						You don&apos;t have any order history...
					</div>
				) : (
					data.map(
						(
							{ product, _id, otp, delivered },
							index
						) => {
							return (
								<OrderHistory
									key={index}
									product={product}
									_id={_id}
									otp={otp}
									delivered={delivered}
								/>
							);
						}
					)
				)}
			</div>
			{/* <div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3">
				{listType === "cancelled" ||
				listType === "wrong OTP" ? (
					!otpData ? (
						<Loader />
					) : (
						otpData.map(({ orderObjectId }, index) => (
							<OrderHistory
								key={index}
								{...orderObjectId}
							/>
						))
					)
				) : listType === "delivered" ? (
					!data ? (
						<Loader />
					) : (
						data.map(
							(
								{
									product,
									_id,
									otp,
									delivered,
								},
								index
							) => (
								<OrderHistory
									key={index}
									product={product}
									_id={_id}
									otp={otp}
									delivered={delivered}
								/>
							)
						)
					)
				) : // Default case (listType === 'undelivered' or 'all')
				data.length < 1 ? (
					<div className="mx-auto w-fit text-red-500 font-serif my-20">
						You don&apos;t have any order history...
					</div>
				) : (
					data.map(
						(
							{ product, _id, otp, delivered },
							index
						) => (
							<OrderHistory
								key={index}
								product={product}
								_id={_id}
								otp={otp}
								delivered={delivered}
							/>
						)
					)
				)}
			</div> */}
		</div>
	);
};

export default OdrHistory;
