import React, { useEffect, useState } from "react";
import Image from "next/image";
import productList from "@/interface/productList";
import phoneImage from "@/../public/phoneImage.jpg";
// import amazon from "@/../public/static/amazon.svg";
// import flipkart from "@/../public/static/flipkart.svg";
// // import jiomart from "@/../public/static/jiomart.png";
// import shopsy from "@/../public/static/shopsy.jpg";
// import vivo from "@/../public/static/vivo.webp";
// import oppo from "@/../public/static/oppo.png";
// import mi from "@/../public/static/mi.jpg";
// import samsung from "@/../public/static/samsung.png";
import Link from "next/link";
import axios from "axios";
import Popup from "../Popup";
import StatusBadge from "../StatusBadge";

const DashboardOverlay = ({
	product,
	delivered,
	orderObjectId,
}: {
	product: productList;
	orderObjectId: string;
	delivered: string;
	// order_id: string;
	// _id: string;
}) => {
	const [siteImage, setSiteImage] = useState("");
	const { name, image, cards, site, _id } = product;
	// const otpObjectId = data._id;
	const [acknowledge, setAcknowledge] = useState(false);
	// const siteArr = [
	// 	{ name: "Amazon", image: amazon },
	// 	{ name: "Flipkart", image: flipkart },
	// 	{ name: "Jiomart", image: jiomart },
	// 	{ name: "Shopsy", image: shopsy },
	// 	{ name: "Vivo", image: vivo },
	// 	{ name: "MI", image: mi },
	// 	{ name: "Oppo", image: oppo },
	// 	{ name: "Samsung", image: samsung },
	// ];

	// useEffect(() => {
	// 	// setsiteImage(forLoop(site.label))
	// 	function forLoop() {
	// 		for (let i = 0; i < siteArr.length; i++) {
	// 			if (siteArr[i].name === site.label) {
	// 				setSiteImage(siteArr[i].image);
	// 				console.log(true);
	// 				return;
	// 			}
	// 			// console.log(false);
	// 		}
	// 	}
	// 	forLoop();
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);

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
			className={` text-sm h-24 bg-[#D0D6E0] rounded-2xl p-2 flex sm:h-12 sm:justify-around sm:pt-0.5 ${
				acknowledge && "hidden"
			}`}
		>
			{/* Left column */}
			<Image
				src={image ? `/uploads/${image}` : phoneImage}
				alt="User Image"
				className="w-20 h-auto rounded-lg sm:h-[30px] sm:w-[30px]"
				width={200}
				height={300}
			/>

			{/* Middle column */}
			<div className="flex-1 flex flex-col ml-1 justify-center items-start space-y-2 sm:space-y-0 sm:justify-start sm:gap-[3px]">
				<div className="text-[16px] font-semibold sm:text-[8px] sm:font-bold sm:leading-[10px] ">
					{name}
				</div>
				<div className="flex justify-between gap-5 items-start sm:gap-1 sm:items-center sm:mt-0">
					<Image
						src={
							site.label
								? `/static/${site.label}.svg`
								: "/static/samsung.png"
						}
						alt="Icon"
						width={30}
						height={30}
						className="w-6 h-6 sm:w-[10px] sm:h-auto"
					/>
					<div className="flex flex-col items-start justify-center sm:text-[8px] sm:text-nowrap sm:leading-none">
						{cards.map(({ label }, index) => (
							<div key={index} className="mb-1">
								{label}
							</div>
						))}
					</div>
				</div>
				<div
					className={`sm:leading-none sm:sm:text-[6px] sm:mt-0 sm:p-[2px] rounded-full ${
						delivered === "wrong OTP"
							? "bg-[#F5EFC4] text-yellow-800"
							: "bg-red-200 text-red-800"
					}`}
				>
					{/* <StatusBadge status={data.delivered} /> */}
					{delivered}
				</div>
			</div>

			{/* Right column */}
			<div className="flex flex-col justify-between items-center">
				{delivered === "wrong OTP" ? (
					<>
						<button
							onClick={() => {
								acknowledged(orderObjectId);
								setAcknowledge(true);
							}}
							className="px-2 py-1 w-full hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full mb-2"
						>
							Cancel
						</button>
						<button className="px-2 py-1 hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full">
							<Link
								href={`/odrHistory/${orderObjectId}`}
							>
								SUBMIT OTP
							</Link>
						</button>
					</>
				) : delivered === "cancelled" ? (
					<button
						onClick={() => {
							acknowledged(orderObjectId);
							setAcknowledge(true);
						}}
						className="px-2 py-1 mt-auto min-w-[100px] hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full sm:text-[8px] sm:py-[1px] sm:px-1 sm:leading-none sm:min-w-min"
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
