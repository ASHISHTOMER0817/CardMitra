"use client";
import React, { useEffect, useState } from "react";
import BarChart from "@/app/components/BarChart";
import axios from "axios";
import OrderHistory from "@/app/components/OrderHistory";
import { order, otp } from "@/interface/productList";
import Popup from "@/app/components/Popup";
// import dateFormat from "@/app/components/dateFormat";
import Link from "next/link";
import Loader from "@/app/components/loader";
import DashboardOverlay from "@/app/components/user/DashboardOverlay";

const Dashboard = () => {
	const [data, setData] = useState<order[]>();
	const [profit, setProfit] = useState(0);
	const [commission, setCommission] = useState(0);
	const [ordersTillDate, setOrdersTillDate] = useState(0);
	const [chartArr, setChartArr] = useState<number[]>([]);
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
				label: "Order Placed",
				data: [...chartArr],
				fill: false,
				borderColor: "rgb(57, 172, 115)",
				// borderColor: "rgb(75, 192, 192)",

				tension: 0.1,
				width: "300px",
			},
		],
	});
	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/users/dashboard"
				);
				setData(response.data.data);
				loops(response.data.data);
			} catch {
				Popup("error", "Something went wrong, please refresh");
				console.log("Please try again later");
			}
		}
		getData();
	}, []);

	useEffect(() => {
		setUserData((prevData) => ({
			...prevData,
			datasets: [
				{
					...prevData.datasets[0],
					data: [...chartArr],
				},
			],
		}));
	}, [chartArr]);

	function loops(orders: order[]) {
		let total = 0;
		let commission = 0;
		let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let i = 0; i < orders.length; i++) {
			const orderDate = new Date(orders[i].orderedAt);
			const today = new Date();

			if (
				`${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getFullYear()}` ===
				`${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
			) {
				total += (orders[i].product.price + orders[i].product.commission);
				console.log(orderDate, "and new date", today);
			}
			if (
				orders[i].delivered === "delivered" ||
				orders[i].delivered === "unverified"
			) {
				commission += orders[i].product.commission;
			}
			const month = orderDate.getMonth();
			console.log(month, "this is month of the products ");
			orderDate.getFullYear() === new Date().getFullYear()
				? (arr[month] += 1)
				: "";
		}
		setChartArr(arr);
		// console.log(chartArr, "thisis chart value");
		setCommission(commission);
		setProfit(total);
		setOrdersTillDate(orders.length);
		// console.log(total);
	}

	return (
		<>
			<div className="mx-auto mb-16 sm:w-[100%]">
				{/* <div
					className={`fixed top-2 right-2 text-sm bg-[#D0D6E0] rounded-[8px] p-2 flex flex-col gap-4 bg-transparent`}
				>
					{!data
						? ""
						: data.length > 0
						? data.map(
								({
									product,
									delivered,
									_id,
								}) => {
									let show;
									if (
										delivered ===
											"cancelled" ||
										delivered ===
											"wrong OTP"
									) {
										show = true;
									}
									return (
										<>
											{show && (
												<DashboardOverlay
													product={
														product
													}
													orderObjectId={
														_id
													}
													delivered={
														delivered
													} // data={{
												/>
											)}
										</>
									);
								}
						  )
						: ""}
				</div> */}

				{/* <div className="fixed top-4 right-4 flex flex-col space-y-3 z-50">
					{data &&
						data.length > 0 &&
						data.map(
							({
								product,
								delivered,
								_id,
								acknowledgment,
							}) => {
								if (
									(delivered ===
										"cancelled" ||
										delivered ===
											"wrong OTP") &&
									acknowledgment === false
								) {
									return (
										<DashboardOverlay
											key={_id}
											product={
												product
											}
											orderObjectId={
												_id
											}
											delivered={
												delivered
											}
										/>
									);
								}
								return null;
							}
						)}
				</div> */}
				<h3 className="mt-0 mb-4 font-semibold sm:my-2">
					Dashboard
				</h3>
				<div className="flex justify-start gap-3 sm:justify-between">
					<div className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3 sm:px-[6px]">
						<h5 className="text-[#1844E1] sm:text-[12px] font-bold sm:leading-none text-center sm:mb-2">
							{profit}{" "}
						</h5>{" "}
						<div className="sm:text-[10px] leading-none text-center">
							Today&apos;s Order value
						</div>
					</div>
					<div className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3  sm:px-[6px] ">
						<h5 className="text-primaryBgClr sm:text-[12px] font-bold sm:leading-none text-center sm:mb-2">
							{ordersTillDate}
						</h5>
						<div className="sm:text-[10px] leading-none text-center">
							Orders placed till date
						</div>
					</div>
					<div className="px-12 py-4 rounded-big bg-[#F3F3F3] md:min-w-[26%] sm:flex sm:flex-col sm:justify-between sm:items-center sm:py-3  sm:px-[6px]">
						<h5 className="text-primaryBgClr sm:text-[12px] font-bold sm:leading-none text-center sm:mb-2">
							Rs. {commission}
						</h5>
						<div className="sm:text-[10px] leading-none text-center">
							Commission earned
						</div>
					</div>
				</div>
				<div className="flex justify-between items-center my-6">
					<h4 className="font-semibold sm:text-sm">
						Overview
					</h4>
					<h5 className="text-primaryBgClr text-base sm:text-xs">
						DETAILS
					</h5>
				</div>
				<div className="hello">
					<BarChart
						ChartData={userData}
						// options={{
						// 	maintainAspectRatio: false,
						// }}
					/>
				</div>
				<div className="flex justify-between my-6 items-center">
					<h4 className="font-semibold sm:text-sm">
						Order History
					</h4>

					<Link
						className="text-primaryBgClr text-base sm:text-xs"
						href={"/odrHistory"}
					>
						VIEW ALL
					</Link>
				</div>

				{!data ? (
					<Loader />
				) : data.length < 1 ? (
					<div className="mt-10 mx-auto w-fit font-serif text-red-500 sm:text-[10px]">
						You have not placed any product yet...
					</div>
				) : (
					<div className="flex flex-wrap gap-3 order-history-wrapper">
						{data
							.slice(0, 3)
							.map(
								(
									{
										product,
										otp,
										_id,
										delivered,
										paid,
									},
									index
								) => {
									return (
										<OrderHistory
											product={
												product
											}
											_id={_id}
											otp={otp}
											delivered={
												delivered
											}
											key={index}
											paid={paid}
										/>
									);
								}
							)}
					</div>
				)}
			</div>
		</>
	);
};

export default Dashboard;
