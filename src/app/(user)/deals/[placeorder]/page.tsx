"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderForm from "@/app/components/OrderForm";
import productList, { Data } from "@/interface/productList";
import ProductDetails from "@/app/components/ProductDetails";
import Loader from "@/app/components/loader";
import CardLayout from "@/app/components/CardLayout";
import Link from "next/link";
import BackwardButton from "@/app/components/BackwardButton";

export interface MyArrayItem {
	0: string; // First element in the subarray (e.g., 'first', 'second', 'third', 'fourth')
	1: string; // Second element in the subarray (e.g., '1st', 'kjhgvfcghjkmjhgvf', etc.)
}
const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<Data>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);

	useEffect(() => {
		async function getData() {
			try {
				console.log(params.placeorder);
				const response = await axios.get(
					`/api/users/productData?query=${params.placeorder}`
				);
				console.log(params.placeorder);
				setData(response.data.data);
				const { info } = await response.data.data;
				console.log(info);

				console.log(Object.entries(info));
				setArr(Object.entries(info));

				console.log(response.data.message, response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, [params.placeorder]);

	useEffect(() => {
		async function getData() {
			try {
				console.log("yes this is working");
				const response = await axios.get(
					"/api/orders/products?limit=three"
				);

				setProductList(response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

	// const placeOrder = () => {};
	return (
		<>
			<div className="sm:flex sm:flex-col">
				<BackwardButton />
				<section className="flex items-start text-sm justify-around sm:flex-col flex-wrap">
					<div className="flex flex-col items-start gap-10 justify-around sm:gap-0 sm:w-full">
						{!data && !arr ? (
							""
						) : (
							<ProductDetails
								data={data!}
								arr={arr}
							/>
						)}
					</div>
					<div className="border px-10 py-7 rounded-2xl sm:py-3 sm:px-4 order-form">
						<div className="text-base font-semibold text-primaryBgClr text-center">
							Order Form
						</div>
						<hr className="my-5" />
						<OrderForm objectId={params.placeorder} />
					</div>
				</section>

				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						Similar Products
					</div>
					<div className="flex flex-wrap gap-4 items-center justify-center">
						{!productList ? (
							<Loader />
						) : productList.products.length > 0 ? (
							productList?.products
								.slice(0, 3)
								.map(
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
													key={
														index
													}
													placeOrder={
														<button
															className={`bg-primaryBgClr p-[14px]  font-semibold text-base ${
																requirement >
																	0 &&
																productList
																	.user
																	.isApprove !==
																	false
																	? " hover:bg-green-600"
																	: " bg-gray-400"
															} rounded-full border text-center w-auto text-white sm:mt-1 sm:px-1 sm:py-2 sm:font-medium sm:text-[10px] sm:text-nowrap sm:leading-4`}
														>
															{requirement >
																0 &&
															productList
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
													name={
														name
													}
													price={
														price
													}
													commission={
														commission
													}
													site={
														site
													}
													deviceImage={
														image
													}
													cards={
														cards
													}
												/>
											</>
										);
									}
								)
						) : (
							<div className="text-red-500 font-serif mx-auto w-fit  sm:text-[10px]">
								No other products to order
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
