import React, { FormEvent, useState } from "react";
import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import Popup from "./Popup";
import Loader from "./loader";
const SingUpAuth = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [loader, setLoader] = useState(false);

	// console.log(Popup("error", 'something went wrong'))

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			console.log('starting')
			setLoader(true);
			// Validate form inputs

			if (name.length < 4) {
				// Handle name validation error

				Popup("error","Name must be at least 5 characters long");
				console.log()
				setLoader(false);
				return;
			}
			if ( contact.length < 10 || contact.length > 10) {
				// Handle phone number validation error
				Popup(
					"error",
					"Phone number must be 10 digits long"
				);
				setLoader(false);
				return;
			}
			if (
				!/[a-z]/.test(password) ||
				!/[A-Z]/.test(password) ||
				!/\d/.test(password)
			) {
				// Handle password validation error
				Popup(
					"error",
					"Password must contain at least one lowercase letter, one uppercase letter, and one digit"
				);
				setLoader(false);
				return;
			}
			const user = { name, email, password, contact };
			console.log('crossed if conditions', name, email, password, contact)
			const response = await axios.post("/api/users/signup", {
				user,
			});
			console.log("data sent")
			const success = await response.data.success;
			if (!success) {
				Popup("error", response.data.message);
				console.log(success, response.data.message);
				setLoader(false);
				return;
			} else {
				router.push("/Auth/login");
				console.log(success);
				return;
			}
		} catch (error) {
			Popup("error", "Something went wrong,Please try again later");
			console.log("Something went wrong ", error);
		}
	}

	return (
		<>
			{loader && <Loader />}
			<form
				onSubmit={sendData}
				className="flex flex-col gap-y-7 mt-4 sm:gap-y-4"
			>
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
					disabled={loader}
					className="text-white border cursor-pointer rounded-full py-4 px-3 hover:bg-green-600 bg-primaryBgClr sm:py-2"
				>
					Sign Up
				</button>
			</form>
		</>
	);
};

export default SingUpAuth;
