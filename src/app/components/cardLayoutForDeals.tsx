import CardLayout from "./CardLayout";
import React from "react";
import Link from "next/link";
import { Data } from "@/interface/productList";
import Loader from "./loader";

const CardLayoutForDeals = ({ data }: { data: Data }) => {
	return (
		<>
			{!data ? <Loader/> : data.products.length >0 ? data?.products.map(
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
			): <div className="text-red-500 font-serif mx-auto w-fit ">No other products to order</div>}
		</>
	);
};

export default CardLayoutForDeals;
