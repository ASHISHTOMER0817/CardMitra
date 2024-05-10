"use client";
import React, { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import amazon from "@/../public/static/amazon.svg";
import flipkart from "@/../public/static/flipkart.svg";
import jiomart from "@/../public/static/jiomart.png";
import shopsy from "@/../public/static/shopsy.jpg";
import vivo from "@/../public/static/vivo.webp";
import oppo from "@/../public/static/oppo.png";
import mi from "@/../public/static/mi.jpg";
import samsung from "@/../public/static/samsung.png";
import phoneImage from "@/../public/phoneImage.jpg";
const CardLayout = ({
	image,
	placeOrder,
	quantity,
	name,
	price,
	commission,
	classList,
	site,
	deviceImage,
	cards,
}: {
	image?:ReactNode
	placeOrder?: ReactNode;
	quantity: number;
	name: string;
	price: number;
	commission: number;
	classList?: string;
	site: string;
	deviceImage: string;
	cards: string[];
}) => {
	const [siteImage, setsiteImage] = useState("");
	console.log(siteImage);
	const siteArr = [
		{ name: "amazon", image: amazon },
		{ name: "flipkart", image: flipkart },
		{ name: "jiomart", image: jiomart },
		{ name: "shopsy", image: shopsy },
		{ name: "vivo", image: vivo },
		{ name: "mi", image: mi },
		{ name: "oppo", image: oppo },
		{ name: "samsung", image: samsung },
	];

	useEffect(() => {
		function forLoop() {
			for (let i = 0; i < siteArr.length; i++) {
				if (siteArr[i].name === site) {
					setsiteImage(siteArr[i].image);
					console.log(true);
					return;
				}
				console.log(false);
			}
		}
		forLoop();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={`p-7 border rounded-2xl md:p-2 border-gray-400 ${classList}`}
		>
			<div className="flex items-center mb-4 gap-4">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-200">
					Quantity: {quantity}
				</div>
				{image}
			</div>
			<div className="flex justify-center gap-8 text-sm items-start md:gap-1">
				<Image
					className="w-24 h-[150px] md:w-[85px] md:h-[120px]"
					src={
						deviceImage
							? `/uploads/${deviceImage}`
							: phoneImage
					}
					alt={""}
				/>
				<section className="flex flex-col gap-4 justify-around md:gap-0">
					<div className=" text-wrap font-semibold  text-base md:h-10 md:leading-4">
						{" "}
						{name}
					</div>

					<div className=" flex md:flex-col">
						<div>
							<div className="text-nowrap font-bold text-primaryBgClr">
								Rs. {price}
							</div>
							<div className="md:text-[10px]">
								Price/Unit
							</div>
						</div>
						<hr className="rotate-90 my-5 mx-4 w-[20px] h-3px md:mx-0 md:my-[2px] md:rotate-0 md:w-[70px]" />
						<div>
							<div className="font-bold text-red-500">
								Rs. {commission}
							</div>
							<div className="md:text-[10px]">
								Commission
							</div>
						</div>
					</div>
					{placeOrder}
				</section>
			</div>
			<hr className="my-4" />
			<div className="flex justify-between items-center">
				<div className="flex justify-center gap-2">
					{siteImage ? (
						<Image
							src={siteImage}
							width={40}
							height={40}
							alt={""}
						/>
					) : null}
					{/* <Image src={shopsy} width={20} height={20} alt={""}/> */}
				</div>
				<div className="flex flex-col justify-start items-start gap-2 text-sm font-semibold text-gray-600">
					{cards.map((card) => {
						return (
							<>
								<div>{card}</div>
							</>
						);
					})}
				</div>

				{/* <div className="flex flex-col justify-end text-sm items-end">
					<div className="ml-auto font-semibold">30 Mar, 24</div>
					<div className="text-xs">Fulfill By Date</div>
				</div> */}
			</div>
		</div>
	);
};

export default CardLayout;
