'use client'
import React from "react";
import logo from "@/../public/logo.svg"
import Image from "next/image";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";
import BackwardButton from "@/app/components/BackwardButton";
import { ToastContainer } from "@/app/components/nextToast";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ params }: { params: { Choice: string } }) => {
	return (	<>
			<ToastContainer/>
			{/* <Image src={logo} alt=""/> */}
			{/* I have to add pt-0 in the below div parent element element */}
			<div className=" m-auto p-[5%] pt-0 flex flex-wrap justify-around items-center h-screen login-form-enclosing hide-on-smaller">

				<section className={`flex flex-col justify-start  gap-7 sm:gap-2 login-para ${params.Choice === 'login'?'sm:mr-[50px]':'sm:mr-[100px]'}`}>
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
					<p className="text-gray-400 font-medium" style={{maxWidth: '200px'}}>

						{params.Choice === "login" ? (
							`Access your account
							effortlessly and pick up right
							where you left off`
						) : (
							`
								Become a part of our vibrant
								community and unlock exclusive
								benefits.
							`
						)}
					</p>
				</section>

				<section className="login-form">
					{params.Choice === "login" ? (
						<LoginAuth />
					) : (
						<SignUpAuth />
					)}
				</section>
			</div>

			<div className="show-on-smaller mobile-login-form p-[5%] h-screen flex flex-col">
				<div className="flex gap-4">
					<BackwardButton pageType="homePage"/>
					<h5 className=" text-primaryBgClr">
						{
							params.Choice === "login"
							? "WELCOME BACK!"
							: "JOIN THE COMMUNITY"
						}
					</h5>
				</div>
				<div className="flex flex-col justify-center" style={{flex: 1}}>
					<h1 className="font-semibold my-8 text-center">
						{
							params.Choice === "login"
							? "Login"
							: "Sign Up"
						}
					</h1>
					<section className="login-form">
						{params.Choice === "login" ? (
							<LoginAuth />
						) : (
							<SignUpAuth />
						)}
					</section>
				</div>
			</div>
		</>

	);
};

export default Login;
