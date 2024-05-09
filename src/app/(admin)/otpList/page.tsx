'use client'
import Popup from "@/app/components/Popup";
import dateFormat from "@/app/components/dateFormat";
import Loader from "@/app/components/loader";
import {otp } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";


const OtpList = () => {
	const [date, setDate] = useState<Date>(new Date());
	const [otpList, setOtpList] = useState<otp[]>();
	const [trackingId, setTrackingId] = useState("");
	console.log(dateFormat(new Date()));

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					`/api/admin/otpList?date=${date}`
				);
				setOtpList(response.data.data);
				console.log(response.data.data);
			} catch {
				Popup("error", "Something went wrong, Please refresh");
			}
		}
		getData();
	}, [date]);

	async function getData() {
		try {
			const response = await axios.get(
				`/api/admin/otpList?trackingId=${trackingId}`
			);
			setOtpList(response.data.data);
		} catch {
			Popup("error", "Something went wrong, please refresh");
		}
	}

	return (
		<div className="w-[90%] mx-10 my-8">
			<h3 className="mb-16 font-semibold">Today&apos;s OTPs</h3>
			<div className="flex items-center mb-3">
				<input
					className="outline-none border-b mr-3 border-b-black"
					type="text"
					value={trackingId}
					onChange={(e) => setTrackingId(e.target.value)}
					placeholder="Tracking ID"
				/>{" "}
				<button
					onClick={getData}
					className="border-b mr-4 border-b-black px-3 hover:text-gray-700"
				>
					Search
				</button> 
				<IoIosRefresh onClick={()=>setDate(new Date())} className="cursor-pointer"/>
				<input
					type="Date"
					value={date.toString()}
					onChange={(e) =>
						setDate(new Date(e.target.value))
					}
					className="ml-auto outline-none border-b border-b-black"
				/>
			</div>

			{!otpList? <Loader/> :otpList.length >0 ?<table className="w-full rounded-2xl overflow-hidden">
				<thead>
					<tr className="bg-gray-200">
						<th className="py-6 px-12 text-left">
							Tracking ID
						</th>
						<th className="py-6 px-12 text-left">
							OTP
						</th>
						<th className="py-6 px-12 text-left">
							User&apos;s Name
						</th>

						<th className="py-6 px-12 text-left">
							Contact
						</th>
					</tr>
				</thead>
				<tbody>
					{otpList ? otpList.map(
						(
							{
								// deliveryDate,
								contact,
								otp,
								trackingId,
								userObjectId,
							},
							index
						) => {
							return (
								<tr
									key={index}
									className="even:bg-gray-100"
								>
									<td className="py-4 px-12">
										{trackingId}
									</td>
									<td className="py-4 px-12">
										{otp}
									</td>
									<td className="py-4 px-12">
										{userObjectId.name}
									</td>
									<td className="py-4 px-12">
										{contact}
									</td>
								</tr>
							);
						}
					) :<div>Loading...</div>}
				</tbody>
			</table>: <div className="mx-auto w-fit mt-32 text-red-500">No data to show !!</div>}
		</div>
	);
};

export default OtpList;
