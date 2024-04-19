import React from "react";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg";
import productList from "@/interface/productList";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import Link from "next/link";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import { useRouter } from "next/navigation";

const ProductDetails = ({ data }: { data: productList }) => {
	console.log("data is: ", data);
	const router = useRouter();
	function backward() {
		router.back();
	}
	return (
		<div>
			<section className=" text-left">
				<div className="flex gap-4 justify-center items-start">
					<Image
						onClick={backward}
						className=" w-40"
						src={phoneImage}
						alt={""}
					/>
					<div className="flex flex-col gap-5 justify-center">
						<div className="text-left">
							<div className="font-semibold text-base mb-2">
								{data?.name}
							</div>
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
			<section className="flex justify-between items-center gap-4">
				<div className="">
					<div className="mb-[4px]">
						<Image src={cards} alt="" />
					</div>
					<div>Offers available on bank cards</div>
				</div>
				<div className="">
					<div className="">
						{" "}
						<Image src={platform} alt={""} />
					</div>
					<div>Websites</div>
				</div>
			</section>
			<section className="text-wrap flex flex-col justify-start gap-3 text-primaryBgClr">
				<div className="font-semibold text-black text-base">
					Direct Links
				</div>
				<Link href={data?.productLink || "#"}>
					{data?.productLink!}
				</Link>
				{/* <Link
    href={
          "www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef54f645"
    }
>
    https://www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef5
    4f645
</Link>
<Link
    href={
          "www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef54f645"
    }
>
    https://www.flipkart.com/apple-iphone-15-blue-128-gb/pitmbf14ef5
    4f645
</Link> */}
			</section>
		</div>
	);
};

export default ProductDetails;
