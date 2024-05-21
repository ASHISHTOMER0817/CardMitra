"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Data } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import Loader from "@/app/components/loader";
import Link from "next/link";
import CardLayout from "@/app/components/CardLayout";

const Deals = () => {
	const [data, setData] = useState<Data>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/orders/products?limit=none"
				);
				const allProducts = response.data.data;
				console.log(allProducts);
				setData(allProducts);
			} catch {
				Popup(
					"error",
					"Something went wrong, REFRESH THE PAGE"
				);
				console.log("Something went wrong, REFRESH THE PAGE");
			}
		}
		getData();
	}, []);

	return (
		<div className=" my-12 sm:-mr-5 sm:-ml-7">
			<h3 className="mb-8 mr-auto ml-10 font-semibold">Deals</h3>
			<div className=" ml-8 grid grid-flow-row grid-cols-3 gap-3 sm:ml-2 sm:gap-1 sm:grid-cols-2">
				{/* <CardLayoutForDeals data={data!} /> */}

				{!data ? (
					<Loader />
				) : data.products.length > 0 ? (
					data?.products.map(
						(
							{
								_id,
								requirement,
								name,
								price,
								commission,
								site,
								image,
								cards,
							},
							index
						) => {
							return (
								<>
									<CardLayout
										key={index}
										placeOrder={
											<button
												onClick={() =>
													!data
														.user
														.isApprove
														? Popup(
																"info",
																"You are not verified yet"
														  )
														: ""
												}
												className={` p-[14px] font-semibold text-base ${
													requirement >
														0 &&
													data
														.user
														.isApprove !==
														false
														? " hover:bg-green-600 bg-primaryBgClr"
														: "bg-gray-400"
												} rounded-full border text-center w-auto text-white sm:-ml-[82px] sm:mr-[17px] sm:mt-1 sm:px-1 sm:py-0.5 sm:font-medium sm:text-[10px] sm:text-nowrap sm:leading-4`}
											>
												{requirement >
													0 &&
												data
													.user
													.isApprove !==
													false ? (
													<Link
														href={`/deals/${_id.toString()}`}
													>
														Fulfill
														Order
													</Link>
												) : (
													"Fulfill Order"
												)}
											</button>
										}
										quantity={
											requirement
										}
										name={name}
										price={price}
										commission={
											commission
										}
										site={site}
										deviceImage={image}
										cards={cards}
									/>
								</>
							);
						}
					)
				) : (
					<div className="text-red-500 font-serif mx-auto w-fit ">
						No other products to order
					</div>
				)}
			</div>
		</div>
	);
};

export default Deals;
