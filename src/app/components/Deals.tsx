import React, { useEffect, useState } from "react";
// import cardLayoutForDeals from "./cardLayoutForDeals";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Image from "next/image";
import CardLayoutForDeals from "./cardLayoutForDeals";
import axios from "axios";
import productList from "@/interface/productList";
import Link from "next/link";
import { CiShoppingCart } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import CardLayout from "./CardLayout";

// interface productDetails {
// 	productLink: string;
// 	price: number;
// 	requirement: number;
// 	name: string;
// 	commission: number;
// }

const Deals = () => {
	const [data, setData] = useState<productList[]>([]);
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get("api/orders/products");
				const allProducts = response.data;
				setData(allProducts);
			} catch {
				console.log(
					"Something went wrong please try again later!"
				);
			}
		}
	}, []);

	function placeOrder(){

	}

	return (
		<div className="flex flex-col">
			<div className="flex justify-center gap-5 my-12">
				<h1 className="mr-auto"> Deals</h1>
				<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={filter} alt={""} />
					<div className="">filter</div>
				</div>
				<div className="border flex justify-center  items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={sort} alt={""} />
					<div className="">Sort</div>
				</div>
				<div></div>
			</div>
			<div className="grid grid-flow-row gap-3 grid-cols-3">
				{data &&
					data.map(
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
											<button  className="bg-primaryBgClr px-[10px] py-[5px]  rounded-3xl border text-center w-auto text-white">
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
			</div>
		</div>
	);
};

export default Deals;
