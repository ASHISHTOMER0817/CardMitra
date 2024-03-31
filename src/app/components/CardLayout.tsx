import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import Image from "next/image";
import myntra from "@/../public/myntra.svg";
import amazon from "@/../public/amazon.svg";
import flipkart from "@/../public/flipkart.svg";
import phoneImage from "@/../public/phoneImage.jpg"
const CardLayout = () => {
	return (
		<div className="p-3 border rounded-3xl border-gray-400">
			<div className="flex items-center mb-4 gap-4">
				<div className="mr-auto px-[10px] py-[5px] text-sm rounded-3xl border text-center bg-gray-300">
					
					Quantity: 7
				</div>
				<IoHeartOutline className="text-red-500 border rounded-full p-2 w-10 h-10" />
				{/* <div></div> */}
				<CiShoppingCart className="border rounded-full p-2 w-10 h-10" />
			</div>
			<div className="flex justify-center gap-8 text-sm items-start">
				<Image
					
					className="w-24 h-[150px]"
					src={
						phoneImage
					}
					alt={""}
				/>
				<section className="flex flex-col gap-4 justify-around">
					<div className="text-wrap">
					<div className="font-semibold">	One plus Nord CE2 Lite 5G</div>
					<div className="text-gray-400 text-xs">4645756778695</div>
					</div>
					<div className=" flex">
						<div>
							<div className="text-nowrap text-primaryBgClr">Rs. 54,000</div>
							<div>Price/Unit</div>
						</div>
						<hr className="rotate-90 my-5 mx-4 w-[20px] h-3px" />
						<div>
							<div className="font-semibold text-red-500">Rs. 800</div>
							<div>Commission</div>
						</div>
					</div>
					<button className="bg-primaryBgClr px-[10px] py-[5px]  rounded-3xl border text-center w-auto text-white">
						Fulfill Order
					</button>
				</section>
			</div>
			<hr  className="my-4"/>
			<div className="flex justify-between items-center">
				<div className="flex justify-center gap-2">
					<Image src={myntra} alt={""} />
					<Image src={amazon} alt={""} />
					<Image src={flipkart} alt={""} />
				</div>
				<div className="flex flex-col justify-end text-sm items-end">
					<div className="ml-auto font-semibold">30 Mar, 24</div>
					<div className="text-xs">Fulfill By Date</div>
				</div>
			</div>
		</div>
	);
};

export default CardLayout;
