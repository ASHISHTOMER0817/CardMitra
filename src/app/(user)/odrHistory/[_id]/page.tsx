"use client";
import ProductDetails from "@/app/components/ProductDetails";
import productList, { order } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OtpForm from "@/app/components/OtpForm";
import BackwardButton from "@/app/components/BackwardButton";
import Loader from "@/app/components/loader";
import { MyArrayItem } from "../../deals/[placeorder]/page";
import CopyDivToClipboard from "@/app/components/CopyToClipboard";

// interface productTypes {
// 	product: productList;
// 	orderNumber: string;
// 	deliveryDate: Date;
// 	otp: boolean;
// }
const SubmitOTP = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<order>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);
	const [deliveryStatus, setDeliveryStatus] = useState(false);
	const [otpStatusUpdate, setOtpStatusUpdate] = useState(false);
	const [otpStatus, setOtpStatus] = useState<boolean | null>(null);
	// const [reWriteOtp, setReWriteOtp] = useState(false)
	useEffect(() => {
		async function getData() {
			try {
				console.log("starts");
				const response = await axios.get(
					`/api/users/orderData?odrId=${params._id}&deliveryStatus=${deliveryStatus}&otpStatus=${otpStatusUpdate}`
				);
				console.log(response.data.data);
				const { info } = response.data.data.product;
				console.log(info);
				setArr(Object.entries(info));
				setOtpStatus(response.data.data.otp);
				setData(response.data.data);
				// setReWriteOtp(response.data.data.otp)
				console.log("end here");
				return;
			} catch {
				console.log(
					"something went wrong please try again later"
				);
			}
		}
		getData();
	}, [deliveryStatus, otpStatusUpdate, params._id]);

	return (
		<div>
			{!data ? (
				<Loader />
			) : (
				<div className="mt-16 ml-8 w-full sm:ml-0">
					<BackwardButton />
					<section className="flex items-start text-sm justify-around sm:flex-col">
						<div className="flex flex-col items-start gap-10 justify-around sm:gap-0">
							<ProductDetails
								observer="user"
								data={data.product!}
								arr={arr}
							/>
						</div>
						<div className="border px-10 py-7 rounded-2xl">
							<div className="text-base font-semibold text-primaryBgClr text-center">
								OTP Form
							</div>
							<hr className="my-5" />
							{/* <OtpForm _id={params._id} /> */}
							<div className=" flex flex-col justify-start">
								<CopyDivToClipboard
									orderId={params._id}
									classList={
										otpStatus
											? "hidden"
											: ""
									}
								/>

								<button
									className={`text-white border rounded-3xl px-4 py-3 hover:bg-green-600 bg-primaryBgClr ${
										otpStatus
											? "hidden"
											: ""
									} w-96 sm:w-48 sm:py-2`}
									onClick={() =>
										setOtpStatusUpdate(
											true
										)
									}
								>
									Proceed to google form
								</button>
								<div
									onClick={() =>
										setOtpStatus(false)
									}
									className={`text-white border text-center cursor-pointer rounded-3xl px-4 py-3 hover:bg-green-600 bg-primaryBgClr w-96 ${
										otpStatus
											? ""
											: "hidden"
									} sm:w-48 sm:py-2 `}
								>
									Re-Submit OTP
								</div>
								<div
									onClick={() =>
										setDeliveryStatus(
											true
										)
									}
									className={`cursor-pointer mx-auto mt-3 text-xs border-b border-b-gray-500 hover:border-b-gray-800 hover:text-gray-800 text-gray-500 ${
										otpStatus
											? ""
											: "hidden"
									}`}
								>
									Click to confirm if the
									product got delivered
								</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</div>
	);
};

export default SubmitOTP;
