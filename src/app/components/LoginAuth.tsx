"use client";
import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import Popup from "./Popup";

const LoginAuth = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [otp, setOtp] = useState("");
	const [verifyotp, setVerifyOtp] = useState(false);

	const user = { email, password };

	function checkSuccess(success: boolean, message: string) {
		if (!success) {
			Popup("error",message)
			console.log(error);
			return;
		} else {
			router.push("/dashboard");
		}
	}


	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const { success, message } = await (await axios.post(
				"/api/users/login",
				{ user }
			)).data
			checkSuccess(success, message);
		} catch (error: any) {
			Popup("error", "Server error, please refresh")
		}
	}

	function PswrdNd() {}

	return (
		<form className="flex flex-col gap-y-6 mt-4" onSubmit={sendData}>
			<>
				<InputSpace
					type="email"
					value={email}
					placeholder="Email"
					onChange={(value) => setEmail(value)}
				/>
				<InputSpace
					type="password"
					value={password}
					placeholder="Password"
					onChange={(value) => setPassword(value)}
				/>
			</>

			{/* <div className="text-sm">
				<div className="float-right text-primaryBgClr cursor-pointer">
					Forgot Password{" "}
				</div>
			</div> */}

			<button className='text-white border px-3 py-4 rounded-full bg-primaryBgClr w-96 cursor-pointer' type="submit">
				Login
			</button>
		</form>
	);
};

export default LoginAuth;
