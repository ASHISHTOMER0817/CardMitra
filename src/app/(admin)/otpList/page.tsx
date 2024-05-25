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
import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { GroupBase, StylesConfig } from "react-select";
const OtpList = () => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

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

	const otpAction: dropdown[] = [
		{ value: "undelivered", label: "undelivered" },
		{ value: "delivered", label: "delivered" },
		{ value: "wrong OTP", label: "wrong OTP" },
		{ value: "cancelled", label: "cancelled" },
	];

	const handleDateRangeSelect = (start: Date | null, end: Date | null) => {
		setStartDate(start);
		setEndDate(end);
	};

	function selectOption(successful: string) {
		for (let i = 0; i < otpAction.length; i++) {
			if (otpAction[i].value === successful) {
				return otpAction[i];
			}
		}
	}

	const customStyles: StylesConfig<
		dropdown,
		boolean,
		GroupBase<dropdown>
	> = {
		control: (provided) => ({
			...provided,
			padding: "2px", // Adjust padding as needed
		}),
		menu: (provided) => ({
			...provided,
			padding: "2px", // Adjust padding as needed
		}),
		option: (provided) => ({
			...provided,
			padding: "2px", // Adjust padding as needed
		}),
	};

	return (
		<div className="w-[90%] mx-10 my-8 sm:ml-0 sm:w-full">
			<h3 className="mb-16 font-semibold">Recent Deliveries</h3>
			<div className="flex items-center mb-3">
				<input
					className="outline-none border-b mr-3 border-b-black sm:text-xs"
					type="text"
					value={trackingOrzip}
					onChange={(e) => setTrackingOrzip(e.target.value)}
					placeholder="Tracking ID / Zip Code"
				/>{" "}
				{/* <IoIosRefresh
					onClick={() => location.reload()}
					className="cursor-pointer rounded-full hover:bg-gray-200 "
				/> */}
				<div className="ml-auto flex justify-end gap-3 items-center sm:text-[12px]">
					<MyDatePicker
						onDateRangeSelect={handleDateRangeSelect}
						// setCurrentDate={setCurrentDate}
					/>
				</div>
			</div>

			{!otpList ? (
				<Loader />
			) : otpList.length > 0 ? (
				<table className="w-full rounded-2xl transition-all sm:text-wrap overflow-visible ">
					<thead>
						<tr className="bg-green-100 text-[#2f4f4f] sm:text-[8px]">
							<th className="py-6 px-12 text-left sm:pr-0.5 sm:pl-2 sm:py-1">
								Zipcode
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Tracking ID
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								OTP
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								User
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Contact
							</th>
							<th className="py-6 px-12 text-left sm:px-0.5 sm:py-1">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{otpList ? (
							otpList.map(
								(
									{
										zipCode,
										contact,
										otp,
										trackingId,
										userObjectId,
										_id,
										delivered,
									},
									index
								) => {
									const show =
										trackingId.includes(
											trackingOrzip
										) ||
										String(
											zipCode
										).includes(
											trackingOrzip
										) ||
										!trackingOrzip;
									console.log(
										"show is: ",
										show
									);

									return (
										show && (
											<tr
												key={
													index
												}
												className="even:bg-gray-100 sm:text-[8px]"
											>
												<td className="py-4 px-12 sm:px-0.5 sm:py-1">
													{
														zipCode
													}
												</td>
												<td className="py-4 px-12 sm:text-[8px] sm:px-0.5 sm:py-1">
													{
														trackingId
													}
												</td>
												<td className="py-4 px-12 text-primaryBgClr sm:px-0.5 sm:py-1">
													{
														otp
													}
												</td>
												<td className="py-4 px-12 font-semibold sm:px-0.5 sm:py-1">
													{
														userObjectId.name
													}
												</td>
												<td className="py-4 px-12 text-gray-500 sm:px-0.5 sm:py-1">
													{
														contact
													}
												</td>
												<td className="py-4 px-12 sm:px-0.5 sm:py-1">
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
														value={
															selectOption(
																delivered
															)!
														}
														// customStyles={
														// 	customStyles
														// }
													/>
												</td>
											</tr>
										)
									);
								}
							)
						) : (
							<div>Loading...</div>
						)}
					</tbody>
				</table>
			) : (
				<div className="mx-auto w-fit mt-32 text-red-500 font-serif sm:text-[10px]">
					No data to show !!
				</div>
			)}
		</div>
	);
};

export default OtpList;
