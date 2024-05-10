'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import  { Data } from "@/interface/productList";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";
import Popup from "@/app/components/Popup";


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

	// function placeOrder() {}

	return (
		<div className=" my-12 ">
			<h3 className="mb-8 mr-auto ml-10 font-semibold">Deals</h3>
			<div className=" ml-8 grid grid-flow-row grid-cols-3 gap-3">

			<CardLayoutForDeals data={data!} />
			</div>
		</div>
	);
};

export default Deals;
