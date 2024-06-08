"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
// import amazon from "@/../public/static/amazon.svg";
// import flipkart from "@/../public/static/flipkart.svg";
// import jiomart from "@/../public/static/jiomart.png";
// import shopsy from "@/../public/static/shopsy.jpg";
// import vivo from "@/../public/static/vivo.webp";
// import oppo from "@/../public/static/oppo.png";
// import mi from "@/../public/static/mi.jpg";
// import samsung from "@/../public/static/samsung.png";

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
	image?: ReactNode;
	placeOrder?: ReactNode;
	quantity: number;
	name: string;
	price: number;
	commission: number;
	classList?: string;
	site: { value: string; label: string };
	deviceImage: string;
	cards: { value: string; label: string }[];
}) => {
	return (
		<div
			className={`p-7 border h-full rounded-2xl sm:px-4 sm:py-3 border-gray-400 ${classList}`}
		>
			<div className="flex items-center mb-4 gap-4 sm:ml-4 sm:mb-2 float-right-sm">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-200 sm:text-[10px] sm:px-1 sm:py-0">
					Quantity: {quantity}
				</div>
				{image}
			</div>
			<div className="flex justify-center text-sm items-start md:gap-0 sm:justify-between">
				<Image
					className="w-40 h-[150px] sm:h-[100px] sm:w-[100px]"
					src={
						deviceImage
							? `/uploads/${deviceImage}`
							: phoneImage
					}
					alt={""}
					width={100}
					height={150}
				/>
				<section className="flex flex-col gap-4 justify-around md:gap-0 sm:mt-1">
					<div className=" text-wrap font-semibold  text-base md:h-[30px] sm:text-[14px] leading-4">
						{" "}
						{name}
					</div>

					<div className=" flex">
						<div>
							<div className="text-nowrap font-bold text-black sm:leading-4 sm:text-[10px]">
								Rs. {price}
							</div>
							<div className="md:text-[10px] sm:leading-4">
								Price/Unit
							</div>
						</div>
						<hr className="rotate-90 my-5 mx-4 w-[20px] h-3px md:mx-0 md:my-[2px] md:w-[70px] sm:w-[26px] sm:mt-4 sm:mb-0.5" />
						<div>
							<div className="font-bold  text-primaryBgClr sm:leading-4 sm:text-[10px]">
								Rs. {commission}
							</div>
							<div className="md:text-[10px] sm:leading-4 sm:text-[10px]">
								Commission
							</div>
						</div>
					</div>
					{placeOrder}
				</section>
			</div>
			<hr className="my-4 sm:my-2" />
			<div className="flex justify-between items-center sm:w-full min-h-10">
				<Image
					src={
						// `/cards/HDFC credit card.svg`
						site.label
							? `/static/${site.label}.svg`
							: ""
					}
					width={30}
					height={30}
					alt={""}
					className="website-img h-7 w-7"
				/>

				<div className="flex flex-col justify-start items-start text-sm font-semibold text-gray-600">
					{cards?.map(({ label }, index) => {
						console.log("thisiscard", label);
						return (
							<div
								key={index}
								className="flex justify-center items-center gap-1"
							>
								{" "}
								<Image
									src={`/cards/${label}.svg`}
									width={80}
									height={40}
									alt={""}
									className="w-12 h-auto card-img"
								/>
								<div className="sm:font-light sm:text-[7px] sm:leading-3">
									{label}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CardLayout;
