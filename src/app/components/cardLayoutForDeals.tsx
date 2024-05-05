import { IoHeartOutline } from "react-icons/io5";
import CardLayout from "./CardLayout";
import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
// import productList from "@/interface/productList";
import { Data } from "../(user)/deals/page";
const CardLayoutForDeals = ({ data }: { data: Data }) => {
	return (
		<>
			{
				data?.products.map(
					(
						{
							_id,
							requirement,
							name,
							price,
							commission,
							site
						},
						index
					) => {
						return (
							<>
								<CardLayout
									key={index}
									image={<>
										{/* <IoHeartOutline className="text-red-500 border border-gray-400 rounded-full p-2 w-10 h-10" />
            <CiShoppingCart className="border border-gray-400 rounded-full p-2 w-10 h-10" /> */}
									</>}
									placeOrder={<button
										className={`bg-primaryBgClr p-[14px] font-semibold text-base ${requirement >
												0 &&
												data
													.user
													.isApprove !==
												false
												? ""
												: "bg-gray-400"} rounded-full border text-center w-auto text-white`}
									>
										{requirement >
											0 &&
											data.user
												.isApprove !==
											false ? (
											<Link
												href={`/deals/${_id.toString()}`}
											>
												Fulfill
												Order
											</Link>
										) : (
											"Fulfill Order"
										)}
									</button>}
									beforeDate={<div className="flex flex-col justify-end text-sm items-end">
										<div className="ml-auto font-semibold">
											30 Mar,
											24
										</div>
										<div className="text-xs">
											Fulfill
											By Date
										</div>
									</div>}
									quantity={requirement}
									name={name}
									price={price}
									commission={commission} site={site}								/>
							</>
						);
					}
				)}
		</>
	);
};

export default CardLayoutForDeals;
