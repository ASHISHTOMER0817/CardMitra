'use client'
import React from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import edit from "@/../public/edit.svg";
import productList from "@/interface/productList";
import axios from "axios";
import Popup from "./Popup";
import Link from "next/link";

const  CardLayoutAdminDashboard = ({ data }: { data: productList[] }) => {
	console.log(data);

	return (
		<>
			{data.map(
				(
					{
						_id,
						requirement,
						name,
						price,
						commission,
						deals,
						site,
						image,
						cards
					},
					index: number
				) => {
					return (
						<Link key={index} href={`/orders/${_id}`}>
						<CardLayout
							
								classList="hover:border-primaryBgClr"
								image={<Link
									href={`/adminAddProduct/${_id}`}
								>
									<Image
										src={edit}
										alt={""}
										className="hover:bg-gray-200 hover:rounded-full" />
								</Link>}
								quantity={requirement}
								name={name}
								price={price}
								commission={commission}
								placeOrder={<>
									<button className="bg-primaryBgClr p-[14px] font-semibold text-base rounded-full border text-center w-auto text-white md:w-[120px] md:p-[5px] md:mt-4 md:-ml-[68px] ">
										{deals
											? "Active"
											: "In-Active"}
									</button>
								</>}
								site={site} deviceImage={image} cards={cards}/></Link>
					);
				}
			)}{" "}
		</>
	);
};

export default CardLayoutAdminDashboard;
