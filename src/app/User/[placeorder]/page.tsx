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
const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState();
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"api/users/placeorder"
				);
				setData(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

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
				<section className="flex items-start text-sm justify-around">
					<div className="flex flex-col items-start gap-10 justify-around">
						<section className=" text-left">
							<div className="flex gap-4 justify-center items-start">
								<Image
									className=" w-40"
									src={phoneImage}
									alt={""}
								/>
								<div className="flex flex-col gap-5 justify-center">
									<div className="text-left">
										<div className="font-semibold text-base mb-2">
											Apple iPhone
											15 (Blue, 128
											GB)
										</div>
										<div className="text-[#12121280] text-xs">
											6541651563516532
										</div>
									</div>
									<div>
										<div className="flex items-start gap-3">
											<div className="">
												<div className="font-semibold text-primaryBgClr">
													Rs.
													54,000
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
													Rs.
													800
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
							</Link>
							<Link
								href={
									"www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef54f645"
								}
							>
								https://www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef5
								4f645
							</Link>
						</section>
					</div>
					<div className="border px-10 py-7 rounded-2xl">
						<div className="text-base font-semibold text-primaryBgClr text-center">
							Order Form
						</div>
						<hr className="my-5" />
						<OrderForm />
					</div>
				</section>
				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						Similar Products
					</div>
					<div className="grid grid-flow-row gap-3 grid-cols-3">
						<CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} />
						<CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} />
						<CardLayoutForDeals link={""} quantity={0} name={""} randomNo={0} price={0} commission={0} />
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
