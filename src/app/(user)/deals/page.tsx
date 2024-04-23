"use client";
import React, { useEffect, useState } from "react";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Image from "next/image";
import axios from "axios";
import productList from "@/interface/productList";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";

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
	}, []);

	function placeOrder() {}

	return (
		<>
			<div className="mx-8">
				<ProductDisplayFormat heading={"Deals"}>
					{" "}
					<CardLayoutForDeals data={data} />
				</ProductDisplayFormat>
			</div>
			
		</>
	);
};

export default Deals;
