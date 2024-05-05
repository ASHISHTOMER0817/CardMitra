"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import productList from "@/interface/productList";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import Link from "next/link";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import BackwardButton from "./BackwardButton";

const ProductDetails = ({ data }: { data: productList }) => {
	const [arr, setArr] = useState<string[]>([]);
	
	// console.log(data)
	useEffect(() => {
		function appendPoints() {
			data ? console.log(data, data.info): console.log('hello')
			// const { first, second, third, fourth } = data.info;
			// console.log(first, second, third, fourth);

			// function check(point: string) {
			// 	if (!point) {
			// 		return;
			// 	} else {
			// 		setArr((arr) => [...arr, point]);
			// 	}
			// }
			// check(first);
			// check(second);
			// check(third);
			// check(fourth);
		}
		appendPoints();
		console.log(arr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// console.log("data is: ", data);
	return (
		<>
			
		</>
	);
};

export default ProductDetails;
