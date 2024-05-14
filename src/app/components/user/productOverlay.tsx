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

const DashboardOverlay = ({
	data,
}: {
	data: { orderObjectId: productList; delivered: string };
}) => {
	const [siteImage, setSiteImage] = useState("");
	const { name, image, cards, site, _id } = data.orderObjectId;

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
	return (
		<div className="fixed top-0 right-0 w-4/12 h-36 bg-gray-100 rounded-xl p-4 flex">
			{/* Left column */}
			<Image
				src={image ? `/uploads/${image}` : phoneImage}
				alt="User Image"
				className="w-16 h-28 rounded-lg"
				width={30}
				height={45}
			/>

			{/* Middle column */}
			<div className="flex-1 flex flex-col justify-center items-center space-y-2">
				<h5>{name}</h5>
				<div className="flex justify-center items-end">
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
				{data.delivered === "OTP issue" ? (
					<>
						<button className="px-2 py-1 w-full text-gray-500 border-gray-500 border rounded-full mb-2">
							Cancel
						</button>
						<button className="px-2 py-1 text-primaryBgClr border-primaryBgClr border rounded-full">
							<Link href={`/odrHistory/${_id}`}></Link>SUBMIT OTP
						</button>
					</>
				) : data.delivered === "cancelled" ? (
					<button className="px-2 py-1 mt-auto text-primaryBgClr border-primaryBgClr border rounded-full">
						<Link href={'/odrHistory?listType=cancelled'}></Link>VIEW
					</button>
				) : null}
			</div>
		</div>
	);
};

export default DashboardOverlay;
