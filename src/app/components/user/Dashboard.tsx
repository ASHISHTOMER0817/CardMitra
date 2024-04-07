"use client";
import React, { useEffect, useState } from "react";
// import Data from "../Data";
import BarChart from "../BarChart";
import axios from "axios";
import CardLayout from "../CardLayout";
import productList from "@/interface/productList"

const Dashboard = () => {
	const [data, setData] = useState<productList[]>([]);
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
				const response = await axios.get("/api/dashboard");
				setData(response.data);
			} catch {
				console.log("Please try again later");
			}
		}
		getData()
	}, []);
	return (
		<div className="mx-6 w-full">
			<h3 className="my-7">DashBoard</h3>
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
					<h3 className="text-primaryBgClr">Rs. 6,800</h3>
					Commission earned
				</div>
			</div>
			<div className="flex justify-between items-center my-6">
				<h4>Overview</h4>
				<h6 className="text-primaryBgClr">DETAILS</h6>
			</div>
			<div>
			<BarChart ChartData={userData} />
			</div>
			<div className="flex justify-between my-6">
				<h4>Order History</h4>
				<h5 className="text-primaryBgClr">View All</h5>
			</div>
			<div className="grid grid-flow-row gap-3 grid-cols-3">
				{Array.isArray(data) && data.length > 0 ?
					data.map(
						(
							{
								quantity,
								name,
								price,
								commission,
							}: {
								quantity: number;
								name: string;
								price: number;
								commission: number;
							},
							index: number
						) => {
							return (
								<div key={index}>
									<CardLayout
										quantity={quantity}
										name={name}
										randomNo={65456141161}
										price={price}
										commission={
											commission
										}
									/>
								</div>
							);
						}
					): <div className="mt-10 ml-20">You have never placed any order</div>}
			</div>
		</div>
	);
};

export default Dashboard;
