import React from "react";

const SingUpAuth = () => {
	return (
		<form action="">
			<input
				type="name"
				placeholder="Name"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
			/>
			<input
				type="email"
				placeholder="Email"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
			/>
			<input
				type="number"
				placeholder="Phone Number"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
			/>
			<input
				type="password"
				placeholder="Password"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
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
