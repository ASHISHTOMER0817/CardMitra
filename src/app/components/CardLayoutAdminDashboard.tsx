"use client";
import React, { useEffect, useState } from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import edit from "@/../public/edit.svg";
import productList from "@/interface/productList";
import axios from "axios";
import Popup from "./Popup";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
// import { Icons } from "react-toastify";

const CardLayoutAdminDashboard = ({ data }: { data: productList }) => {
	const {
		_id,
		requirement,
		name,
		price,
		commission,
		deals,
		site,
		image,
		cards,
		showOnHomePage,
	} = data;
	const [icon, setIcon] = useState<boolean>(false);
	// const [productId, setProductId] = useState("");
	console.log(data);

	useEffect(() => {
		setIcon(showOnHomePage);
	}, [showOnHomePage]);

	async function getIcon(icon: boolean, productId: string) {
		try {
			console.log(icon, productId);
			const response = await axios.get(
				`/api/orders/products?icon=${icon}&productId=${productId}`
			);
			if (!response.data.success) {
				Popup("error", response.data.message);
			}
		} catch {
			Popup("error", "something went wrong");
		}
	}
	console.log('this is site and cards', site, cards)
	return (
		<Link href={`/orders/${_id}`}>
			<CardLayout
				classList="hover:border-primaryBgClr custom_shadow"
				icons={
					<>
						<Link href={`/adminAddProduct/${_id}`}>
							<Image
								src={edit}
								alt={""}
								className="hover:bg-gray-200 hover:rounded-full"
							/>
						</Link>
						{icon ? (
							<IoCheckmark
								className="h-[29px] w-[29px] text-red-500 rounded-full border border-red-500 "
								onClick={(event) => {
									event.preventDefault();
									getIcon(!icon, _id);
									setIcon(!icon);
									// setProductId(
									// 	_id
									// );
								}}
							/>
						) : (
							<GoPlus
								className="h-[29px] w-[29px] text-red-200 rounded-full border border-red-200 "
								onClick={(event) => {
									event.preventDefault();
									getIcon(!icon, _id);
									setIcon(!icon);

									// setProductId(
									// 	_id
									// );
								}}
							/>
						)}
					</>
				}
				quantity={requirement}
				name={name}
				price={price}
				commission={commission}
				placeOrder={
					<>
						<button className="bg-primaryBgClr p-[14px] font-semibold text-base rounded-full border text-center w-auto text-white md:w-[100px] md:mt-4 sm:mx-auto sm:text-sm sm:p-0 ">
							{deals ? "Active" : "In-Active"}
						</button>
					</>
				}
				site={site}
				deviceImage={image}
				cards={cards}
			/>
		</Link>
	);
};

export default CardLayoutAdminDashboard;
