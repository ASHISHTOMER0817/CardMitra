'use client'
import React, { useEffect, useState } from "react";
// import filter from "@/../public/Filter.svg";
// import sort from "@/../public/sort.svg";
// import Image from "next/image";
import axios from "axios";
import productList from "@/interface/productList";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
import Popup from "@/app/components/Popup";

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
				Popup("error", "Something went wrong, REFRESH THE PAGE")
				console.log(
					"Something went wrong, REFRESH THE PAGE"
				);
			}
		}
		getData();
	}, []);

	// function placeOrder() {}

	return (
		<ProductDisplayFormat heading={"Deals"}>
			{" "}
			<CardLayoutForDeals data={data} />
		</ProductDisplayFormat>
	);
};

export default Deals;
