import React, { ReactNode } from "react";
import Image from "next/image";
import myntra from "@/../public/myntra.svg";
import amazon from "@/../public/amazon.svg";
import flipkart from "@/../public/flipkart.svg";
import phoneImage from "@/../public/phoneImage.jpg";
const CardLayout = ({
	image,
	placeOrder,
	beforeDate,
	quantity,
	name,
	randomNo,
	price,
	commission,
	classList
}: {
	image?: ReactNode;
	placeOrder?: ReactNode;
	beforeDate?: ReactNode;
	quantity: number;
	name: string;
	randomNo: number;
	price: number;
	commission: number;
	classList?:string
}) => {
	return (
		<div className={`p-7 border rounded-2xl border-gray-400 ${classList}`}>
			<div className="flex items-center mb-4 gap-4">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-200">
					Quantity: {quantity}
				</div>
				{image}
				{/* <IoHeartOutline className="text-red-500 border rounded-full p-2 w-10 h-10" />
				<CiShoppingCart className="border rounded-full p-2 w-10 h-10" /> */}
			</div>
			<div className="flex justify-center gap-8 text-sm items-start">
				<Image
					className="w-24 h-[150px]"
					src={phoneImage}
					alt={""}
				/>
				<section className="flex flex-col gap-4 justify-around">
					<div className="text-wrap">
						<div className="font-semibold text-base">
							{" "}
							{name}
						</div>
						<div className="text-gray-400 text-xs">
							{randomNo}
						</div>
					</div>
					<div className=" flex">
						<div>
							<div className="text-nowrap font-bold text-primaryBgClr">
								Rs. {price}
							</div>
							<div>Price/Unit</div>
						</div>
						<hr className="rotate-90 my-5 mx-4 w-[20px] h-3px" />
						<div>
							<div className="font-bold text-red-500">
								Rs. {commission}
							</div>
							<div>Commission</div>
						</div>
					</div>
					{placeOrder}
					{/* <button className="bg-primaryBgClr px-[10px] py-[5px]  rounded-3xl border text-center w-auto text-white">
						Fulfill Order
					</button> */}
				</section>
			</div>
			<hr className="my-4" />
			<div className="flex justify-between items-center">
				<div className="flex justify-center gap-2">
					<Image src={myntra} alt={""} />
					<Image src={amazon} alt={""} />
					<Image src={flipkart} alt={""} />
				</div>
				{beforeDate}
				{/* <div className="flex flex-col justify-end text-sm items-end">
					<div className="ml-auto font-semibold">30 Mar, 24</div>
					<div className="text-xs">Fulfill By Date</div>
				</div> */}
			</div>
		</div>
	);
};

export default CardLayout;
