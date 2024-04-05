import React from "react";
import Datavisual from "@/app/datavisual/page";
const Dashboard = () => {
	return (
		<div>
			<h3 className="my-7">DashBoard</h3>
			<div>
				<div className="px-10 py-8">
					Rs.300 <br /> Today&apos;s profile
				</div>
				<div className="px-10 py-8">
					64 <br />
					Orders placed <br />
					till date
				</div>
				<div className="px-10 py-8">
					Rs. 6,800 <br />
					Commission earned
				</div>
			</div>
			<div className="flex justify-between my-6">
				<h4>Overview</h4>
				<h5 className="text-primaryBgClr">DETAILS</h5>
			</div>
			<Datavisual/>
			<div className="flex justify-between my-6">
				<h4>Order History</h4>
				<h5 className="text-primaryBgClr">View All</h5>
			</div>
			
		</div>
	);
};

export default Dashboard;
