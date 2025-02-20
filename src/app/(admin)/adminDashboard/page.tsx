"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import axios from "axios";
import productList from "@/interface/productList";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";
import Link from "next/link";
import Loader from "@/app/components/loader";
import { Legend, plugins } from "chart.js";
import { MdOutlineCloudSync } from "react-icons/md";
import Popup from "@/app/components/Popup";

interface dashboardData {
	orderHistory: productList[];
	// deliveries: number;
	noOfAffiliate: number;
	order: number;
	arr: number[];
}
const AdminDashboard = () => {
	const [data, setData] = useState<dashboardData>();
	// const [syncOperation, setSyncOperation] = useState<boolean>(false);
	// const [chartArr, setChartArr] = useState<number[]>([0,0,0,0,0,0,0,0,0,0,0,0,]);
	const [disabled, setDisabled] = useState(false);
	const [orders, setOrders] = useState(0);
	const [userData, setUserData] = useState({
		labels: [
			"JAN",
			"FEB",
			"MAR",
			"APR",
			"MAY",
			"JUN",
			"JUL",
			"AUG",
			"SEP",
			"OCT",
			"NOV",
			"DEC",
		],
		datasets: [
			{
				label: "Order placed",
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	});

	useEffect(() => {
		// Update userData when chartArr changes
		setUserData((prevData) => ({
			...prevData,
			datasets: [
				{
					...prevData.datasets[0],
					data: data?.arr
						? [...data?.arr]
						: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				},
			],
		}));
	}, [data?.arr]);

	async function sync() {
		try {
			setDisabled(true);
			const response = await axios.get(
				'/api/admin/dashboard?syncOperation=true'
			);
			setDisabled(false);

			if (response.data.success) {
				Popup("success", response.data.message);
			} else {
				Popup("error", response.data.message);
			}
		} catch {
			setDisabled(false);
		}
	}

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					'/api/admin/dashboard?query=dashboard'
				);
				setData(response.data.data);
			} catch {
				console.log("something went wrong");
			}
		}
		getData();
	}, []);

	return (
		<div className="mx-6 w-[95%] mt-3 md:text-xs sm:mx-0 sm:w-full">
			<section className="">
				<h3 className=" font-semibold mb-3">Dashboard</h3>
				<div className="flex justify-start gap-2 sm:gap-1">
					<div
						className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3 sm:px-[6px]"
					>
						
						<Link href={'/syncOrders'} className="sm:text-[10px] leading-none text-center">
							<MdOutlineCloudSync className="w-6 h-6 text-primaryBgClr mx-auto sm:h-[17px]" />
							<span>Sync orders</span>
						</Link>
					</div>
					{/* <button
						className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3 sm:px-[6px]"
						// href={"/otpList"}
						disabled={disabled}
						onClick={sync}
					>
						<MdOutlineCloudSync className="w-6 h-6 text-primaryBgClr mx-auto sm:h-[17px]" />
						<div className="sm:text-[10px] leading-none text-center">
							Sync orders
						</div>
					</button> */}
					<div
						// className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[20%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:pt-0 sm:pb-1 sm:px-1 sm:leading-none"
						className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3 sm:px-[6px]"
					>
						<h5 className="text-primaryBgClr sm:text-[12px] font-bold sm:leading-none text-center sm:mb-2">
							{data?.order}
						</h5>
						<div className="sm:text-[10px] leading-none text-center">
							{" "}
							Today&apos;s Orders
						</div>
					</div>
					<div
						// className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[20%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:pt-0 sm:pb-1 sm:px-1 sm:leading-none"
						className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3 sm:px-[6px]"
					>
						<h5 className="text-primaryBgClr sm:text-[12px] font-bold sm:leading-none text-center sm:mb-2">
							{data?.noOfAffiliate}
						</h5>
						<div className="sm:text-[10px] leading-none text-center">
							{" "}
							Affiliates Joined
						</div>
					</div>
				</div>
			</section>
			<section className="mt-9 sm:mt-4 ">
				<div className="flex justify-between items-center">
					<h3 className="font-semibold">Overview</h3>
					<Link
						href={"/orders"}
						className="text-primaryBgClr text-base sm:text-xs"
					>
						DETAILS
					</Link>
				</div>
				<div>
					<BarChart
						ChartData={userData}
						// options={{
						// 	maintainAspectRatio: false,
						// 	plugins: {
						// 		Legend: {
						// 			labels: {
						// 				font: { size: 30 },
						// 			},
						// 		},
						// 	},
						// }}
					/>
				</div>
			</section>

			<section className="mt-9 sm:mt-4 ">
				<div className="flex justify-between mb-3 items-center">
					<h4 className="font-semibold sm:text-sm">
						Order History
					</h4>
					<Link
						href={"/orders"}
						className="text-primaryBgClr hover:text-green-300 text-base sm:text-xs"
					>
						VIEW ALL
					</Link>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					{!data ? (
						<Loader />
					) : (
						data.orderHistory.map(
							(
								data: productList,
								index: number
							) => {
								return (
									<CardLayoutAdminDashboard
										key={index}
										data={data}
									/>
								);
							}
						)
						// <CardLayoutAdminDashboard
						// 	data={data?.orderHistory}
						// />
					)}
				</div>
			</section>

			<section className="mt-9 sm:mt-4 mb-3">
				<div className="flex justify-between mb-3 items-center">
					<h4 className="font-semibold sm:text-sm">
						Affiliate Requests
					</h4>
					<Link
						href={"/adminBookers"}
						className="text-primaryBgClr hover:text-green-300 text-base sm:text-xs"
					>
						VIEW ALL
					</Link>
				</div>
				<AffiliateRequest heading={""} />
			</section>
		</div>
	);
};

export default AdminDashboard;
