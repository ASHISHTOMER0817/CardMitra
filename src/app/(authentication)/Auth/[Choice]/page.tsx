'use client'
import React from "react";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";
import BackwardButton from "@/app/components/BackwardButton";
import { ToastContainer } from "@/app/components/nextToast";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ params }: { params: { Choice: string } }) => {
	return (	<>
	<ToastContainer/>
			<div className=" m-auto p-[5%] flex justify-around items-center h-screen sm:flex-col">
				<section className={`flex flex-col justify-start gap-7 sm:gap-2 ${params.Choice === 'login'?'sm:mr-[50px]':'sm:mr-[100px]'}`}>
					<BackwardButton pageType="homePage"/>

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
			</>
		
	);
};

export default Login;
