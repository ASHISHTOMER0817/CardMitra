"use client";
import Popup from "@/app/components/Popup";
import dateFormat from "@/app/components/dateFormat";
import Dropdown from "@/app/components/dropdown";
import Loader from "@/app/components/loader";
import { otp } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosRefresh } from "react-icons/io";
import { dropdown } from "../adminAddProduct/[_id]/page";

const OtpList = () => {
	const [date, setDate] = useState(new Date() || '');
	const [otpList, setOtpList] = useState<otp[]>();
	const [trackingId, setTrackingId] = useState("");
	const [pincode, setPincode] = useState("");
	// const [site, setSite] = useState<dropdown>()
	// console.log(dateFormat(new Date()));
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
				console.log(action)
				const jsonString = JSON.stringify(action)
				const response = await axios.get(
					`/api/admin/otpList?date=${date}&trackingId=${trackingId}&pincode=${pincode}&action=${jsonString}`
				);
				setOtpList(response.data.data);
				console.log(response.data.data);
				// console.log(dropdownStates);
			} catch {
				Popup("error", "Something went wrong, Please refresh");
			}
		}
		getData();
	}, [date, pincode, trackingId, action]);

	const sendDropdownStates = () => {
		setDropdownStates(dropdownStates);
	};

	const handleSearch = () => {
		// Update the trackingId state with the input value
		setTrackingId(trackingId);
	};

	const otpAction: dropdown[] = [
		{ value: "undelivered", label: "undelivered" },
		{ value: "delivered", label: "delivered" },
		{ value: "OTP issue", label: "OTP issue" },
		{ value: "cancelled", label: "cancelled" },
	];

	//function to set Site
	// const handleDropdownChangeSite = (option: dropdown) => {
	// 	setSite(option);
	// };
	// console.log(dropdownStates)

	return (
		<div className="w-[90%] mx-10 my-8">
			<h3 className="mb-16 font-semibold">Recent Deliveries</h3>
			<div className="flex items-center mb-3">
				<input
					className="outline-none border-b mr-3 border-b-black"
					type="text"
					value={trackingId}
					onChange={(e) => setTrackingId(e.target.value)}
					placeholder="Tracking ID"
				/>{" "}
				<button
					onClick={handleSearch}
					className="border-b mr-4 border-b-black px-3 hover:text-gray-700"
				>
					Search
				</button>
				<IoIosRefresh
					onClick={() => {
						setTrackingId("");
						setDate(new Date());
						setTrackingId("");
					}}
					className="cursor-pointer rounded-full hover:bg-gray-200"
				/>
				<input type="date" name="date" id="date" value={date.getFullYear()+'-'+String(date.getMonth()).padStart(2,'0')+'-'+date.getDate()} onChange={(e)=>setDate(new Date(e.target.value))} className="ml-auto outline-none border-b border-b-black" />
				
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
													) =>{
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
														setAction({_id:_id, label:option.label})
														console.log('this is option state change', option.label,_id)
														}
													}
													value={
														dropdownStates[
															index
														] ||
														otpAction[0]
													}
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
