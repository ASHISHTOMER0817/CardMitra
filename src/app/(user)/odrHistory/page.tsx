'use client'
import React, { useEffect, useState } from "react";
import OrderHistory from "@/app/components/OrderHistory";
import axios from "axios";
import Header from "@/app/components/Header";
import { order } from "@/interface/productList";
import Loader from "@/app/components/loader";
const OdrHistory = () => {
	const [data, setData] = useState<order[]>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/odrHistory"
				);
				console.log(response.data.data);
				setData(response.data.data);
			} catch {
				console.log("please try again later");
			}
		}
		getData();
	}, []);
	return (
		<div className="flex flex-col mx-auto w-[90%]">
			<Header heading={"Order History"} />

			{!data ? (
				<Loader />
			) : data.length < 1 ? (
				<div className="mx-auto w-fit text-red-500 font-serif my-20">
					You don&apos;t have any order history...
				</div>
			) : (
				<div className="grid grid-flow-row gap-7 grid-cols-3 md:gap-3">
					{" "}
					<OrderHistory data={data} />
				</div>
			)}
		</div>
	);
};

export default OdrHistory;
