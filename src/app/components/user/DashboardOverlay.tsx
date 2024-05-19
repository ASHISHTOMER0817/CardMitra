import React, { useEffect, useState } from "react";
import Image from "next/image";
import productList from "@/interface/productList";
import phoneImage from "@/../public/phoneImage.jpg";
import amazon from "@/../public/static/amazon.svg";
import flipkart from "@/../public/static/flipkart.svg";
import jiomart from "@/../public/static/jiomart.png";
import shopsy from "@/../public/static/shopsy.jpg";
import vivo from "@/../public/static/vivo.webp";
import oppo from "@/../public/static/oppo.png";
import mi from "@/../public/static/mi.jpg";
import samsung from "@/../public/static/samsung.png";
import Link from "next/link";
import axios from "axios";
import Popup from "../Popup";

const DashboardOverlay = ({
	data,
}: {
	data: {
		orderObjectId: productList;
		delivered: string;
		order_id: string;
		_id: string;
	};
}) => {
	const [siteImage, setSiteImage] = useState("");
	const { name, image, cards, site, _id } = data.orderObjectId;
	const otpObjectId = data._id;
	const [acknowledge, setAcknowledge] = useState(false);
	const siteArr = [
		{ name: "Amazon", image: amazon },
		{ name: "Flipkart", image: flipkart },
		{ name: "Jiomart", image: jiomart },
		{ name: "Shopsy", image: shopsy },
		{ name: "Vivo", image: vivo },
		{ name: "MI", image: mi },
		{ name: "Oppo", image: oppo },
		{ name: "Samsung", image: samsung },
	];

	useEffect(() => {
		// setsiteImage(forLoop(site.label))
		function forLoop() {
			for (let i = 0; i < siteArr.length; i++) {
				if (siteArr[i].name === site.label) {
					setSiteImage(siteArr[i].image);
					console.log(true);
					return;
				}
				// console.log(false);
			}
		}
		forLoop();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function acknowledged(acknowledgment: string) {
		try {
			const response = await axios.get(
				`/api/users/dashboard?query=${acknowledgment}`
			);
			console.log(response.data.data);
		} catch {
			Popup("error", "server error, please refresh");
		}
	}

	return (
		<div
			className={` text-sm h-24 bg-[#D0D6E0] rounded-2xl p-2 flex ${
				acknowledge && "hidden"
			}`}
		>
			{/* Left column */}
			<Image
				src={image ? `/uploads/${image}` : phoneImage}
				alt="User Image"
				className="w-20 h-auto rounded-lg"
				width={200}
				height={300}
			/>

			{/* Middle column */}
			<div className="flex-1 flex flex-col ml-1 justify-center items-start space-y-2 ">
				<div className="text-[16px] font-semibold">{name}</div>
				<div className="flex justify-between gap-5 items-start ">
					<Image
						src={siteImage}
						alt="Icon"
						className="w-6 h-6"
					/>
					<div className="flex flex-col items-start justify-center">
						{cards.map(({ label }, index) => (
							<div key={index} className="mb-1">
								{label}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Right column */}
			<div className="flex flex-col justify-between items-center">
				{data.delivered === "wrong OTP" ? (
					<>
						<button
							onClick={() => {
								acknowledged(otpObjectId);
								setAcknowledge(true);
							}}
							className="px-2 py-1 w-full hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full mb-2"
						>
							Cancel
						</button>
						<button className="px-2 py-1 hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full">
							<Link
								href={`/odrHistory/${data.order_id}`}
							>
								SUBMIT OTP
							</Link>
						</button>
					</>
				) : data.delivered === "cancelled" ? (
					<button
						onClick={() => {
							acknowledged(otpObjectId);
							setAcknowledge(true);
						}}
						className="px-2 py-1 mt-auto min-w-[100px] hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full"
					>
						{/* <Link
							href={
								"/odrHistory?listType=cancelled"
							}
						></Link> */}
						OK
					</button>
				) : null}
			</div>
		</div>
	);
};

export default DashboardOverlay;
