"use client";
import React from "react";
import logo from "@/../public/logo.svg";
import Image from "next/image";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";
import BackwardButton from "@/app/components/BackwardButton";
import { ToastContainer } from "@/app/components/nextToast";
import "react-toastify/dist/ReactToastify.css";

{
	/*START */
}
import Link from "next/link";
import { FormEvent, useState } from "react";
// import InputSpace from "./InputSpace";
import axios from "axios";
import { useRouter } from "next/navigation";
import Popup from "@/app/components/Popup";
import communityIllustration from "@/../public/community-illustration.jpeg";
{
	/*END */
}

const Login = ({ params }: { params: { Choice: string } }) => {
	interface auth {
		heading: string;
		intro: string;
		inputTags: string[];
		button: string;
		forward: string;
		rememberMe: boolean;
		forgotPassword: boolean;
	}

	{
		/*START */
	}
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [contact, setContact] = useState("");
	const [loader, setLoader] = useState(false);
	const [auth, setAuth] = useState<auth>();
	// const [remember, setRemember] = useState(true)

	// console.log(Popup("error", 'something went wrong'))

	async function sendData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			console.log("starting");
			setLoader(true);
			// Validate form inputs

			if (name.length < 4) {
				// Handle name validation error

				Popup(
					"error",
					"Name must be at least 5 characters long"
				);
				console.log();
				setLoader(false);
				return;
			}
			if (contact.length < 10 || contact.length > 10) {
				// Handle phone number validation error
				Popup("error", "Phone number must be 10 digits long");
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
			console.log(
				"crossed if conditions",
				name,
				email,
				password,
				contact
			);
			const response = await axios.post("/api/users/signup", {
				user,
			});
			console.log("data sent");
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
	{
		/*END */
	}

	const login = {
		heading: "WELCOME BACK!",
		intro: "Access your account effortlessly and pick up right where you left off",
		inputTags: [email, password],
		button: "login",
		forward: "Signup",
		rememberMe: true,
		forgotPassword: true,
	};
	const signUp = {
		heading: "JOIN THE COMMUNITY",
		intro: "Unlock exclusive benefits and connect with like-minded individuals.",
		inputTags: [name, email, contact, password],
		button: "signup",
		forward: "login",
		rememberMe: false,
		forgotPassword: false,
	};

	// if(params.Choice === 'login') return setAuth((prev)=> prev = login);else setAuth((prev)=> prev = signUp);

	return (
		<>
			<ToastContainer />
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
					<BackwardButton pageType="homePage" />
					<h5 className=" text-primaryBgClr">
						{params.Choice === "login"
							? "WELCOME BACK!"
							: "JOIN THE COMMUNITY"}
					</h5>
				</div>
				<div
					className="flex flex-col justify-center"
					style={{ flex: 1 }}
				>
					<h1 className="font-semibold my-4 text-center">
						{params.Choice === "login"
							? "Login"
							: "Sign Up"}
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

			{/*Latest DEsign changes */}
			{/*START */}
			{/* <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <div className="lg:w-1/2 bg-primaryBgClr p-8 lg:p-12">
        <div className="mb-8 lg:mb-0">
	    <Image src={logo} alt="logo" className="h-8 lg:h-12"/>
        </div>
        <div className="text-white text-center lg:text-left lg:mt-20">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{auth?.heading}</h1>
          <p className="text-lg lg:text-xl mb-8">Unlock exclusive benefits and connect with like-minded individuals.</p>
	    <Image src={communityIllustration} alt={"Community"} className="max-w-xs mx-auto lg:max-w-sm lg:mx-0 block sm:hidden"/>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white p-6 lg:p-8 rounded-[25px] shadow-lg max-w-md w-full">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center">Sign Up</h2>
          <form onSubmit={sendData} className="space-y-4 lg:space-y-6">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-[25px] pl-10"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-[25px] pl-10"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <div className="relative">
              <input
                type="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                className="w-full px-4 py-2 border rounded-[25px] pl-10"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-[25px] pl-10"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
            </div>
            <button
              type="submit"
              disabled={loader}
              className="w-full py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-[25px] hover:from-green-500 hover:to-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-sm lg:text-base">
            Already have an account?{" "}
            <Link href="/Auth/login" className="text-primaryBgClr hover:text-green-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div> */}

			{/*END */}
		</>
	);
};

export default Login;
