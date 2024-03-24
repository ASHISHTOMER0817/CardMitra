'use client'
import React, { useState, useEffect } from "react";
import InputSpace from "@/app/components/InputSpace"; // Assuming you have already created the Input component
import axios from "axios";
import Popup from "../components/Popup";
import Image from "next/image";
import { FcBusinessman } from "react-icons/fc";
import { FcGoogle } from "react-icons/fc";
// import loginBgImage from "@/../public/pexels-johannes-plenio-1103970.jpg"


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState(Boolean);
	const [popupContent, setPopupContent] = useState("");

	const loginData = {
		email: email,
		password: password,
	};

	const submitData = async () => {
		try {
			if (password.length < 9) {
				setPopupContent(
					"Password should be atleast 8 Alphabets"
				);
				setSuccess(true);

				return;
				// return setPopupContent(
				// 	"Password should be atleast 8 Alphabets"
				// );
				// setSuccess(true)
			} else {
				const response = await axios.post(
					"/api/login",
					{loginData}
				);
				console.log(loginData);
				const success = await response.data.success;
				const message = await response.data.message;
				if (success) {
					setPopupContent(message);
					setSuccess(success);
				} else {
					setPopupContent(message);
					setSuccess(success);
				}
			}
		} catch (error) {
			throw new Error("Login failed"); // Throw an error if request fails
		}
	};

	// Array of objects for input props
	const inputProps = [
		{
			type: "email",
			placeholder: "Email",
			value: email,
			onChange: setEmail,
		},
		{
			type: "password",
			placeholder: "Password",
			value: password,
			onChange: setPassword,
		},
	];

	return (
		<div className="flex loginBgImage justify-center items-center bg-loginBgImage">
			<Popup Visible={success} popupContent={popupContent} />
			<div
				className=" bg-gray-100 w-1/5 m-auto text-center p-8 grid grid-cols-1 gap-5 grid-flow-row justify-center items-center"
				onSubmit={submitData}
			>
				<h1>WELCOME</h1>
				<FcBusinessman className="h-8 w-8 mx-auto" />
				{inputProps.map((props, index) => (
					<InputSpace key={index} {...props} />
				))}
				<div className="flex flex-col justify-between items-center ">
					<button className="text-xs mb-3 ml-auto mt-0 text-gray-600 hover:text-gray-800">
						Forgot Password?
					</button>
					<button
						className="bg-blue-500 text-white hover:bg-blue-400 py-2 px-4 rounded-md text-sm"
						type="submit"
					>
						Sign In
					</button>
					<button
						className="bg-blue-500 hover:bg-blue-400 text-white  py-2 px-4 flex items-center rounded-md text-sm mt-8"
						type="submit"
					>
                                    <FcGoogle className="h-9 w-9 mr-4"/>
						Sign In with Google
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
