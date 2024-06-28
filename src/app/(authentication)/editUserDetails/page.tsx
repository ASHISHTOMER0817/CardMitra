"use client";
// import InputSpace from "@/app/components/InputSpace";
import Popup from "@/app/components/Popup";
import { user } from "@/interface/productList";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
// import { InputProps } from "react-select";



interface InputProps {
	type: string;
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
	classList?: string;
	id?: string;  // Add this line
    }

const InputSpace: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	classList,
	id,
    }) => {
	return (
	  <input
	    id={id}
	    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${classList}`}
	    type={type}
	    placeholder={placeholder}
	    value={value}
	    onChange={(e) => onChange(e.target.value)}
	  />
	);
    };
    







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


	{/* <RxCross1
            className=" cursor-pointer ml-auto w-[30px] h-[30px] p-1 rounded-full hover:bg-green-100 "
            onClick={overlayFeature}
      /> */}

	return (
		<>
		{/* <form
			onSubmit={sendData}
			className={` bg-white  flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-4 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-[35%] sm:gap-2`}
		>
			
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
				placeholder="Contact"
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
					className="text-gray-500 hover:text-gray-700 border border-gray-500 cursor-pointer rounded-full py-4 px-3 w-2/4  sm:py-2"
				>
					Cancel
				</button>
				<button
					type="submit"
					className="text-white border cursor-pointer rounded-full py-4 px-3 w-2/4 hover:bg-green-600 bg-primaryBgClr sm:py-2"
				>
					Submit
				</button>
			</div>
		</form> */}



<form
  onSubmit={sendData}
  className="bg-white shadow-lg rounded-lg p-8 mx-auto my-10 max-w-md w-full space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Information</h2>
  <p className="text-sm text-gray-600 text-center mb-6">
    Update your information or provide new details below.
  </p>

  {[
    { label: "Your Name", value: name, setter: setName, type: "text" },
    { label: "Email ID", value: email, setter: setEmail, type: "email" },
    { label: "Contact", value: contact, setter: setContact, type: "tel" },
    { label: "Bank Account No.", value: accountNo, setter: setAccountNo, type: "text" },
    { label: "IFSC code", value: ifsc, setter: setIfsc, type: "text" },
    { label: "UPI ID", value: upi, setter: setUpi, type: "text" },
  ].map((field, index) => (
    <div key={index} className="space-y-1">
      <label htmlFor={field.label} className="text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <InputSpace
        id={field.label}
        type={field.type}
        value={field.value}
        onChange={(value: any) => field.setter(value)}
        placeholder={field.label}
        classList="w-full"
      />
    </div>
  ))}

  <div className="flex space-x-4 pt-4">
    <button
      type="button"
      onClick={() => router.push("/userProfile")}
      className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryBgClr hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit
    </button>
  </div>
</form>
		</>
	);
};

export default EditUserDetails;
