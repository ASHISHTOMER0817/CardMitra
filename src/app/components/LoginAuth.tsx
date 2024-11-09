"use client";
import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import Popup from "./Popup";
import Loader from "./loader";
import Link from "next/link";

const LoginAuth = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [remember, setRemember] = useState(true);

	const user = { email, password, remember };
	// console.log(user)
	// function checkSuccess(success: boolean, message: string, data: string) {
	// 	if (success === false) {
	// 		Popup("error", message);
	// 		setLoader(false);
	// 	} else {
	// 		if (data === "user") {
	// 			router.push("/deals");
	// 			console.log("why is it not forwarding");
	// 		} else if (data === "admin") {
	// 			router.push("/adminDashboard");
	// 		}
	// 	}
	// }

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setLoader(true);
			if (!email || !password) {
				setLoader(false);
				Popup("error", "Fill the form!!");
				return;
			}
			console.log('----',email,'---- ', password)
			const response = await axios.post("/api/users/login", {
				user,
			});
			const { success, message, data } = response.data;
			// const success = response
			console.log(success, message, data);
			// checkSuccess(success, message, data);

			if(!success){Popup("error", message);setLoader(false)}
			else if (data === "user") router.push("/deals");
			else if (data === "admin") router.push("/adminDashboard");
			else if (data === "collaborator") router.push("/collabDashboard");
			
		} catch (error: any) {
			setLoader(false);
			Popup("error", "Server error, please refresh");
		}
	}

	// function ForgetPassword() {}

	return (
		<>
			{loader && <Loader />}
			<form
				className="flex flex-col gap-y-6 mt-4 sm:gap-y-4"
				onSubmit={sendData}
			>
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
				<div className="flex text-sm text-gray-500">
					<input
						type="checkbox"
						onChange={() => setRemember(!remember)}
						checked={remember}
						id="rememberMe"
					/>{" "}
					<label
						htmlFor="rememberMe"
						className="cursor-pointer"
					>
						Remember Me
					</label>
					<Link
						href={"/forgotPassword"}
						className="float-right ml-auto hover:border-primaryBgClr  hover:text-primaryBgClr cursor-pointer"
					>
						Forgot Password{" "}
					</Link>
				</div>

				<button
					disabled={loader}
					className="text-white border px-3 py-4 rounded-full hover:bg-green-600 bg-primaryBgClr cursor-pointer sm:py-2"
					type="submit"
				>
					Login
				</button>
				<Link
					href={"/Auth/signup"}
					className="float-right mx-auto text-sm text-gray-400 cursor-pointer"
				>
					I don&apos;t have an account?{" "}
					<div className="float-right text-primaryBgClr font-bold">
						Signup
					</div>{" "}
				</Link>
			</form>
		</>
	);
};

export default LoginAuth;
