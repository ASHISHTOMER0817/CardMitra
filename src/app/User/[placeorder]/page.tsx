"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowleft from "@/../public/ArrowLeft.svg";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import Link from "next/link";
import OrderForm from "@/app/components/OrderForm";
import phoneImage from "@/../public/phoneImage.jpg";
import CardLayoutForDeals from "@/app/components/cardLayoutForDeals";
import NavigationSidebar from "@/app/components/NavigationSidebar";
import Dashboard from "@/app/components/user/Dashboard";
import Deals from "@/app/components/Deals";
import Help from "@/app/components/help";
import Notification from "@/app/components/Notification";
import productList from "@/interface/productList";
import CardLayout from "@/app/components/CardLayout";
import { CiShoppingCart } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<productList[]>([]);
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.post(
					"api/users/placeorder",{params}
				);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, [params]);
	useEffect(()=>{
		async function similarProducts() {
			try {
				const response = await axios.get(
					"/api/dashboard"
				);
				setProductList(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		}
		similarProducts();
	},[])

	const placeOrder=()=>{

	}
	return (
		<>
			<NavigationSidebar
				dashboard={<Dashboard />}
				deals={<Deals />}
				notification={<Notification />}
				help={<Help />}
			/>{" "}
			<div className="ml-32 mt-10">
				<Image
					className="mb-6 w-6 h-6"
					src={arrowleft}
					alt={""}
				/>
				{ data && <section className="flex items-start text-sm justify-around">
					<div className="flex flex-col items-start gap-10 justify-around">
						<section className=" text-left">
							<div className="flex gap-4 justify-center items-start">
								<Image
									className=" w-40"
									src={data.productLink}
									alt={""}
								/>
								<div className="flex flex-col gap-5 justify-center">
									<div className="text-left">
										<div className="font-semibold text-base mb-2">
											{data.name}
										</div>
										<div className="text-[#12121280] text-xs">
											6541651563516532
										</div>
									</div>
									<div>
										<div className="flex items-start gap-3">
											<div className="">
												<div className="font-semibold text-primaryBgClr">
													{data.price}
												</div>
												<div className="text-xs">
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
													{data.commission}
												</div>
												<div className="text-xs">
													Commission
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section className="flex justify-between items-center gap-4">
							<div className="">
								<div className="mb-[4px]">
									<Image
										src={cards}
										alt=""
									/>
								</div>
								<div>
									Offers available on bank
									cards
								</div>
							</div>
							<div className="">
								<div className="">
									{" "}
									<Image
										src={platform}
										alt={""}
									/>
								</div>
								<div>Websites</div>
							</div>
						</section>
						<section className="text-wrap flex flex-col justify-start gap-3 text-primaryBgClr">
							<div className="font-semibold text-black text-base">
								Direct Links
							</div>
							<Link
								href={
									data.productLink
								}
							>
								{data.productLink}
							</Link>
							{/* <Link
								href={
									"www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef54f645"
								}
							>
								https://www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef5
								4f645
							</Link>
							<Link
								href={
									"www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef54f645"
								}
							>
								https://www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef5
								4f645
							</Link> */}
						</section>
					</div>
					<div className="border px-10 py-7 rounded-2xl">
						<div className="text-base font-semibold text-primaryBgClr text-center">
							Order Form
						</div>
						<hr className="my-5" />
						<OrderForm />
					</div>
				</section>}
				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						Similar Products
					</div>
					<div className="grid grid-flow-row gap-3 grid-cols-3">
						
							{productList &&
								productList.map(
									({
										_id,
										requirement,
										name,
										price,
										commission,
									}) => {
										return (
											<>
												<CardLayout
													image={
														<>
															<IoHeartOutline className="text-red-500 border rounded-full p-2 w-10 h-10" />
															<CiShoppingCart className="border rounded-full p-2 w-10 h-10" />
														</>
													}
													placeOrder={
														<button className="bg-primaryBgClr px-[10px] py-[5px]  rounded-3xl border text-center w-auto text-white">
															<Link
																href={`/user/${_id.toString()}`}
															>
																Fulfill
																Order
															</Link>
														</button>
													}
													beforeDate={
														<div className="flex flex-col justify-end text-sm items-end">
															<div className="ml-auto font-semibold">
																30
																Mar,
																24
															</div>
															<div className="text-xs">
																Fulfill
																By
																Date
															</div>
														</div>
													}
													quantity={
														requirement
													}
													name={name}
													randomNo={
														51925985156
													}
													price={price}
													commission={
														commission
													}
												/>
											</>
										);
									}
								)}
						
						{/* <CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} />
						<CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} />
						<CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} /> */}
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
