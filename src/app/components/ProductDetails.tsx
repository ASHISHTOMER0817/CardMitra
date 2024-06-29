import productList from "@/interface/productList";
import Link from "next/link";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import amazon from "@/../public/static/amazon.svg";
import flipkart from "@/../public/static/flipkart.svg";
// import jiomart from "@/../public/static/jiomart.png";
import shopsy from "@/../public/static/shopsy.jpg";
import vivo from "@/../public/static/vivo.webp";
import oppo from "@/../public/static/oppo.png";
import mi from "@/../public/static/mi.jpg";
import samsung from "@/../public/static/samsung.png";
import { useEffect, useState } from "react";
import { MyArrayItem } from "../(user)/deals/[placeorder]/page";

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
export default function ProductDetails({
	observer,
	data,
	arr,
}: {
	observer?: string
	data: productList
	arr: Array<MyArrayItem>
}) {
	return (
		<>
			<section className=" text-left mb-4 sm:w-full">
				<div className="bg-[#FC08081A] text-[#FC0808] text-center px-4 py-1 mb-3 rounded-full sm:w-full sm:text-nowrap">
					{observer !== "user" || !observer
						? "Quantity left: " + data?.requirement
						: "Ordered quantity: 1"}{" "}
				</div>
				<div className="flex justify-start items-center flex-wrap sm:justify-center">
					<Image
						className="w-80 sm:w-56"
						src={`data:image/jpg;base64,${data?.image}`}
						alt={""}
						width={470}
						height={550}
					/>
					<div className="flex flex-col gap-4 justify-center sm:gap-2 sm:mt-2 sm:text-lg sm:w-full">
						{/* <div className=""> */}
						<h4
							className="font-semibold mb-2 sm:font-bold text-left sm:text-wrap sm:text-lg center-on-small"

						>
							{data?.name}
						</h4>
						{/* </div> */}
						{/* <div> */}
						<div className="flex items-start gap-3 sm:text-sm sm:justify-center">
							<div className="">
								<div className="font-semibold text-black">
									{data?.price}
								</div>
								<div className="md:text-xs">
									Price/ Unit
								</div>
							</div>
							<Image
								src={cardVerticalLine}
								alt={""}
							/>
							<div className="">
								<div className="font-semibold text-primaryBgClr">
									{data?.commission}
								</div>
								<div className="md:text-xs">
									Commission
								</div>
							</div>
						</div>
						{/* </div> */}
						{arr.length > 0 && (
							<div className="flex flex-col gap-4 sm:gap-0 sm:mt-2 items-start">
								<div className="font-semibold sm:text-[15px]">
									Keep in mind while
									ordering :-
								</div>
								<ul className="flex flex-col text-sm gap-0.5 text-gray-700 sm:text-[13px]">
									{arr.map((e, index) => {
										return (
											<li
												key={
													index
												}
											>
												{e[1]}
											</li>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				</div>
			</section>
			<section className="w-full flex justify-between items-start flex-wrap">
				<div className="flex flex-col items-start">
					<h6 className="mb-2 sm:text-[12px] sm:font-semibold">
						bank cards to use
					</h6>
					{data?.cards
						? data?.cards.map(({ label, image }, index) => {
								return (
									<div
										className="flex justify-center items-center gap-1"
										key={index}
									>
										<Image
											src={`data:image/jpg;base64,${image}`}
											width={80}
											height={40}
											alt={""}
											className="w-8 h-auto"
										/>
										<div
											// key={index}
											className="text-gray-500 font-semibold sm:text-[12px]"
										>
											{label}
										</div>
									</div>
								);
						  })
						: ""}
				</div>
				<div>
					<h6 className="mb-2 sm:text-[12px] sm:font-semibold">
						Zip Code
					</h6>
					<div>{data?.zipCode}</div>
				</div>
				<div>
					<h6 className="mb-2 sm:text-[12px] sm:font-semibold">
						Website
					</h6>

					<Link
						className="text-primaryBgClr font-semibold hover:text-green-800 sm:text-[12px]"
						href={
							data?.productLink
								? data?.productLink
								: "#"
						}
					>
						<Image
							src={
								data?.site?.label
									? `data:image/png;base64,${data?.site?.image}`
									: "/static/samsung.png"
							}
							width={40}
							height={40}
							alt="icon"
						/>
					</Link>
				</div>
			</section>
			<section className="text-wrap flex text-gray-600 text-sm flex-col justify-start mt-4 gap-2 sm:mb-4 sm:w-full">
				<div className=" text-black text-lg sm:text-[12px] font-semibold">
					Address
				</div>
				{data?.address}
			</section>
		</>
	);
}
