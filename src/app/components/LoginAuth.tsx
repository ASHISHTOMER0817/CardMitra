"use client";
import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import Popup from "./Popup";
import Loader from "./loader";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.svg";

const LoginAuth = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);
	const [remember, setRemember] = useState(true);

	const user = { email, password, remember };

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setLoader(true);
			if (!email || !password) {
				setLoader(false);
				Popup("error", "Fill the form!!");
				return;
			}
			const response = await axios.post("/api/users/login", {
				user,
			});
			const { success, message, data } = response.data;

			if(!success){Popup("error", message);setLoader(false)}
			else if (data === "user") router.push("/deals");
			else if (data === "admin") router.push("/adminDashboard");
			else if (data === "collaborator") router.push("/collabDashboard");
			
		} catch (error: any) {
			setLoader(false);
			Popup("error", "Server error, please refresh");
		}
	}

	return (
		<div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
			{loader && <Loader />}
			<div className="text-center mb-6 sm:mb-8">
				<Link href="/" className="inline-block mb-4">
					<Image src={logo} alt="CardMitra Logo" width={48} height={48} className="sm:w-[60px] sm:h-[60px]" />
				</Link>
				<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
				<p className="text-sm sm:text-base text-gray-600">Sign in to continue to your account</p>
			</div>

			<form onSubmit={sendData} className="space-y-4 sm:space-y-6">
				<div className="space-y-3 sm:space-y-4">
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
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<input
							type="checkbox"
							onChange={() => setRemember(!remember)}
							checked={remember}
							id="rememberMe"
							className="h-4 w-4 text-primaryBgClr border-gray-300 rounded focus:ring-primaryBgClr"
						/>
						<label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
							Remember me
						</label>
					</div>
					<Link
						href="/forgotPassword"
						className="text-sm font-medium text-primaryBgClr hover:text-green-600"
					>
						Forgot password?
					</Link>
				</div>

				<button
					disabled={loader}
					className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primaryBgClr hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBgClr transition-colors duration-300"
					type="submit"
				>
					{loader ? "Signing in..." : "Sign in"}
				</button>

				<p className="text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link href="/Auth/signup" className="font-medium text-primaryBgClr hover:text-green-600">
						Sign up
					</Link>
				</p>
			</form>
		</div>
	);
};

export default LoginAuth;
