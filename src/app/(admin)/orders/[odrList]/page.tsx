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

	async function dealOperation(_id: string, operation: string) {
		try {
			// console.log("frontend", _id, operation);
			const response = await axios.get(
				`/api/admin/dashboard?_id=${_id}&operation=${operation}`
			);

			if (response.data.success) {
				Popup("success", await response.data.message);
				// console.log(response.data.operation);
				if (response.data.operation === "delete") {
					router.back();
				} else {
					// router.refresh()
					setRefresh(!refresh);
				}
			} else {
				Popup("error", response.data.message);
			}
		} catch {
			Popup("error", "Something went wrong, please refresh");
		}
	}

	return (
		<div className="flex flex-col mx-auto">
			<BackwardButton />
			{!data ? (
				<Loader />
			) : (
				<div className="flex justify-between items-start sm:flex-col">
					<div>
						<ProductDetails data={data} arr={arr} />
					</div>
					<div
						className={`flex ${
							data?.deals
								? "items-center"
								: "items-center"
						} justify-center gap-5`}
					>
						<Link
							href={`/adminAddProduct/${data?._id}`}
							className="rounded-full flex text-center items-center justify-center w-36 py-1 hover:text-gray-500 cursor-pointer border border-gray-800 text-gray-800"
						>
							Edit
						</Link>
						{data?.deals ? (
							<div
								onClick={() =>
									dealOperation(
										_id,
										"remove"
									)
								}
								className="hover:underline-offset-4 text-red-500 text-sm cursor-pointer hover:underline"
							>
								Remove from Deals
							</div>
						) : (
							<div className="flex flex-col items-center justify-center gap-3">
								{" "}
								<div
									onClick={() =>
										dealOperation(
											_id,
											"add"
										)
									}
									className="rounded-full flex text-center items-center justify-center w-36 py-1 hover:text-green-800 cursor-pointer border border-primaryBgClr text-primaryBgClr"
								>
									Add back
								</div>
								<div className="text-gray-600 text-sm">
									OR
								</div>
								<div
									onClick={() =>
										dealOperation(
											_id,
											"delete"
										)
									}
									className="hover:underline-offset-4  text-red-500 cursor-pointer hover:underline"
								>
									Delete
								</div>
							</div>
						)}
					</div>
				</div>
			)}
			<h5 className="text-left font-semibold mt-6 my-4">Order Details</h5>
			
			<ProductOrderList _id={_id} />
		</div>
	);
};

export default OrderList;
