"use client";
import Image from "next/image";
import phoneImg from "@/../public/phoneImg.svg";
import { GoBell } from "react-icons/go";
import { CiRoute } from "react-icons/ci";
import { IoCubeOutline } from "react-icons/io5";
import vector from "@/../public/Vector.svg";
import IntroFooter from "../components/IntroFooter";
import IntroHeader from "../components/IntroHeader";
import VeriticalRuler from "@/../public/VerticalRuler.svg";
import InputSpace from "../components/InputSpace";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ReviewInterface } from "@/interface/productList";
// import Slider from "react-slick";
import SimpleSlider from "../components/SimpleSlider";

// import HDFC from "@/../public/cards/HDFC.svg";

import fb from "@/../public/fb.svg";
import insta from "@/../public/Insta.svg";
// import whtsap from "@/../public/whatsapp.svg"
import { FaWhatsapp } from "react-icons/fa";
import whtsap from "@/../public/whtsap.svg";
import footerDanda from "@/../public/FooterDanda.svg";

export default function Home() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [error, setError] = useState("");
	const [mail, setMail] = useState("");
	const [data, setData] = useState<ReviewInterface[]>([]);

	const user = { name, email, number };

	async function sendData() {
		try {
			// Validate form inputs
			// if (name.length < 5) {
			// 	// Handle name validation error
			// 	setError("Name must be at least 5 characters long");
			// 	return;
			// }
			// if (number.length < 10) {
			// 	// Handle phone number validation error
			// 	setError(
			// 		"Phone number must be at least 10 digits long"
			// 	);
			// 	return;
			// }

			const response = await axios.post("/api/users/signup", {
				user,
			});
			const success = await response.data.success;
			if (!success) {
				setError(await response.data.message);
				console.log(error);
				return;
			} else {
			}
		} catch (error) {
			setError("Something went wrong,Please try again later");
			console.log("Something went wrong ", error);
		}
	}

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get(
					"/api/reviews?review=show"
				);
				if (response.data.success) {
					setData(response.data.data);
				} else {
					console.log("something went wrong from server");
				}
			} catch {
				console.log(
					"something went wrong while sending request"
				);
			}
		}
		getData();
	});

	const arr = [
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
		{
			user: "Vansh Kumar",
			review: "Incredible service, outstanding results!Deal dynamo transformed our website beyond our expectations.",
		},
	];

	const image = <Image src={VeriticalRuler} alt={""}></Image>;

	const danda = <Image src={footerDanda} alt={""} />;

	return (
		<div className="">
			<IntroHeader />
			<main className=" min-h-screen text-center">
				<section className="text-center px-10 py-16 sm:py-8">
					<h5 className="my-4 font-medium text-primaryBgClr">
						TOP RANKED SOLUTIONS
					</h5>
					<h1 className="font-extrabold sm:leading-7">
						Your One-Stop Solutions for <br /> Managing
						Phone Orders
					</h1>
					<h3 className="my-6 text-gray-400 sm:leading-7 hide-on-smaller">
						Streamline your phone order management
						effortlessly <br /> with our comprehensive
						solution
					</h3>
					<button className="button button-primary button-lg mt-4">

						<Link
							href={"/Auth/signup"}
							className="text-xl"
						>
							Become a Afilliate
						</Link>
					</button>
				</section>

				<section className="bg-black text-white text-left px-10 py-10 flex items-center data-section">
					{" "}
					<div className="font-extrabold text-white flex flex-col gap-y-4">
						{" "}
						<h1 className="">20K+</h1>
						<h3 className="text-gray-400 font-semibold">
							Users
						</h3>
					</div>
					{image}
					<div className="font-extrabold text-white flex flex-col gap-y-4">
						<h1 className="">10,000+</h1>
						<h3 className="text-gray-400 font-semibold">
							Phones
						</h3>
					</div>
					{image}{" "}
					<div className="font-extrabold text-white flex flex-col gap-y-3">
						<h1 className="">400+</h1>
						<h3 className="text-gray-400 font-semibold">
							Deals
						</h3>
					</div>
				</section>
				<section className="py-[3.75rem] text-center px-10 sm:py-12" id="aboutUs">
					<h5 className="font-medium text-primaryBgClr mb-8">
						ABOUT US
					</h5>
					<h1 className="font-extrabold">
						Simplify Phone Order <br />
						Management
					</h1>
					<Image
						src={phoneImg}
						alt={"phones Image"}
						className="my-12 mx-auto"
					></Image>
					<h3 className="text-[#121212B2]">
						We&apos;re on a mission to Streamline phone
						order management. Our <br /> user-friendly
						platform empowers businesses and individuals
						to <br /> optimize their processes
						effortlessly. Join us and experience the{" "}
						<br />
						convenience of seamless order management
						today
					</h3>
				</section>
				<section className="text-center py-24 px-10 bg-[#242424] text-white" id="ourFeatures">
					<h5 className="font-medium text-primaryBgClr mb-8">
						OUR FEATURES
					</h5>
					<h1 className="font-extrabold ">
						Unlock the power of seamless <br />
						phone Order Management
					</h1>
					<div className="flex justify-center gap-x-32 mt-12 items-center text-left sm:gap-2 sm:flex-col">
						<div className="flex flex-col p-9 rounded-2xl bg-[#FFFFFF1A] justify-start gap-y-3 sm:w-4/5 sm:py-3 sm:pl-4 sm:pr-0">
							<GoBell className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

							<div className="text-lg font-semibold">
								Real-Time Order <br /> Alerts
							</div>
							<div className="text-[#FFFFFFB2]">
								Instant alerts for new <br />{" "}
								orders and updates for <br />{" "}
								seamless order <br /> management
							</div>
						</div>
						<div className="flex flex-col p-9 rounded-2xl bg-[#FFFFFF1A] justify-start gap-y-3 sm:w-4/5 sm:py-3 sm:pl-4 sm:pr-0">
							<CiRoute className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

							<div className="text-lg font-semibold">
								Customizable <br /> Management
							</div>
							<div className="text-[#FFFFFFB2]">
								Get promotions <br />{" "}
								effortlessly. Set discounts,{" "}
								<br /> deals, quantities &{" "}
								<br /> validity
							</div>
						</div>
						<div className="flex flex-col p-9 rounded-2xl bg-[#FFFFFF1A] justify-start gap-y-3 sm:w-4/5 sm:py-3 sm:pl-4 sm:pr-0">
							<IoCubeOutline className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />
							<div className="text-lg font-semibold">
								Advanced Order <br /> Tracking
							</div>
							<div className="text-[#FFFFFFB2]">
								Effortlessly track orders,{" "}
								<br /> gain insights, provide{" "}
								<br /> unparalleled customer{" "}
								<br /> service
							</div>
						</div>
					</div>
				</section>
				<section className="pt-16 pb-24 px-10 bg-primaryBgClr" id="testimonials">
					<h5 className="font-medium text-white mb-8">
						CUSTOMER TESTIMONIALS
					</h5>
					<h1 className="font-extrabold text-white mb-16">
						Hear What Our Clients <br />
						Have to Say!
					</h1>
					<SimpleSlider reviewArr={arr} />
				</section>

				<section className="pt-24 pb-24 px-10 sm:pt-8 sm:pb-8">
					<h5 className="font-medium text-primaryBgClr mb-8">
						BECOME AN AFFILIATE
					</h5>
					<h1 className="my-12 font-extrabold sm:my-8">
						Join Our Affiliate Program <br /> & Start
						Earning Today
					</h1>
					<div className="py-12 bg-gray-200 flex justify-center gap-x-[20rem] items-start sm:items-center sm:gap-6" id="contactUs">
						<div className="text-left">
							<div className=" font-medium text-2xl sm:font-semibold sm:text-lg">
								Fill the form
							</div>
							<h5 className="text-gray-400 mt-3 leading-tight sm:text-xs">
								Begin your journey to affiliate{" "}
								<br /> success by completing the
								form
							</h5>
						</div>
						<form
							onSubmit={sendData}
							className="text-sm flex flex-col gap-y-5 items-center justify-center sm:w-full"
						>
							<InputSpace
								type="text"
								value={name}
								placeholder="Name"
								onChange={(value) =>
									setName(value)
								}
								classList={"sm:w-4/5"}
							/>
							<InputSpace
								type="text"
								value={email}
								placeholder="Email"
								onChange={(value) =>
									setEmail(value)
								}
								classList={"sm:w-4/5"}
							/>
							<InputSpace
								type="text"
								value={number}
								placeholder="Phone Number"
								onChange={(value) =>
									setNumber(value)
								}
								classList={"sm:w-4/5"}
							/>
							<button
								type="submit"
								className="py-4 w-96 font-extrabold hover:bg-green-600 bg-primaryBgClr text-white rounded-3xl sm:py-2 sm:w-4/5"
							>
								Send Request
							</button>
						</form>
					</div>
				</section>
				<section className="bg-primaryBgClr flex justify-around py-4 text-sm text-white px-10 sm:px-0 sm:py-2 sm:justify-center sm:gap-5">
					<div className="flex gap-x-7 sm:gap-1">
						<Image
							src={whtsap}
							alt=""
							className="sm:w-6 w-8 h-8"
						/>
						<Image
							className=" sm:w-6 w-8 h-8"
							src={insta}
							alt={""}
						/>
						<Image
							className="sm:w-6 w-8 h-8 "
							src={fb}
							alt={""}
						/>
					</div>
					<div className="responsiveLink flex flex-wrap font-medium items-center justify-center gap-x-5 sm:gap-1 sm:text-nowrap sm:text-[10px]">
						<div>Refund Policy</div>
						{danda}
						<div>Privacy Policy</div>
						{danda}
						<div>Terms and Conditions</div>
					</div>
				</section>
			</main>

			{/* <IntroFooter /> */}
		</div>
	);
}
