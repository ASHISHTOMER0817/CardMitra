"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import axios from "axios";
import OrderHistory from "@/app/components/OrderHistory";
import { order } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import dateFormat from "@/app/components/dateFormat";
import Link from "next/link";

const Dashboard = () => {
	const [data, setData] = useState<order[]>();
	const [profit, setProfit] = useState(0);
	const [commission, setCommission] = useState(0);
	const [ordersTillDate, setOrdersTillDate] = useState(0);
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
				width:'300px'
			},
		],
	});
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/dashboard"
				);
				console.log(response.data.data);

				setData(response.data.data);

				loops(response.data.data);
				console.log(response.data.message);
			} catch {
				Popup("error", "Something went wrong, please refresh");
				console.log("Please try again later");
			}
		}
		getData();
	}, []);

	function loops(todaysOrders: order[]) {
		let total = 0;
		let commission = 0;
		for (let i = 0; i < todaysOrders.length; i++) {
			if (todaysOrders[i].orderedAt === dateFormat(new Date())) {
				total += todaysOrders[i].product.price;
			}
		}
		for (let i = 0; i < todaysOrders.length; i++) {
			commission += todaysOrders[i].product.price;
		}
		setCommission(commission);
		setProfit(total);
		setOrdersTillDate(todaysOrders.length);
		console.log(total);
	}

	return (
		<div className=" w-[85%] mx-auto mb-16">
			<h3 className="my-7 font-semibold">Dashboard</h3>
			<div className="flex justify-start gap-3">
				<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3] ">
					<h5 className="text-[#1844E1]">{profit} </h5>{" "}
					Today&apos;s Profit
				</div>
				<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3] ">
					<h5 className="text-primaryBgClr">
						{ordersTillDate}
					</h5>
					Orders placed <br />
					till date
				</div>
				<div className="px-20 py-8 rounded-3xl  bg-[#F3F3F3]">
					<h5 className="text-primaryBgClr">
						Rs. {commission}
					</h5>
					Commission earned
				</div>
			</div>
			<div className="flex justify-between items-center my-6">
				<h4 className="font-semibold">Overview</h4>
				<div className="text-primaryBgClr text-base">
					DETAILS
				</div>
			</div>
			<div className="hello">
				<BarChart ChartData={userData} options={{ maintainAspectRatio: false }} />
			</div>
			<div className="flex justify-between my-6">
				<h4 className="font-semibold">Order History</h4>

				<Link
					className="text-primaryBgClr text-base"
					href={"/odrHistory"}
				>
					VIEW ALL
				</Link>
			</div>

			{data === undefined ? (
				<div className="mt-20 mb-20 mx-auto w-fit">
					Loading...
				</div>
			) : data.length < 1 ? (
				<div className="mt-10 mx-auto w-fit">
					You have not placed any product yet...
				</div>
			) : (
				<div className="grid grid-flow-row gap-3 grid-cols-3">
					<OrderHistory data={data.slice(0, 3)} />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
