"use client";
import Popup from "@/app/components/Popup";
import Dropdown from "@/app/components/dropdown";
import Loader from "@/app/components/loader";
import { otp } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";
import { dropdown } from "../adminAddProduct/[_id]/page";
import MyDatePicker from "@/app/components/MyDatePicker";
import "flatpickr/dist/flatpickr.min.css";

const OtpList = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState("");
	const [otpList, setOtpList] = useState<otp[]>();
	const [trackingOrzip, setTrackingOrzip] = useState("");
	const [dropdownStates, setDropdownStates] = useState(
		otpList ? otpList.map(() => null) : []
	);
	const [action, setAction] = useState({
		_id: "",
		label: "",
	});

	useEffect(() => {
		async function getData() {
			try {
				const dates = { startDate, endDate };
				console.log("these are dates", dates);
				console.log("its running boys");
				const dateString = JSON.stringify(dates);
				console.log(dateString);
				console.log(action);
				const jsonString = JSON.stringify(action);
				const response = await axios.get(
					`/api/admin/otpList?date=${dateString}&action=${jsonString}`
				);
				setOtpList(response.data.data);
				console.log(response.data.data);
				// console.log(dropdownStates);
			} catch {
				Popup("error", "Something went wrong, Please refresh");
			}
		}
		getData();
	}, [action, startDate, endDate]);


	async function getData() {
		try {
			console.log(trackingOrzip);
			const response = await axios.get(
				`/api/admin/otpList?trackingId=${trackingOrzip}`
			);
			setOtpList(response.data.data);
			console.log(response.data.data);
		} catch {
			Popup("error", "Something went wrong, Please refresh");
		}
	}

	const otpAction: dropdown[] = [
		{ value: "undelivered", label: "undelivered" },
		{ value: "delivered", label: "delivered" },
		{ value: "wrong OTP", label: "wrong OTP" },
		{ value: "cancelled", label: "cancelled" },
	];

	const handleDateRangeSelect = (startDate: Date, endDate: Date) => {
		console.log("Selected Start Date:", startDate);
		setStartDate(startDate);
		console.log("Selected End Date:", endDate);
		setEndDate(endDate.toDateString());
	};

	function selectOption(successful: string) {
		for (let i = 0; i < otpAction.length; i++) {
			if (otpAction[i].value === successful) {
				return otpAction[i];
			}
		}
	}
	return (
		<div className="w-[90%] mx-10 my-8">
			<h3 className="mb-16 font-semibold">Recent Deliveries</h3>
			<div className="flex items-center mb-3">
				<input
					className="outline-none border-b mr-3 border-b-black"
					type="text"
					value={trackingOrzip}
					onChange={(e) => setTrackingOrzip(e.target.value)}
					placeholder="Tracking ID / Zip Code"
				/>{" "}
				<button
					onClick={getData}
					className="border-b mr-4 border-b-black px-3 hover:text-gray-700"
				>
					Search
				</button>
				<IoIosRefresh
					onClick={() => {
						setStartDate(new Date());
						setTrackingOrzip("");
					}}
					className="cursor-pointer rounded-full hover:bg-gray-200"
				/>
				<div className="ml-auto flex justify-end gap-3 items-center">
					<MyDatePicker
						onDateRangeSelect={handleDateRangeSelect}
					/>
				</div>
			</div>

			{!otpList ? (
				<Loader />
			) : otpList.length > 0 ? (
				<table className="w-full rounded-2xl overflow-hidden">
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
							<th className="py-6 px-12 text-left">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{otpList ? (
							otpList.map(
								(
									{
										// deliveryDate,
										contact,
										otp,
										trackingId,
										userObjectId,
										_id,
										delivered,
									},
									index
								) => {
									return (
										<tr
											key={index}
											className="even:bg-gray-100"
										>
											<td className="py-4 px-12">
												{
													trackingId
												}
											</td>
											<td className="py-4 px-12">
												{otp}
											</td>
											<td className="py-4 px-12">
												{
													userObjectId.name
												}
											</td>
											<td className="py-4 px-12">
												{
													contact
												}
											</td>
											<td className="py-4 px-12">
												<Dropdown
													options={
														otpAction
													}
													onChange={(
														option: any
													) => {
														setDropdownStates(
															(
																prevStates
															) => {
																const newStates =
																	[
																		...prevStates,
																	];
																newStates[
																	index
																] =
																	{
							 											...option,
																		_id,
																	};

																return newStates;
															}
														);
														setAction(
															{
																_id: _id,
																label: option.label,
															}
														);
														console.log(
															"this is option state change",
															option.label,
															_id
														);
													}}
													value={selectOption(delivered)!}
												/>
											</td>
										</tr>
									);
								}
							)
						) : (
							<div>Loading...</div>
						)}
					</tbody>
				</table>
			) : (
				<div className="mx-auto w-fit mt-32 text-red-500 font-serif">
					No data to show !!
				</div>
			)}
		</div>
	);
};

export default OtpList;
