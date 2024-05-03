"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import productList from "@/interface/productList";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import Link from "next/link";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import BackwardButton from "./BackwardButton";

const ProductDetails = ({ data }: { data: productList }) => {
	const [arr, setArr] = useState<string[]>([]);
	const { first, second, third, fourth } = data.info;
	console.log(first, second, third, fourth)
	useEffect(() => {
		 function appendPoints() {
			check(first);
			check(second);
			check(third);
			check(fourth);
		}
		appendPoints();
		console.log(arr)
	}, []);

	function check(point: string) {
		if (!point) {
			return;
		} else {
			setArr((arr) => [...arr, point]);
		}
	}

	console.log("data is: ", data);
	return (
		<>
			<section className=" text-left">
				<BackwardButton />
				<div className="flex gap-10 justify-start items-start">
					<Image
						className=" w-40"
						src={phoneImage}
						alt={""}
					/>
					<div className="flex flex-col gap-5 justify-center">
						<div className="text-left">
							<h4 className="font-semibold mb-2">
								{data?.name}
							</h4>
						</div>
						<div>
							<div className="flex items-start gap-3">
								<div className="">
									<div className="font-semibold text-primaryBgClr">
										{data?.price}
									</div>
									<div className="text-xs">
										Price/ Unit
									</div>
								</div>
								<Image
									src={cardVerticalLine}
									alt={""}
								/>
								<div className="">
									<div className="font-semibold text-red-500">
										{data?.commission}
									</div>
									<div className="text-xs">
										Commission
									</div>
								</div>
							</div>
						</div>
						{arr.length > 0 && (
							<div className="flex flex-col gap-4 items-start">
								<div>
									Keep in mind while
									ordering :-
								</div>
								<ul className="flex flex-col gap-1">
									{arr.map((e, index) => {
										return (
											<li
												key={
													index
												}
											>
												{e}
											</li>
										);
									})}
								</ul>
							</div>
						)}
					</div>
				</div>
			</section>
			<div className="w-full flex justify-between items-start">
				<div>
					<h6 className="mb-2">bank cards to use</h6>
					<div className="text-gray-500 font-semibold">
						Amazon Pay
					</div>
					<div className="text-gray-500 font-semibold">
						Amazon Pay
					</div>
				</div>
				<div>
					<h6 className="mb-2">Websites</h6>
					
						<Link className="text-primaryBgClr font-semibold hover:text-green-800" href={data?.productLink}>Amazon</Link>
					
				</div>
			</div>
			<section className="text-wrap flex flex-col justify-start gap-3">
				<div className="font-semibold text-black text-base">
					Address
				</div>
				{data.address}
			</section>
		</>
	);
};

export default ProductDetails;
