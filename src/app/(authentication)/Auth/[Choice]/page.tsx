'use client'
import React from "react";
import Image from "next/image";
import googleIcon from "@/../public/flat-color-icons_google.svg";
import facebook from "@/../public/logos_facebook.svg";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";
import BackwardButton from "@/app/components/BackwardButton";
const Login = ({ params }: { params: { Choice: string } }) => {
	return (
			<div className=" m-auto p-[5%] flex justify-around items-center h-screen">
				<section className="flex flex-col justify-start gap-7">
					<BackwardButton/>

					<h5 className=" text-primaryBgClr">
						{params.Choice === "login"
							? "WELCOME BACK!"
							: "JOIN THE COMMUNITY"}
					</h5>
					<h1 className="font-semibold">
						{params.Choice === "login"
							? "Login"
							: "Sign Up"}
					</h1>
 					{params.Choice === "login" ? (
						<h4 className="text-[#494848] font-medium">
							Access your account <br />{" "}
							effortlessly and pick up <br /> right
							where you left off
						</h4>
					) : (
						<p className="text-gray-400 font-medium">
							Become a part of our <br /> vibrant
							community and <br /> unlock exclusive
							benefits.
						</p>
					)}
				</section>
				<section className="relative">
					{params.Choice === "login" ? (
						<LoginAuth />
					) : (
						<SignUpAuth />
					)}
				</section>
			</div>
		
	);
};

export default Login;
