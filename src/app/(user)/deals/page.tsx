'use client'
import React, { useEffect, useState } from "react";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Image from "next/image";
import axios from "axios";
import productList from "@/interface/productList";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";


const Deals = () => {
	const [data, setData] = useState<productList[]>([]);
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/orders/products"
				);
				const allProducts = response.data.data;
				console.log(allProducts);
				setData(allProducts);
			} catch {
				console.log(
					"Something went wrong please try again later!"
				);
			}
		}
		getData();
	},[]);

	function placeOrder() {}

	return (
		<>
			<div className="flex flex-col mx-auto">
						<div className="flex justify-between gap-5 my-12">
							<h1 className="mr-auto"> Deals</h1>
							<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
								<Image src={filter} alt={""} />
								<div className="">filter</div>
							</div>
							<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
								<Image src={sort} alt={""} />
								<div className="">Sort</div>
							</div>
							{/* <div></div> */}
						</div>
						<div className="grid grid-flow-row gap-7 grid-cols-3">
							<CardLayoutForDeals data={data} />
						</div>
					</div>
		</>
	);
};

export default Deals;
