import { IoHeartOutline } from "react-icons/io5";
import CardLayout from "./CardLayout";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const CardLayoutForDeals = () => {
	return (
		<div>
			<CardLayout
				image={
					<>
						<IoHeartOutline className="text-red-500 border rounded-full p-2 w-10 h-10" />
						<CiShoppingCart className="border rounded-full p-2 w-10 h-10" />
					</>
				}
				placeOrder={
					<button className="bg-primaryBgClr px-[10px] py-[5px]  rounded-3xl border text-center w-auto text-white">
						Fulfill Order
					</button>
				}
				beforeDate={
					<div className="flex flex-col justify-end text-sm items-end">
						<div className="ml-auto font-semibold">
							30 Mar, 24
						</div>
						<div className="text-xs">
							Fulfill By Date
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default CardLayoutForDeals;
