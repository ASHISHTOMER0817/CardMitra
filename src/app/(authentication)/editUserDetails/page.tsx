"use client";
import InputSpace from "@/app/components/InputSpace";
import Popup from "@/app/components/Popup";
import { user } from "@/interface/productList";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const EditUserDetails = () => {
	const [ifsc, setIfsc] = useState("");
	const [accountNo, setAccountNo] = useState("");
	const [upi, setUpi] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [contact, setContact] = useState("");
	const router = useRouter();
	// const [data, setData] = useState<{
	// 	user: user;
	// 	verifiedAmt: string;
	// 	totalUnVerifiedAmt: string;
	// 	// orderList:order[]
	// }>();
	const bankDetails = { name, email, contact, ifsc, accountNo, upi };

	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect starts");
				const response = await axios.get(
					`/api/users/details?query=basicInfo`
				);
				console.log(response.data.message);
				if (!response.data.success) {
					return Popup(
						"error",
						"something went wrong, please refresh"
					);
				}
				// setData(response.data.data);
				const user = response.data.data;
				console.log(user);
				setName(user.name);
				setEmail(user.email);
				setContact(user.contact);
				setIfsc(user.ifsc);
				setAccountNo(user.accountNo);
				setUpi(user.upi);
			} catch {
				Popup("error", "something went wrong, please refresh");
			}
		}
		getData();
	}, []);

	async function sendData(event: FormEvent) {
		event.preventDefault();
		try {
			const response = await axios.post("/api/users/bankDetails", {
				bankDetails,
			});
			if (!response.data.success) {
				return Popup("error", response.data.message);
			} else {
				Popup("success", response.data.message);
				router.push("/userProfile");
			}
		} catch {
			return Popup("error", "server error, please refresh");
		}
	}

	return (
		<form
			onSubmit={sendData}
			className={` bg-white  flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[35%] sm:gap-2`}
		>
			{/* <RxCross1
            className=" cursor-pointer ml-auto w-[30px] h-[30px] p-1 rounded-full hover:bg-green-100 "
            onClick={overlayFeature}
      /> */}
			<h4 className="sm:text-nowrap mx-auto">Your Information</h4>
			<div className="text-xs text-gray-500 text-wrap">
				If you want to update some of the information or provide
				some new info. about you, please fill be the below form{" "}
			</div>
			<InputSpace
				value={name}
				type={"text"}
				onChange={(value) => setName(value)}
				placeholder="Your Name"
			/>
			<InputSpace
				value={email}
				type={"text"}
				onChange={(value) => setEmail(value)}
				placeholder=" Email ID"
			/>
			<InputSpace
				value={contact}
				type={"text"}
				onChange={(value) => setContact(value)}
				placeholder="Contact No."
			/>
			<InputSpace
				value={accountNo}
				type={"text"}
				onChange={(value) => setAccountNo(value)}
				placeholder="Bank Account No."
			/>
			<InputSpace
				value={ifsc}
				type={"text"}
				onChange={(value) => setIfsc(value)}
				placeholder="IFSC code"
			/>
			<InputSpace
				value={upi}
				type={"text"}
				onChange={(value) => setUpi(value)}
				placeholder="UPI ID"
			/>

			<div>
				<button
					type="submit"
					onClick={() => router.push("/userProfile")}
					className="text-gray-500 hover:text-gray-700 border cursor-pointer rounded-full py-4 px-3 w-2/4  sm:py-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					// disabled={loader}
					className="text-white border cursor-pointer rounded-full py-4 px-3 w-2/4 hover:bg-green-600 bg-primaryBgClr sm:py-2"
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default EditUserDetails;
