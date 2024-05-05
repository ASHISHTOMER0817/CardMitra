"use client";
import ProductDetails from "@/app/components/ProductDetails";
import ProductOrderList from "@/app/components/ProductOrderList";
import productList from "@/interface/productList";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackwardButton from "@/app/components/BackwardButton";
import phoneImage from "@/../public/phoneImage.jpg";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import Popup from "@/app/components/Popup";

const OrderList = ({ params }: { params: { odrList: string } }) => {
	const [data, setData] = useState<productList>();
	const [arr, setArr] = useState<string[]>([]);
	const [_id, setId] = useState("");

	// Fetching product details
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/productData?query=${params.odrList}`
				);
				// console.log(await response.data.data.info);
				const { first, second, third, fourth } = await response
					.data.data.info;
				setArr(
					(arr) =>
						(arr = [
							...arr,
							first,
							second,
							third,
							fourth,
						])
				);
				setData(await response.data.data);
				setId(await response.data.data._id);
				console.log(arr,)
			} catch {
				console.log(
					"something went wrong, please try again later"
				);
				Popup('error', "Something went wrong")
				return 
			}
		}
		getData();
	}, [params.odrList]);

	async function dealOperation(_id: string, operation: string) {
		try {
			const response = await axios.get(
				`/api/admin/dashboard?_id=${_id}&operation=${operation}`
			);

			if (response.data.success) {
				Popup("success", await response.data.message);
			} else Popup("error", response.data.message);
		} catch {
			Popup("error", "Something went wrong, please refresh");
		}
	}

	// Fetching creating an array for list of points
	// useEffect(() => {
	// 	function appendPoints() {
	// 		if (data && data.info) {
	// 			const { first, second, third, fourth } = data.info;
	// 			console.log(first, second, third, fourth);

	// 			const check =(point:string)=> {
	// 				if (point) {
	// 					setArr((arr) => [...arr, point]);
	// 				}
	// 			}

	// 			check(first);
	// 			check(second);
	// 			check(third);
	// 			check(fourth);
	// 		}
	// 	}

	// 	appendPoints();
	// 	console.log(arr);
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

	return (
		<div className="m-10 flex flex-col mx-auto w-4/5 gap-9">
			<BackwardButton />
			<div className="flex justify-between items-start">
				<div>
					<section className=" text-left">
						<div className="bg-[#FC08081A] text-[#FC0808] text-center px-4 py-1 mb-3 rounded-full">
							Quantity left: {data?.requirement}{" "}
						</div>
						<div className="flex gap-10 justify-start items-start">
							<Image
								className=" w-40"
								src={phoneImage}
								alt={""}
							/>
							<div className="flex flex-col gap-5 justify-center">
								<div className="text-left">
									<h4 className="font-semibold mb-2">
										{data?.name}
									</h4>
								</div>
								<div>
									<div className="flex items-start gap-3">
										<div className="">
											<div className="font-semibold text-primaryBgClr">
												{
													data?.price
												}
											</div>
											<div className="md:text-xs">
												Price/
												Unit
											</div>
										</div>
										<Image
											src={
												cardVerticalLine
											}
											alt={""}
										/>
										<div className="">
											<div className="font-semibold text-red-500">
												{
													data?.commission
												}
											</div>
											<div className="md:text-xs">
												Commission
											</div>
										</div>
									</div>
								</div>
								{arr.length > 0 && (
									<div className="flex flex-col gap-4 items-start">
										<div>
											Keep in mind
											while ordering
											:-
										</div>
										<ul className="flex flex-col gap-1">
											{arr.map(
												(
													e,
													index
												) => {
													return (
														<li
															key={
																index
															}
														>
															{
																e
															}
														</li>
													);
												}
											)}
										</ul>
									</div>
								)}
							</div>
						</div>
					</section>
					<div className="w-full flex justify-between items-start">
						<div>
							<h6 className="mb-2">
								bank cards to use
							</h6>
							<div className="text-gray-500 font-semibold">
								Amazon Pay
							</div>
							<div className="text-gray-500 font-semibold">
								Amazon Pay
							</div>
						</div>
						<div>
							<h6 className="mb-2">Website</h6>

							<Link
								className="text-primaryBgClr font-semibold hover:text-green-800"
								href={
									data?.productLink
										? data?.productLink
										: "#"
								}
							>
								{data?.site}
							</Link>
						</div>
					</div>
					<section className="text-wrap flex text-gray-600 text-sm  flex-col justify-start mt-3 gap-2">
						<div className=" text-black text-lg">
							Address
						</div>
						{data?.address}
					</section>
				</div>
				<div className={`flex ${!data?.deals ?'items-start':'items-center'} justify-center gap-5`}>
					<Link
						href={`/adminAddProduct/${data?._id}`}
						className="rounded-full flex text-center items-center justify-center w-36 py-1 hover:text-gray-500 cursor-pointer border border-gray-800 text-gray-800"
					>
						Edit
					</Link>
					{data?.deals ? (
						<div
							onClick={() =>
								dealOperation(_id, "remove")
							}
							className="hover:underline-offset-4 text-red-500 text-sm cursor-pointer hover:underline"
						>
							Remove from Deals
						</div>
					) : (
						<div className="flex flex-col items-center justify-center gap-3">
							{" "}
							<div
								onClick={() =>
									dealOperation(_id, "add")
								}
								className="rounded-full flex text-center items-center justify-center w-36 py-1 hover:text-green-800 cursor-pointer border border-primaryBgClr text-primaryBgClr"
							>
								Add back
							</div>
							<div className="text-gray-600 text-sm">
								OR
							</div>
							<div
								onClick={() =>
									dealOperation(
										_id,
										"delete"
									)
								}
								className="hover:underline-offset-4  text-red-500 cursor-pointer hover:underline"
							>
								Delete
							</div>
						</div>
					)}
				</div>
			</div>

			<ProductOrderList _id={_id} />
		</div>
	);
};

export default OrderList;
