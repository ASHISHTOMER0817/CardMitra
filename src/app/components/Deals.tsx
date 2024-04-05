import React from "react";
// import cardLayoutForDeals from "./cardLayoutForDeals";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Image from "next/image";
import CardLayoutForDeals from "./cardLayoutForDeals";
const Deals = () => {
	return (
		<>
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
				<CardLayoutForDeals/>
				<CardLayoutForDeals/>
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
				<CardLayoutForDeals />
			</div>
		</>
	);
};

export default Deals;
