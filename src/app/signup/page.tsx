'use client'
import React, { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputSpace from "../components/InputSpace";
const SingUpAuth = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [number, setNumber] = useState("");
	const [error, setError] = useState("");

	const user = { name, email, password, number };

	async function sendData(e:FormEvent<HTMLFormElement>) {
		try {
			e.preventDefault()
			const response = await axios.post("/api/users/signup", {
				user,
			});
			console.log("user")
			const success = await response.data.success;
			if (!success) {
				setError(await response.data.message);
				console.log(success,await response.data.message);
				return;
			} else {
				router.push("/Auth/login");
				console.log(success);
				return;
			}
		} catch (error) {
			setError("Something went wrong,Please try again later");
			console.log("Something went wrong ", error);
		}
	}

	return (
		<form onSubmit={sendData} className="flex flex-col gap-y-10 mt-4">
			<InputSpace
				type="text"
				value={name}
				placeholder="Name"
				onChange={(value) => setName(value)}
			/>
			<InputSpace
				type="text"
				value={email}
				placeholder="Email"
				onChange={(value) => setEmail(value)}
			/>
			<InputSpace
				type="text"
				value={number}
				placeholder="Phone Number"
				onChange={(value) => setNumber(value)}
			/>
			<InputSpace
				type="password"
				value={password}
				placeholder="Password"
				onChange={(value) => setPassword(value)}
			/>
			<div className="mb-5 ml-2 text-sm">
				<input type="checkbox" id="checkbox" />{" "}
				<label className="ml-2" htmlFor="checkbox">
					Remember Me
				</label>
			</div>
			<button
				type="submit"
				className="text-white border rounded-3xl py-4 px-3 bg-primaryBgClr w-96"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SingUpAuth;
