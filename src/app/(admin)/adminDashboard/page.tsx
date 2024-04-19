"use client";
import React, { useEffect, useState } from "react";
import NavigationSidebar from "../../components/NavigationSidebar";
import SideBar from "../../components/Sidebar";
import heroicon from "@/../public/heroicon.svg";
import Heroicon from "@/app/components/Heroicon";
import BarChart from "@/app/components/BarChart";
import OrderHistory from "@/app/components/OrderHistory";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import CardLayout from "@/app/components/CardLayout";
import Image from "next/image";
import deleteIcon from "@/../public/delete.svg";
import edit from "@/../public/edit.svg";
import axios from "axios";
import productList from "@/interface/productList";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";

interface OrderHistory {
	product: productList;
}
const AdminDashboard = () => {
	const [data, setData] = useState<OrderHistory[]>([]);
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
				console.log(response.data.data);
				setData(response.data.data);
			} catch {
				console.log("what is happening here !!");
			}
		}
		getData();
	},[]);
	return (
		<div className="mx-6 w-full mt-6">
			<section className="mt-9 ">
				<h3 className=" font-semibold mb-3">Dashboard</h3>
				<div className="flex justify-between gap-2">
					<div className="px-32 py-8 rounded-3xl  bg-[#F3F3F3] ">
						<h3 className="text-[#1844E1]">Rs.300</h3>{" "}
						Today&apos;s profile
					</div>
					<div className="px-32 py-8 rounded-3xl  bg-[#F3F3F3] ">
						<h3 className="text-primaryBgClr">64</h3>
						Orders placed <br />
						till date
					</div>
					<div className="px-32 py-8 rounded-3xl  bg-[#F3F3F3]">
						<h3 className="text-primaryBgClr">
							Rs. 6,800
						</h3>
						Commission earned
					</div>
				</div>
			</section>
			<section className="mt-9 ">
				<div className="flex justify-between mb-3 items-center">
					<h4 className="font-semibold">Overview</h4>
					<div className="text-primaryBgClr text-base">
						DETAILS
					</div>
				</div>
				<div>
					<BarChart ChartData={userData} />
				</div>
			</section>

			<section className="mt-9 ">
				<div className="flex justify-between mb-3">
					<h4 className="font-semibold">Order History</h4>
					<div className="text-primaryBgClr text-base">
						VIEW ALL
					</div>
				</div>
				<div className="grid grid-flow-row gap-3 grid-cols-3">
					{/* {data.map(({ product }, index: number) => {
						return (
							<CardLayout
								key={index}
								image={
									<>
										<Image
											src={
												deleteIcon
											}
											alt={""}
											className=""
										/>
										<Image
											src={edit}
											alt={""}
											className=""
										/>
									</>
								}
								quantity={product.requirement}
								name={product.name}
								randomNo={0}
								price={product.price}
								commission={product.commission}
							/>
						);
					})} */}
					<CardLayoutAdminDashboard data={data}/>
				</div>
			</section>

			<section className="mt-9 ">
				<div className="flex justify-between mb-3">
					<h4 className="font-semibold">
						Affiliate Requests
					</h4>
					<div className="text-primaryBgClr text-base">
						VIEW ALL
					</div>
				</div>
				<AffiliateRequest/>
			</section>
		</div>
	);
};

export default AdminDashboard;
