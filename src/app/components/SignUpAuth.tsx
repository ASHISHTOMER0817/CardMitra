import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
const SingUpAuth = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [error, setError] = useState("");

	const user = { name, email, password, contact };

	async function sendData(e:FormEvent<HTMLFormElement>) {
		e.preventDefault()
		try {
			// Validate form inputs

			// if (name.length < 5) {
			// 	// Handle name validation error
			// 	setError("Name must be at least 5 characters long");
			// 	return;
			// }
			// if (contact.length < 10) {
			// 	// Handle phone number validation error
			// 	setError(
			// 		"Phone number must be at least 10 digits long"
			// 	);
			// 	return;
			// }
			// if (
			// 	!/[a-z]/.test(password) ||
			// 	!/[A-Z]/.test(password) ||
			// 	!/\d/.test(password)
			// ) {
			// 	// Handle password validation error
			// 	setError(
			// 		"Password must contain at least one lowercase letter, one uppercase letter, and one digit"
			// 	);
			// 	return;
			// }

			
			const response = await axios.post("/api/users/signup", {
				user,
			});
			// console.log("user")
			const success = await response.data.success;
			if (!success) {
				setError( response.data.message);
				console.log(success, response.data.message);
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
		<form onSubmit={sendData} className="flex flex-col gap-y-7 mt-4">
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
			
			<button
				type="submit"
				className="text-white border rounded-full py-4 px-3 bg-primaryBgClr w-96"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SingUpAuth;
