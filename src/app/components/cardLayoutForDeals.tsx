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
			{data?.products.map(
				(
					{
						_id,
						requirement,
						name,
						price,
						commission,
						site,
						image,
						cards
					},
					index
				) => {
					return (
						<>
							<CardLayout
								key={index}
								
								placeOrder={
									<button
										className={`bg-primaryBgClr p-[14px] font-semibold text-base ${
											requirement >
												0 &&
											data.user
												.isApprove !==
												false
												? ""
												: "bg-gray-400"
										} rounded-full border text-center w-auto text-white`}
									>
										{requirement > 0 &&
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
									</button>
								}
								
								quantity={requirement}
								name={name}
								price={price}
								commission={commission}
								site={site}
								deviceImage={image}
								cards={cards}
							/>
						</>
					);
				}
			)}
		</>
	);
};

export default CardLayoutForDeals;
