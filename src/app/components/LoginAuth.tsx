import React from "react";

const LoginAuth = () => {
	return (
		<form action="" className="flex flex-col gap-y-10 mt-4">
			<input
				type="email"
				placeholder="Email"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
			/>
			<input
				type="password"
				placeholder="Password"
				className="py-4 px-3 w-96 outline-none border rounded-3xl"
			/>
			<div className="text-sm">
				<input type="checkbox" id="checkbox" />{" "}
				<label className="ml-2" htmlFor="checkbox">
					Remember Me
				</label>
				<div className="float-right text-primaryBgClr">
					Forgot Password
				</div>
			</div>
			<button
				type="submit"
				className="text-white border px-3 py-4 rounded-3xl bg-primaryBgClr w-96"
			>
				Login
			</button>
			<div className="text-white border px-3 rounded-3xl bg-green-100 py-4  w-96">
				Login with a code
			</div>
		</form>
	);
};

export default LoginAuth;
