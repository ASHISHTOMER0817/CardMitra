import productList from "@/interface/productList";
import Link from "next/link";
import Image from "next/image";
import phoneImage from "@/../public/phoneImage.jpg"
import cardVerticalLine from "@/../public/cardVerticalLine.svg";

export default function ProductDetails({
	data,
	arr,
}: {
	data: productList;
	arr: string[];
}) {

	console.log(arr)
	return (
		<>
			<section className=" text-left">
				<div className="bg-[#FC08081A] text-[#FC0808] text-center px-4 py-1 mb-3 rounded-full">
					Quantity left: {data?.requirement}{" "}
				</div>
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
									<div className="md:text-xs">
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
									<div className="md:text-xs">
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
			<section className="w-full flex justify-between items-start">
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
					<h6 className="mb-2">Website</h6>

					<Link
						className="text-primaryBgClr font-semibold hover:text-green-800"
						href={
							data?.productLink
								? data?.productLink
								: "#"
						}
					>
						{data?.site}
					</Link>
				</div>
			</section>
			<section className="text-wrap flex text-gray-600 text-sm  flex-col justify-start mt-3 gap-2">
				<div className=" text-black text-lg">Address</div>
				{data?.address}
			</section>
		</>
	);
}