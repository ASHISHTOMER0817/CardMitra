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

const SignUpAuth = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [loader, setLoader] = useState(false);

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setLoader(true);
			if (name.length < 4) {
				Popup(
					"error",
					"Name must be at least 5 characters long"
				);
				setLoader(false);
				return;
			}
			if (contact.length < 10 || contact.length > 10) {
				Popup("error", "Phone number must be 10 digits long");
				setLoader(false);
				return;
			}
			if (
				!/[a-z]/.test(password) ||
				!/[A-Z]/.test(password) ||
				!/\d/.test(password)
			) {
				Popup(
					"error",
					"Password must contain at least one lowercase letter, one uppercase letter, and one digit"
				);
				setLoader(false);
				return;
			}
			const user = { name, email, password, contact };
			const response = await axios.post("/api/users/signup", {
				user,
			});
			const success = await response.data.success;
			if (!success) {
				Popup("error", response.data.message);
				setLoader(false);
				return;
			} else {
				router.push("/Auth/login");
				return;
			}
		} catch (error) {
			Popup("error", "Something went wrong,Please try again later");
		}
	}

	return (
		<div className="w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
			{loader && <Loader />}
			<div className="text-center mb-6 sm:mb-8">
				<Link href="/" className="inline-block mb-4">
					<Image src={logo} alt="CardMitra Logo" width={48} height={48} className="sm:w-[60px] sm:h-[60px]" />
				</Link>
				<h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Create an Account</h2>
				<p className="text-sm sm:text-base text-gray-600">Join CardMitra to start your journey</p>
			</div>

			<form onSubmit={sendData} className="space-y-4 sm:space-y-6">
				<div className="space-y-3 sm:space-y-4">
					<InputSpace
						type="text"
						value={name}
						placeholder="Full Name"
						onChange={(value) => setName(value)}
					/>
					<InputSpace
						type="email"
						value={email}
						placeholder="Email Address"
						onChange={(value) => setEmail(value)}
					/>
					<InputSpace
						type="tel"
						value={contact}
						placeholder="Phone Number"
						onChange={(value) => setContact(value)}
					/>
					<InputSpace
						type="password"
						value={password}
						placeholder="Password"
						onChange={(value) => setPassword(value)}
					/>
				</div>

				<button
					type="submit"
					disabled={loader}
					className="w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primaryBgClr hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBgClr transition-colors duration-300"
				>
					{loader ? "Creating account..." : "Create Account"}
				</button>

				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link href="/Auth/login" className="font-medium text-primaryBgClr hover:text-green-600">
						Sign in
					</Link>
				</p>
			</form>
		</div>
	);
};

export default SignUpAuth;
