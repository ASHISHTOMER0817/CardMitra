import React from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import productList from "@/interface/productList";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import Link from "next/link";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import BackwardButton from "./BackwardButton";

const ProductDetails = ({ data }: { data: productList }) => {
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
							<div className="text-[#12121280] text-xs">
								6541651563516532
							</div>
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
					</div>
				</div>
			</section>
			<section className="grid grid-flow-row grid-cols-2 justify-between w-2/4 items-center gap-x-10 gap-y-5">
				<Image src={cards} alt="" />{" "}
				<Image src={platform} alt={""} />
				<div>Offers available on bank cards</div>
				<div>Websites</div>
			</section>
			<section className="text-wrap flex flex-col justify-start gap-3 text-primaryBgClr">
				<div className="font-semibold text-black text-base">
					Direct Links
				</div>
				<Link href={data?.productLink || "#"}>
					{data?.productLink!}
				</Link>
			</section>
		</>
	);
};

export default ProductDetails;
