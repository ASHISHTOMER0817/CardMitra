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
	data,
	arr,
}: {
	data: productList;
	arr: Array<MyArrayItem>;
}) {
	// const [siteImage, setSiteImage] = useState();
	console.log(data?.site.label);

	// useEffect(() => {
	// 	// setsiteImage(forLoop(site.label))
	// 	function forLoop() {
	// 		for (let i = 0; i < siteArr.length; i++) {
	// 			if (siteArr[i].name === data?.site.label) {
	// 				console.log(data?.site.label);
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

	console.log(arr);
	return (
		<>
			<section className=" text-left mb-4">
				<div className="bg-[#FC08081A] text-[#FC0808] text-center px-4 py-1 mb-3 rounded-full sm:w-fit sm:text-nowrap sm:ml-10">
					Quantity left: {data?.requirement}{" "}
				</div>
				<div className="flex gap-10 justify-start items-start sm:flex-col sm:gap-0">
					<Image
						className="w-80 sm:w-56"
						src={`/uploads/${data?.image}`}
						alt={""}
						width={470}
						height={550}
					/>
					<div className="flex flex-col gap-12 justify-center sm:gap-2 sm:mt-2 sm:text-lg">
						{/* <div className=""> */}
						<h4
							className="font-semibold mb-2 sm:font-bold text-left sm:text-wrap sm:text-lg"
							// style={{
							// 	fontSize:'18px',
							// 	'@media (max-width: 639px)': {
							// 		fontSize: '18px !important',
							// 	    },
							// }}
						>
							{data?.name}
						</h4>
						{/* </div> */}
						{/* <div> */}
						<div className="flex items-start gap-3 sm:text-sm">
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
							<div className="flex flex-col gap-4 items-start">
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
			<section className="w-full flex justify-between items-start ">
				<div className="flex flex-col items-end ">
					<h6 className="mb-2 sm:text-[12px] sm:font-semibold">
						bank cards to use
					</h6>
					{data?.cards
						? data?.cards.map(({ label }, index) => {
								return (
									<div
										className="flex justify-center items-center gap-1"
										key={index}
									>
										<Image
											src={`/cards/${label}.svg`}
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
									? `/static/${data?.site?.label}.svg`
									: "/static/samsung.png"
							}
							width={30}
							height={30}
							alt="icon"
						/>
					</Link>
				</div>
			</section>
			<section className="text-wrap flex text-gray-600 text-sm flex-col justify-start mt-4 gap-2 sm:mb-8">
				<div className=" text-black text-lg sm:text-[12px] font-semibold">
					Address
				</div>
				{data?.address}
			</section>
		</>
	);
}
