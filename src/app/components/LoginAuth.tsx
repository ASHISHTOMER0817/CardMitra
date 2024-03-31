"use client";
import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";

const LoginAuth = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [rememberMe, setRememberMe] = useState(false);
	const [method, setMethod] = useState(true);
	const [number, setNumber] = useState("");
	const [otp, setOtp] = useState("");
	const [verifyotp, setVerifyOtp] = useState(false);

	const user = { email, password };

	function checkSuccess(success: boolean, message: string) {
		if (!success) {
			setError(message);
			console.log(error);
			return;
		} else {
			router.push("/dasboard/home");
		}
	}

	interface ApiResponse {
		success: boolean;
		message: string;
	}

	async function makeApiCall<T>(
		url: string,
		data?: any
	): Promise<ApiResponse> {
		try {
			const response: AxiosResponse<ApiResponse> = await axios.post(
				url,
				data
			);
			return response.data;
		} catch (error) {
			console.error("Error making API call:", error);
			throw new Error(
				"Something went wrong. Please try again later."
			);
		}
	}

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const { success, message } = await makeApiCall(
				"/api/users/signup",
				{ user }
			);
			checkSuccess(success, message);
		} catch (error: any) {
			setError(error.message);
		}
	}

	async function sendOTP() {
		try {
			const { success, message } = await makeApiCall(
				"/api/users/authWithNumber",
				{ number }
			);
			if (success) {
				setVerifyOtp(true);
				return;
			} else {
				setError(message);
			}
		} catch (error: any) {
			setError(error.message);
		}
	}
	const buttonCSS =
		"text-white border px-3 py-4 rounded-3xl bg-primaryBgClr w-96";
	const divTagCSS =
		"text-white border px-3 text-center -mt-[19px] rounded-3xl bg-green-300 py-4 w-96";
	return (
		<form
			
			className="flex flex-col gap-y-10 mt-4"
			onSubmit={sendData}
		>
			{method ? (
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
			) : (
				<>
					<InputSpace
						type="text"
						value={number}
						placeholder="Phone Number"
						onChange={(value) => setNumber(value)}
					/>
					<InputSpace
						type="number"
						value={otp}
						placeholder="OTP"
						onChange={(value) => setOtp(value)}
					/>
				</>
			)}
			{/* <InputSpace
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
			/> */}
			<div className="text-sm">
				<input
					type="checkbox"
					id="checkbox"
					checked={rememberMe}
					onChange={(e) => setRememberMe(e.target.checked)}
				/>
				<label className="ml-2" htmlFor="checkbox">
					Remember Me
				</label>

				<div className="float-right text-primaryBgClr">
					{method ? "Forgot Password" : "Resend OTP"}
				</div>
			</div>
			<button type="submit" className="">
				{!method && verifyotp ? (
					<button className={buttonCSS}>Verify OTP</button>
				) : !method ? (
					<button onClick={sendOTP} className={buttonCSS}>
						Send OTP
					</button>
				) : (
					<button className={buttonCSS} type="submit">
						Login
					</button>
				)}
			</button>
			<div className="">
				{method ? (
					<div
						onClick={() => setMethod(false)}
						className={divTagCSS}
					>
						Login with a code
					</div>
				) : (
					<div
						onClick={() => setMethod(true)}
						className={divTagCSS}
					>
						Login with Password
					</div>
				)}
			</div>
		</form>
	);
};

export default LoginAuth;
