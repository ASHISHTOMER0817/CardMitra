import { IoHeartOutline } from "react-icons/io5";
import CardLayout from "./CardLayout";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import productList from "@/interface/productList";
const CardLayoutForDeals = ({ data }: { data: productList[] }) => {
	return (
		<>
			{data &&
				data.map(
					(
						{
							_id,
							requirement,
							name,
							price,
							commission,
						},
						index
					) => {
						return (
							<>
								<CardLayout
									key={index}
									image={
										<>
											<IoHeartOutline className="text-red-500 border border-gray-400 rounded-full p-2 w-10 h-10" />
											<CiShoppingCart className="border border-gray-400 rounded-full p-2 w-10 h-10" />
										</>
									}
									placeOrder={
										<button className="bg-primaryBgClr p-[14px] font-semibold text-base   rounded-3xl border text-center w-auto text-white">
											<Link
												href={`/deals/${_id.toString()}`}
											>
												Fulfill
												Order
											</Link>
										</button>
									}
									beforeDate={
										<div className="flex flex-col justify-end text-sm items-end">
											<div className="ml-auto font-semibold">
												30 Mar,
												24
											</div>
											<div className="text-xs">
												Fulfill
												By Date
											</div>
										</div>
									}
									quantity={requirement}
									name={name}
									randomNo={51925985156}
									price={price}
									commission={commission}
								/>
							</>
						);
					}
				)}
		</>
	);
};

export default CardLayoutForDeals;
