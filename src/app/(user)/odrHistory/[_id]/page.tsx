"use client";
import ProductDetails from "@/app/components/ProductDetails";
import productList, { order } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OtpForm from "@/app/components/OtpForm";
import BackwardButton from "@/app/components/BackwardButton";
import Loader from "@/app/components/loader";
import { MyArrayItem } from "../../deals/[placeorder]/page";

// interface productTypes {
// 	product: productList;
// 	orderNumber: string;
// 	deliveryDate: Date;
// 	otp: boolean;
// }
const SubmitOTP = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<order>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);
	useEffect(() => {
		async function getData() {
			try {
				console.log("starts");
				const response = await axios.get(
					`/api/users/orderData?odrId=${params._id}`
				);
				console.log(response.data.data);
				const { info } = response.data.data.product;
				console.log(info);
				setArr(Object.entries(info));
				setData(response.data.data);
				console.log("end here");
				return;
			} catch {
				console.log(
					"something went wrong please try again later"
				);
			}
		}
		getData();
	}, [params._id]);

	return (
		<div>
			{!data ? (
				<Loader />
			) : (
				<div className="mt-16 ml-8 w-full">
					<BackwardButton />
					<section className="flex items-start text-sm justify-around sm:flex-col">
						<div className="flex flex-col items-start gap-10 justify-around">
							<ProductDetails
								data={data.product!}
								arr={arr}
							/>
						</div>
						<div className="border px-10 py-7 rounded-2xl">
							<div className="text-base font-semibold text-primaryBgClr text-center">
								OTP Form
							</div>
							<hr className="my-5" />
							<OtpForm _id={params._id} />
						</div>
					</section>

					{/* <hr className="my-5" /> */}
					{/* <section className="my-1 mb-3">
						<div className="text-base font-semibold mb-4">
							Similar Products
						</div>
					</section> */}
				</div>
			)}
		</div>
	);
};

export default SubmitOTP;
