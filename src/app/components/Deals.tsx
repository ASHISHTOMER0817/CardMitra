import React, { useEffect, useState } from "react";
// import cardLayoutForDeals from "./cardLayoutForDeals";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Image from "next/image";
import CardLayoutForDeals from "./cardLayoutForDeals";
import axios from "axios";

interface productDetails {
	productLink: string;
	price: number;
	requirement: number;
	name: string;
	commission: number;
}

const Deals = () => {
	const [data, setData] = useState<productDetails[]>([]);
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
					data.map(({productLink, requirement, name, price, commission}) => {
						return (
							<>
								<CardLayoutForDeals
									link={productLink}
									quantity={requirement}
									name={name}
									randomNo={0}
									price={price}
									commission={commission}
								/>
							</>
						);
					})}
			</div>
		</div>
	);
};

export default Deals;
