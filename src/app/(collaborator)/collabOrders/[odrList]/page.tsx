"use client";
// import ProductDetails from "@/app/components/ProductDetails";
import ProductOrderList from "@/app/components/ProductOrderList";
import productList from "@/interface/productList";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BackwardButton from "@/app/components/BackwardButton";
import phoneImage from "@/../public/phoneImage.jpg";
import Popup from "@/app/components/Popup";
import ProductDetails from "@/app/components/ProductDetails";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/loader";
import { MyArrayItem } from "@/app/(user)/deals/[placeorder]/page";

const OrderList = ({ params }: { params: { odrList: string } }) => {
	const [data, setData] = useState<productList>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);
	const [_id, setId] = useState("");
	const [refresh, setRefresh] = useState(false);
	const router = useRouter();
	// Fetching product details
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/users/productData?query=${params.odrList}`
				);

				const { info, _id } = await response.data.data;
				// console.log("here");
				// console.log(info);
				setArr(Object.entries(info));

				setData(await response.data.data);
				setId(_id);
				// console.log(arr);
			} catch {
				console.log(
					"something went wrong, please try again later"
				);
				Popup("error", "Something went wrong");
				return;
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params.odrList, refresh]);

	return (
		<div className="flex flex-col mx-auto">
			<BackwardButton />
			{!data ? (
				<Loader />
			) : (
				<div className="flex justify-between items-start sm:flex-col">
					<div>
						<ProductDetails data={data} arr={arr} collaborator />
					</div>
					
				</div>
			)}
			<h5 className="text-left font-semibold mt-6 my-4">Order Details</h5>
			<ProductOrderList _id={_id} collaborator/>
		</div>
	);
};

export default OrderList;
