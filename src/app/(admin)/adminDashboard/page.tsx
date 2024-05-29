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

interface dashboardData {
	orderHistory: productList[];
	deliveries: number;
	noOfAffiliate: number;
	order: number;
}
const AdminDashboard = () => {
	const [data, setData] = useState<dashboardData>();
	const [syncOperation, setSyncOperation] = useState(false);
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
				label: "Order placed monthly",
				data: [65, 59, 80, 81, 56, 50],
				fill: false,
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
		],
	});

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/admin/dashboard?query=dashboard&syncOperation=${syncOperation.toString()}`
				);
				setData(response.data.data);
			} catch {
				console.log("what is happening here !!");
			}
		}
		getData();
	}, [syncOperation]);

	// async function syncOperation(){
	// 	try{
	// 		const response = await axios.get('')
	// 	}
	// }
	return (
		<div className="mx-6 w-[95%] mt-6 md:text-xs sm:mx-0 sm:w-full">
			<section className="mt-9 ">
				<h3 className=" font-semibold mb-3">Dashboard</h3>
				<div className="flex justify-start gap-2 sm:gap-1">
					<div
						className=" text-center px-20 py-8 rounded-3xl flex flex-col items-center bg-[#F3F3F3] cursor-pointer md:min-w-[20%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:pt-0 sm:pb-1 sm:px-1 sm:leading-none"
						// href={"/otpList"}
						onClick={() => setSyncOperation(true)}
					>
						{/* <h5 className="text-[#1844E1] sm:text-[10px] sm:leading-none">
							{data?.deliveries}{" "}
						</h5>{" "}
						<div className="sm:text-[8px] ">
							{" "}
							Recent deliveries
						</div> */}
						<MdOutlineCloudSync className="w-6 h-6 text-primaryBgClr" />
						<div className="px-2 py-0.5 rounded-full mx-auto my-auto">
							Sync orders
						</div>
					</div>
					<div className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[20%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:pt-0 sm:pb-1 sm:px-1 sm:leading-none">
						<h5 className="text-primaryBgClr sm:text-[10px] sm:leading-none">
							{data?.order}
						</h5>
						<div className="sm:text-[8px] ">
							{" "}
							Today&apos;s Orders
						</div>
					</div>
					<div className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[20%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:pt-0 sm:pb-1 sm:px-1 sm:leading-none">
						<h5 className="text-primaryBgClr sm:text-[10px] sm:leading-none">
							{data?.noOfAffiliate}
						</h5>
						<div className="sm:text-[8px] ">
							{" "}
							Affiliates Joined
						</div>
					</div>
				</div>
			</section>
			<section className="mt-9 ">
				<div className="flex justify-between mb-3 items-center">
					<h4 className="font-semibold">Overview</h4>
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

			<section className="mt-9 ">
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
				<div className="grid grid-flow-row gap-3 grid-cols-3 sm:grid-cols-2">
					{!data ? (
						<Loader />
					) : (
						<CardLayoutAdminDashboard
							data={data?.orderHistory}
						/>
					)}
				</div>
			</section>

			<section className="mt-9 ">
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
