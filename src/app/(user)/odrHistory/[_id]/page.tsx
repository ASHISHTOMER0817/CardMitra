"use client";
import ProductDetails from "@/app/components/ProductDetails";
import productList, { order } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BackwardButton from "@/app/components/BackwardButton";
import Loader from "@/app/components/loader";
import { MyArrayItem } from "../../deals/[placeorder]/page";
import CopyDivToClipboard from "@/app/components/CopyToClipboard";
import Popup from "@/app/components/Popup";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

// interface productTypes {
// 	product: productList;
// 	orderNumber: string;
// 	deliveryDate: Date;
// 	otp: boolean;
// }
const SubmitOTP = ({ params }: { params: { _id: string } }) => {
	const [data, setData] = useState<order>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);
	const [deliveryStatus, setDeliveryStatus] = useState("");
	const [otpStatusUpdate, setOtpStatusUpdate] = useState("");
	const [otpStatus, setOtpStatus] = useState<boolean | null>(null);
	const [overlay, setOverlay] = useState("hidden");
	const router = useRouter();
	const [copiedYet, setCopiedYet] = useState(false);
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

				if (deliveryStatus && response.data.success) {
					router.back();
				}

				console.log("end here");
				return;
			} catch {
				console.log(
					"something went wrong please try again later"
				);
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [deliveryStatus, otpStatusUpdate, params._id]);

	const GoogleForm = async () => {
		const googleFormUrl =
			"https://docs.google.com/forms/d/e/1FAIpQLSeHWBZSHdKOpVySmjtTKwRvBUt00SbySSSDWNThh6iLo0iOaQ/viewform?usp=pp_url"; // Replace with your actual Google Form URL
		const newWindow = window.open(
			googleFormUrl,
			"_blank",
			"noopener,noreferrer"
		);

		if (newWindow) {
			console.log(" The new window was opened successfully");
		} else {
			console.log(
				"The new window was blocked or couldn't be opened"
			);
		}
	};

	return (
		<div>
			{!data ? (
				<Loader />
			) : (
				<div className="w-full sm:ml-0">
					<div
						className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
					></div>
					<div
						// onSubmit={payment}
						className={`${overlay} bg-white flex px-2 z-20 absolute opacity-100 pt-2 pb-4 rounded-big flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2 sm:w-4/5`}
					>
						<RxCross1
							width={30}
							height={30}
							className="p-2 cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
							onClick={() => setOverlay("hidden")}
						/>
						<h4 className="sm:text text-xl text-center">
							Are you sure the order has been
							delivered?{" "}
						</h4>
						<div className="flex justify-center gap-3 items-center">
							<button
								onClick={() => {
									setOverlay("hidden");
								}}
								type="button"
								className="px-4 py-2 hover:bg-gray-200 border-gray-200 border rounded-full active:bg-gray-200"
							>
								Cancel
							</button>
							<button
								onClick={() =>
									setDeliveryStatus("true")
								}
								type="button"
								className="px-4 py-2 hover:bg-green-600 bg-primaryBgClr rounded-full text-white"
							>
								Confirm
							</button>
						</div>
					</div>
					<BackwardButton />
					<section className="flex items-start text-sm justify-around flex-wrap gap-4">
						<div className="flex flex-col items-start justify-around sm:gap-0">
							<ProductDetails
								observer="user"
								data={data.product!}
								arr={arr}
							/>
						</div>
						<div className="border px-10 py-7 rounded-2xl sm:px-4 sm:py-4 sm:w-full">
							<div className="text-base font-semibold text-primaryBgClr text-center">
								OTP Form
							</div>
							<hr className="my-5 sm:my-2" />
							{/* <OtpForm _id={params._id} /> */}
							<div className=" flex flex-col justify-start gap-3">
								<CopyDivToClipboard
									orderId={params._id}
									classList={
										otpStatus
											? "hidden"
											: ""
									}
									stateChange={function () {
										setCopiedYet(true);
									}}
								/>

								<button
									className={`text-gray-700 border-orange-200 border rounded-3xl px-4 py-3 hover:bg-orange-50 bg-white ${
										otpStatus
											? "hidden"
											: ""
									} w-96 sm:w-48 sm:py-2`}
									style={{alignSelf: 'center'}}
									onClick={() => {
										copiedYet &&
											GoogleForm();
									}}
								>
									Fill google form
								</button>
								<button
									className={`text-white border rounded-3xl px-4 py-3 hover:bg-green-600 bg-primaryBgClr ${
										otpStatus
											? "hidden"
											: ""
									} w-96 sm:w-48 sm:py-2`}
									style={{alignSelf: 'center'}}
									onClick={() => {
										copiedYet &&
											setOtpStatusUpdate(
												"true"
											);
										// handleSubmit();
									}}
								>
									Confirm
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
									style={{alignSelf: 'center'}}
								>
									Re-Submit OTP
								</div>
								<div
									onClick={() =>
										setOverlay("")
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
