"use client";
import React, { useState, useEffect } from "react";
// import InputSpace from "./InputSpace"; // Assuming you have already created the Input component
import axios from "axios";
// import Popup from "../components/Popup";
import Image from "next/image";
import arrow from "@/../public/ArrowLeft.svg";
import googleIcon from "@/../public/flat-color-icons_google.svg";
import facebook from "@/../public/logos_facebook.svg";
import whatsapp from "@/../public/logos_whatsapp-icon.svg";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";

const Login = ({ params }: { params: { Choice: string } }) => {
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
				const response = await axios.post("/api/login", {
					loginData,
				});
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

	{
		/* {inputProps.map((props, index) => (
					<InputSpace key={index} {...props} />
				))} */
	}
	return (
		
			<div className=" m-auto flex justify-between items-start">
				<section className="flex flex-col justify-start gap-7">
					<Image
						src={arrow}
						className="focus:from-5%"
						alt={""}
					/>

					<h5 className="text-primaryBgClr">
						{params.Choice === "login"
							? "WELCOME BACK!"
							: "JOIN THE COMMUNITY"}
					</h5>
					<h1>
						{params.Choice === "login"
							? "LOGIN"
							: "SIGN UP"}
					</h1>
					<h3 className="font-extrabold"></h3>
					{params.Choice === "login" ? (
						<h4 className="text-gray-400 font-medium">
							Access your account <br />{" "}
							effortlessly and pick up <br /> right
							where you left off
						</h4>
					) : (
						<p className="text-gray-400 font-medium">
							Become a part of our <br /> vibrant
							community and <br /> unlock exclusive
							benefits.
						</p>
					)}
				</section>
				<section className="relative">
					<div className="flex px-3 mb-[3.75rem] justify-between">
						<Image src={googleIcon} alt={""} />
						<Image src={facebook} alt={""} />
						<Image src={whatsapp} alt={""} />
					</div>
					<hr className="mx-auto w-[70%] my-5" />

					<div className="px-3 absolute top-[20%] bg-white left-[43%]">
						OR
					</div>
					{params.Choice === "login" ? (
						<LoginAuth />
					) : (
						<SignUpAuth />
					)}
				</section>
			</div>
		
	);
};

export default Login;
