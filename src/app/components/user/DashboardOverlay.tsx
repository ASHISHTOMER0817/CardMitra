import React, { useEffect, useState } from "react";
import Image from "next/image";
import productList from "@/interface/productList";
import phoneImage from "@/../public/phoneImage.jpg";
import Link from "next/link";
import axios from "axios";
import Popup from "../Popup";
import StatusBadge from "../StatusBadge";

const DashboardOverlay = ({
	product,
	delivered,
	orderObjectId,
}: {
	product: productList;
	orderObjectId: string;
	delivered: string;
}) => {
	// const [siteImage, setSiteImage] = useState("");
	const { name, image, cards, site, _id } = product;
	const [acknowledge, setAcknowledge] = useState(false);

	async function acknowledged(acknowledgment: string) {
		try {
			const response = await axios.get(
				`/api/users/dashboard?query=${acknowledgment}`
			);
			console.log(response.data.data);
		} catch {
			Popup("error", "server error, please refresh");
		}
	}

	return (
		<>
			{/* <div
			className={` text-sm h-24 bg-[#D0D6E0] rounded-lg p-2 flex sm:h-12 sm:justify-around sm:pt-0.5 ${
				acknowledge && "hidden"
			}`}
		>
			<Image
				src={image ? `/uploads/${image}` : phoneImage}
				alt="User Image"
				className="w-20 h-auto rounded-lg sm:h-[30px] sm:w-[30px]"
				width={200}
				height={300}
			/>

			
			<div className="flex-1 flex flex-col ml-1 justify-center items-start space-y-2 sm:space-y-0 sm:justify-start sm:gap-[3px]">
				<div className="text-[16px] font-semibold sm:text-[8px] sm:font-bold sm:leading-[10px] ">
					{name}
				</div>
				<div style={{fontSize: '12px'}} className="flex justify-between gap-2 items-start sm:gap-1 sm:items-center sm:mt-0">
					<Image
						src={
							site.label
								? `/static/${site.label}.svg`
								: "/static/samsung.png"
						}
						alt="Icon"
						width={30}
						height={30}
						className="w-6 h-6 sm:w-[10px] sm:h-auto"
					/>
					<div className="flex flex-col items-start justify-center sm:text-[8px] sm:text-nowrap sm:leading-none">
						{cards.map(({ label }, index) => (
							<div key={index} className="mb-1">
								{label}
							</div>
						))}
					</div>
				</div>
				<div
					className={`sm:leading-none sm:text-[6px] sm:mt-0 sm:p-[2px] px-2 rounded-full ${
						delivered === "wrong OTP"
							? "bg-[#F5EFC4] text-yellow-800"
							: "bg-red-200 text-red-800"
					}`}
					style={{fontSize: '9px'}}
				>
					{delivered}
				</div>
			</div>

			<div className="flex flex-col justify-between items-center">
				{delivered === "wrong OTP" ? (
					<>
						<button
							onClick={() => {
								acknowledged(orderObjectId);
								setAcknowledge(true);
							}}
							className="px-2 py-1 w-full hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full mb-2"
						>
							Cancel
						</button>
						<button className="px-2 py-1 hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full">
							<Link
								href={`/odrHistory/${orderObjectId}`}
							>
								SUBMIT OTP
							</Link>
						</button>
					</>
				) : delivered === "cancelled" ? (
					<button
						onClick={() => {
							acknowledged(orderObjectId);
							setAcknowledge(true);
						}}
						className="px-2 py-1 mt-auto min-w-[100px] hover:bg-gray-100 text-gray-500 border-gray-500 border rounded-full sm:text-[8px] sm:py-[1px] sm:px-1 sm:leading-none sm:min-w-min"
					>
						OK
					</button>
				) : null}
			</div>
		</div> */}
			<div className={`bg-white shadow-md rounded-lg p-3 flex items-center space-x-3 max-w-xs ${acknowledge && 'hidden'}`}>
				<Image
					src={image ? `/uploads/${image}` : phoneImage}
					alt={name}
					className="w-16 h-16 object-cover rounded-md"
					width={64}
					height={64}
				/>
				<div className="flex-1">
					<h3 className="font-semibold text-sm">{name}</h3>
					<div className="flex items-center space-x-1 mt-1">
						<Image
							src={
								site.label
									? `/static/${site.label}.svg`
									: "/static/samsung.png"
							}
							alt={site.label}
							width={16}
							height={16}
							className="w-4 h-4"
						/>
						<span className="text-xs text-gray-600">
							{cards[0]?.label}
						</span>
					</div>
					<div
						className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block
          ${
			delivered === "wrong OTP"
				? "bg-yellow-100 text-yellow-800"
				: "bg-red-100 text-red-800"
		}`}
					>
						{delivered}
					</div>
				</div>
				<div className="flex flex-col space-y-2">
					{delivered === "wrong OTP" ? (
						<>
							<button
								onClick={() =>
									{acknowledged(orderObjectId);setAcknowledge(true)}
								}
								className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
							>
								Cancel
							</button>
							<Link
								href={`/odrHistory/${orderObjectId}`}
							>
								<button className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-full">
									Submit OTP
								</button>
							</Link>
						</>
					) : (
						<button
							onClick={() =>
								{acknowledged(orderObjectId);setAcknowledge(true)}
							}
							className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full"
						>
							OK
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default DashboardOverlay;
