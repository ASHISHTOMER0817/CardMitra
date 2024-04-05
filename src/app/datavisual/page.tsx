"use client";
import React, { useState } from "react";
import Data from "@/app/components/Data";
import BarChart from "@/app/components/BarChart";
const Datavisual = () => {
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
		<div className="w-full">
			<BarChart ChartData={userData} />
		</div>
	);
};

export default Datavisual;
