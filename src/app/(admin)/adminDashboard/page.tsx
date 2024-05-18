"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import axios from "axios";
import productList from "@/interface/productList";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";
import Link from "next/link";
import Loader from "@/app/components/loader";

interface dashboardData {
	orderHistory: productList[];
	deliveries: number;
	noOfAffiliate: number;
	order: number;
}
const AdminDashboard = () => {
	const [data, setData] = useState<dashboardData>();
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
				label: "My First Dataset",
				data: [65, 59, 80, 81, 56, 55, 40, 65, 87, 30, 62],
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
					"/api/admin/dashboard?query=dashboard"
				);
				setData(response.data.data);
			} catch {
				console.log("what is happening here !!");
			}
		}
		getData();
	}, []);

	return (
		<div className="mx-6 w-[90%] mt-6 md:text-xs">
			
			<section className="mt-9 ">
				<h3 className=" font-semibold mb-3">Dashboard</h3>
				<div className="flex justify-start gap-2 sm:gap-1">
					<Link
						className=" text-center px-20 py-8 rounded-3xl bg-[#F3F3F3] cursor-pointer md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0"
						href={"/otpList"}
					>
						<h5 className="text-[#1844E1] sm:text-xs">
							{data?.deliveries}{" "}
						</h5>{" "}
						<div className="sm:text-[10px]">
							{" "}
							Recent deliveries
						</div>
					</Link>
					<div className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0">
						<h5 className="text-primaryBgClr sm:text-xs">
							{data?.order}
						</h5>
						<div className="sm:text-[10px]">
							{" "}
							Orders placed <br />
							today
						</div>
					</div>
					<div className=" text-center px-20 py-8 rounded-3xl  bg-[#F3F3F3] cursor-pointer md:min-w-[31%] sm:flex sm:flex-col sm:justify-center sm:items-center sm:py-0 sm:px-0">
						<h5 className="text-primaryBgClr sm:text-xs">
							{data?.noOfAffiliate}
						</h5>
						<div className="sm:text-[10px]">
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
						className="text-primaryBgClr text-base"
					>
						DETAILS
					</Link>
				</div>
				<div>
					<BarChart
						ChartData={userData}
						options={{ maintainAspectRatio: false }}
					/>
				</div>
			</section>

			<section className="mt-9 ">
				<div className="flex justify-between mb-3 items-center">
					<h4 className="font-semibold">Order History</h4>
					<Link
						href={"/orders"}
						className="text-primaryBgClr hover:text-green-300 text-base"
					>
						VIEW ALL
					</Link>
				</div>
				<div className="grid grid-flow-row gap-3 grid-cols-3">
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
					<h4 className="font-semibold">
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
