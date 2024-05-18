'use client'
import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AxiosResponse } from "axios";
import Popup from "./Popup";
import Loader from "./loader";

const LoginAuth = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loader, setLoader] = useState(false);

	const user = { email, password };

	function checkSuccess(success: boolean, message: string, data: string) {
		if (success === false) {
			Popup("error", message);
			setLoader(false);
			return;
		} else {
			console.log("this is user/admin", data);
			if (data === "user") {
				console.log(data);
				router.push("/dashboard");
			} else if (data === "admin") {
				router.push("/adminDashboard");
			}
		}
	}

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setLoader(true);
			if(!email || !password){
				setLoader(false)
				Popup('error', 'Fill the form!!')
				return;
			}
			const response =
				await axios.post("/api/users/login", { user }
			)
			const  { success, message, data } = response.data
			// const success = response
			console.log(success, message, data);
			checkSuccess(success, message, data);
		} catch (error: any) {
			setLoader(false)
			Popup("error", "Server error, please refresh");
		}
	}

	// function PswrdNd() {}

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

				{/* <div className="text-sm">
				<div className="float-right text-primaryBgClr cursor-pointer">
					Forgot Password{" "}
				</div>
			</div> */}

				<button
					disabled={loader}
					className="text-white border px-3 py-4 rounded-full hover:bg-green-600 bg-primaryBgClr w-96 cursor-pointer sm:w-48 sm:py-2"
					type="submit"
				>
					Login
				</button>
			</form>
		</>
	);
};

export default LoginAuth;
