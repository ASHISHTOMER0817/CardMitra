"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";

const CardLayout = ({
	icons,
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
	icons?: ReactNode;
	placeOrder?: ReactNode;
	quantity: number;
	name: string;
	price: number;
	commission: number;
	classList?: string;
	site: { value: string; label: string; image: any };
	deviceImage: any;
	cards: { value: string; label: string; image: any }[];
}) => {


	return (
		<div
			className={`p-4 h-full border rounded-2xl sm:px-4 sm:py-3 border-gray-400 ${classList}`}
		>
			<div className="flex items-center mb-4 gap-4 sm:ml-4 sm:mb-2 float-right-sm">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-200 sm:text-[10px] sm:px-1 sm:py-0">
					{quantity} Pcs
				</div>
				{icons}
			</div>
			<div className="flex justify-center text-sm items-start md:gap-5 sm:justify-between gap-2.5">
				<Image loading="lazy"
					className="w-40 h-auto sm:h-auto sm:w-[100px]"
					src={
						deviceImage
							? `data:image/webp;base64,${deviceImage}`
							: phoneImage
					}
					alt={""}
					width={100}
					height={120}
				/>
				<section className="flex flex-col gap-4 justify-around sm:mt-1 sm:gap-2">
					<div className=" text-wrap font-semibold text-base md:h-[30px] sm:text-[14px] left-on-small sm:leading-[18px]">
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
								Profit
							</div>
						</div>
					</div>
					{placeOrder}
				</section>
			</div>
			<hr className="my-4 sm:my-2" />
			<div className="flex justify-between items-center sm:w-full min-h-10">
				<Image loading="lazy" quality={30} fetchPriority="low"
					src={`data:image/png;base64,${site.image}`}
					width={56}
					height={56}
					alt={site.value}
					className=" sm: h-auto w-14"
				/>
				{/*Removed the website-img class */}

				<div className="flex flex-col justify-start items-start text-sm font-semibold text-gray-600">
					{cards?.map(({ value, image }, index) => {
						// console.log("thisiscard", value);
						return (
							<div
								key={index}
								className="flex justify-center items-center gap-1"
							>
								{" "}
								<Image
									src={`data:image/jpg;base64,${image}`}
									width={80}
									height={40}
									alt={""}
									className="w-12 h-auto card-img"
								/>
								<div className="sm:font-light sm:text-[7px] sm:leading-3">
									{value}
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
