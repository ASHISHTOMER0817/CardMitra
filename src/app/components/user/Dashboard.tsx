'use client'
import React, { useState } from "react";
import Data from "../Data";
import BarChart from "../BarChart";
const Dashboard = () => {
	const [userData, setUserData] = useState({
		labels: Data.map((data) => data.year),
		datasets: [
			{
				label: "User Gained",
				data: Data.map((data) => data.userGain),
			},
		],
	});
	return (
		<div className="mx-4 w-full">
			<h3 className="my-7">DashBoard</h3>
			<div className="flex justify-between">
				<div className="px-32 py-8 rounded-3xl  bg-[#F3F3F3] ">
					<h3 className="text-[#1844E1]">Rs.300</h3>  Today&apos;s
					profile
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
			<BarChart ChartData={userData} />
			<div className="flex justify-between my-6">
				<h4>Order History</h4>
				<h5 className="text-primaryBgClr">View All</h5>
			</div>
		</div>
	);
};

export default Dashboard;
