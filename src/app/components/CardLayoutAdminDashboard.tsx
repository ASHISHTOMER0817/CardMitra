"use client";
import React, { useState } from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import deleteIcon from "@/../public/delete.svg";
import edit from "@/../public/edit.svg";
import productList from "@/interface/productList";
// import Link from "next/link";
import axios from "axios";
import Popup from "./Popup";
import Link from "next/link";

const CardLayoutAdminDashboard = ({ data }: { data: productList[] }) => {
	async function removeDeal(_id: string) {
		try {
			const response = await axios.get(
				`/api/admin/dashboard?_id=${_id}`
			);

			if (response.data.success) {
				Popup("success", `Successfully removed`);
			}
		} catch {
			Popup("error", "Something went wrong, please refresh");
		}
	}

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
						show,
					},
					index: number
				) => {
					console.log(_id.toString());
					return (
						<CardLayout
							key={index}
							classList="hover:border-primaryBgClr"
							image={
								<Link href={`/adminAddProduct/${_id.toString()}`}>
									<Image
										src={edit}
										alt={""}
										className=""
									/>
								</Link>
							}
							quantity={requirement}
							name={name}
							price={price}
							commission={commission}
							placeOrder={
								<>
									<button className="bg-primaryBgClr p-[14px] font-semibold text-base rounded-full border text-center w-auto text-white">
										{deals
											? "Active"
											: "In-Active"}
									</button>
								</>
							}
						/>
					);
				}
			)}{" "}
		</>
	);
};

export default CardLayoutAdminDashboard;
