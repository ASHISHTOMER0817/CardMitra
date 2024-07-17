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
import productList, { ReviewInterface } from "@/interface/productList";
// import Slider from "react-slick";
import SimpleSlider from "../components/SimpleSlider";

// import HDFC from "@/../public/cards/HDFC.svg";

import fb from "@/../public/fb.svg";
import insta from "@/../public/Insta.svg";
// import whtsap from "@/../public/whatsapp.svg"
import { FaWhatsapp } from "react-icons/fa";
import whtsap from "@/../public/whtsap.svg";
import footerDanda from "@/../public/FooterDanda.svg";
import CardLayout from "../components/CardLayout";
import { FaArrowDownLong } from "react-icons/fa6";

export default function Home() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [number, setNumber] = useState("");
	const [error, setError] = useState("");
	const [mail, setMail] = useState("");
	const [reviews, setReviews] = useState<ReviewInterface[]>([]);

	const user = { name, email, number };
	const [data, setData] = useState<productList[]>();

	useEffect(() => {
		async function getData() {
			try {
				console.log("sending calls where");
				const response = await axios.get(
					"/api/orders/products?limit=homePage"
				);
				const allProducts = response.data.data;
				console.log(allProducts);
				setData(allProducts);
			} catch {
				// Popup(
				// 	"error",
				// 	"Something went wrong, REFRESH THE PAGE"
				// );
				console.log("Something went wrong, REFRESH THE PAGE");
			}
		}
		getData();
	}, []);

	// async function sendData() {
	// 	try {
	// 		// Validate form inputs
	// 		// if (name.length < 5) {
	// 		// 	// Handle name validation error
	// 		// 	setError("Name must be at least 5 characters long");
	// 		// 	return;
	// 		// }
	// 		// if (number.length < 10) {
	// 		// 	// Handle phone number validation error
	// 		// 	setError(
	// 		// 		"Phone number must be at least 10 digits long"
	// 		// 	);
	// 		// 	return;
	// 		// }

	// 		const response = await axios.post("/api/users/signup", {
	// 			user,
	// 		});
	// 		const success = await response.data.success;
	// 		if (!success) {
	// 			setError(await response.data.message);
	// 			console.log(error);
	// 			return;
	// 		} else {
	// 		}
	// 	} catch (error) {
	// 		setError("Something went wrong,Please try again later");
	// 		console.log("Something went wrong ", error);
	// 	}
	// }

	// useEffect(() => {
	// 	async function getData() {
	// 		try {
	// 			const response = await axios.get(
	// 				"/api/reviews?review=show"
	// 			);
	// 			if (response.data.success) {
	// 				setReviews(response.data.data);
	// 			} else {
	// 				console.log("something went wrong from server");
	// 			}
	// 		} catch {
	// 			console.log(
	// 				"something went wrong while sending request"
	// 			);
	// 		}
	// 	}
	// 	getData();
	// });

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

	const image = <Image className="" src={VeriticalRuler} alt={""}></Image>;

	const danda = <Image src={footerDanda} alt={""} />;

	return (
		<>
			{/* <div className="">
				<IntroHeader />
				<main className=" min-h-screen text-center">
					<section className="text-center px-10 bg-black py-16 sm:py-8">
						<h5 className="my-4 font-medium text-primaryBgClr sm:my-0">
							DEALS
						</h5>
						<h1 className="my-4 font-extrabold text-gray-400 sm:leading-7">
							amazing deals <br />
							sign up and start earning
						</h1>
						<div className="mb-10 mt-14 ml-8 flex flex-wrap gap-3 sm:ml-2 sm:gap-1 sm:my-6">
							{!data ? (
								""
							) : data.length > 0 ? (
								data.map(
									(
										{
											_id,
											requirement,
											name,
											price,
											commission,
											site,
											image,
											cards,
										},
										index
									) => {
										return (
											<>
												<CardLayout
													classList="bg-white"
													key={
														index
													}
													placeOrder={
														<Link
															className="p-[14px] font-semibold text-base hover:bg-green-600 bg-primaryBgClr rounded-full border text-center w-auto text-white sm:mt-2 sm:px-1 sm:py-2 sm:font-medium sm:text-[10px] sm:text-nowrap sm:leading-4"
															href={
																"/Auth/signup"
															}
														>
															Fulfill
															Order
														</Link>
													}
													quantity={
														requirement
													}
													name={
														name
													}
													price={
														price
													}
													commission={
														commission
													}
													site={
														site
													}
													deviceImage={
														image
													}
													cards={
														cards
													}
												/>
											</>
										);
									}
								)
							) : (
								<div className="text-red-500 font-serif mx-auto w-fit ">
									No other products to order
								</div>
							)}
						</div>
						<Link
							href={"/Auth/signup"}
							className="text-black flex justify-center items-center gap-2 w-fit mx-auto bg-white px-5 py-1 rounded-[12px] button"
						>
							<div className="font-serif font-semibold text-lg">
								{" "}
								See More
							</div>{" "}
							<FaArrowDownLong
								width={14}
								className="w-[14px] h-auto"
							/>
						</Link>
					</section>
					<section className="text-center px-10 py-16 sm:py-8">
						<h5 className="my-4 font-medium text-primaryBgClr  sm:my-0">
							TOP RANKED SOLUTIONS
						</h5>
						<h1 className="font-extrabold sm:leading-7">
							Your One-Stop Solutions for <br />{" "}
							Managing Phone Orders
						</h1>
						<h3 className="my-6 text-gray-400 sm:leading-7 hide-on-smaller">
							Streamline your phone order management
							effortlessly <br /> with our
							comprehensive solution
						</h3>
						<button className="button button-primary button-lg mt-4">
							<Link
								href={"/Auth/signup"}
								className="text-xl"
							>
								Become an Affiliate
							</Link>
						</button>
					</section>

					<section className="bg-black text-white text-left px-10 py-10 flex items-center data-section">
						{" "}
						{[
							{ count: "20K+", type: "Users" },
							{ count: "10,000+", type: "Phones" },
							{ count: "400+", type: "Deals" },
						].map(({ count, type }, index) => {
							return (
								<div
									key={index}
									className="font-extrabold text-white flex flex-col gap-y-4"
								>
									{" "}
									<h1 className="">
										{count}
									</h1>
									<h3 className="text-gray-400 font-semibold">
										{type}
									</h3>
								</div>
							);
						})}
					</section>
					<section
						className="text-center px-10 py-16 sm:py-8"
						id="aboutUs"
					>
						<h5 className="font-medium text-primaryBgClr mb-4">
							ABOUT US
						</h5>
						<h1 className="font-extrabold sm:leading-7">
							Simplify Phone Order <br />
							Management
						</h1>
						<Image
							src={phoneImg}
							alt={"phones Image"}
							className="my-12 mx-auto sm:my-6"
						></Image>
						<h3 className="text-[#121212B2]">
							We&apos;re on a mission to Streamline
							phone order management. Our <br />{" "}
							user-friendly platform empowers
							businesses and individuals to <br />{" "}
							optimize their processes effortlessly.
							Join us and experience the <br />
							convenience of seamless order
							management today
						</h3>
					</section>
					<section
						className="text-center py-16 px-10 bg-[#242424] text-white sm:py-8"
						id="ourFeatures"
					>
						<h5 className="font-medium text-primaryBgClr mb-8 sm:mb-4">
							OUR FEATURES
						</h5>
						<h1
							className="font-extrabold "
							style={{ lineHeight: 1.75 }}
						>
							Unlock the power of seamless <br />
							phone Order Management
						</h1>
						<div className="flex justify-center gap-x-32 mt-12 items-center text-left sm:gap-2 sm:flex-col sm:mt-4">
							{[
								{
									head: (
										<>
											Real-Time
											Order <br />{" "}
											Alerts
										</>
									),
									desc: (
										<>
											{" "}
											Instant alerts
											for new <br />{" "}
											orders and
											updates for{" "}
											<br />{" "}
											seamless order{" "}
											<br />{" "}
											management
										</>
									),
								},
								{
									head: (
										<>
											Customizable{" "}
											<br />{" "}
											Management{" "}
										</>
									),
									desc: (
										<>
											Get promotions{" "}
											<br />{" "}
											effortlessly.
											Set discounts,{" "}
											<br /> deals,
											quantities &{" "}
											<br />{" "}
											validity
										</>
									),
								},
								{
									head: (
										<>
											Advanced Order{" "}
											<br />{" "}
											Tracking{" "}
										</>
									),
									desc: (
										<>
											Effortlessly
											track orders,{" "}
											<br /> gain
											insights,
											provide <br />{" "}
											unparalleled
											customer{" "}
											<br /> service
										</>
									),
								},
							].map(({ head, desc }, index) => {
								return (
									<div
										key={index}
										className="flex flex-col p-9 rounded-2xl bg-[#FFFFFF1A] justify-start gap-y-3 sm:w-4/5 sm:py-3 sm:pl-4 sm:pr-0"
									>
										<GoBell className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

										<div className="text-lg font-semibold">
											{head}
										</div>
										<div className="text-[#FFFFFFB2]">
											{desc}
										</div>
									</div>
								);
							})}
						</div>
					</section>
					<section
						className="py-16 px-10 sm:py-8 bg-primaryBgClr"
						id="testimonials"
					>
						<h5 className="font-medium text-white mb-8 sm:mb-4">
							CUSTOMER TESTIMONIALS
						</h5>
						<h1 className="font-extrabold text-white mb-16 sm:mb-4 sm:leading-7">
							Hear What Our Clients <br />
							Have to Say!
						</h1>
						<SimpleSlider reviewArr={arr} />
					</section>

					<section className="bg-primaryBgClr flex justify-around py-4 text-sm text-white px-10 sm:px-0 sm:py-2 sm:justify-center sm:gap-5">
						<div className="flex gap-x-7 sm:gap-1">
							{[whtsap, insta, fb].map(
								(icon, index) => {
									return (
										<Image
											key={index}
											src={icon}
											alt=""
											className="sm:w-6 w-8 h-8"
										/>
									);
								}
							)}
						</div>
						<div className="responsiveLink flex flex-wrap font-medium items-center justify-center gap-x-5 sm:gap-1 sm:text-nowrap sm:text-[10px]">
							{[
								"Refund Policy",
								"Privacy Policy",
								"Terms and Conditions",
							].map((policy, index) => {
								return (
									<>
										<div key={index}>
											{policy}
										</div>
										{index < 2 && danda}
									</>
								);
							})}
						</div>
					</section>
				</main>
			</div> */}

			<IntroHeader />
			<section className="text-center px-10 bg-black py-16 lgMax:py-8 lgMax:px-4">
				<h5 className="my-4 font-medium text-primaryBgClr lgMax:my-2 lgMax:text-lg">
					DEALS
				</h5>
				<h1 className="my-4 font-extrabold text-gray-400 lgMax:textlgMax-2xl xs:text-xl">
					amazing deals <br />
					sign up and start earning
				</h1>
				<div className="mb-10 mt-14 ml-8 flex flex-wrap gap-3 lgMax:gap-4 lgMax:justify-center xs:gap-2">
					{!data ? (
						""
					) : data.length > 0 ? (
						data.map(
							(
								{
									_id,
									requirement,
									name,
									price,
									commission,
									site,
									image,
									cards,
								},
								index
							) => {
								return (
									<>
										<CardLayout
											classList="bg-white"
											key={index}
											placeOrder={
												<Link
													className="p-[14px] font-semibold text-base hover:bg-green-600 bg-primaryBgClr rounded-full border text-center w-auto text-white sm:mt-2 sm:px-1 sm:py-2 sm:font-medium sm:text-[10px] sm:text-nowrap sm:leading-4"
													href={
														"/Auth/signup"
													}
												>
													Fulfill
													Order
												</Link>
											}
											quantity={
												requirement
											}
											name={name}
											price={price}
											commission={
												commission
											}
											site={site}
											deviceImage={
												image
											}
											cards={cards}
										/>
									</>
								);
							}
						)
					) : (""
						// <div className="text-red-500 font-serif mx-auto w-fit ">
						// 	No other products to order
						// </div>
					)}
				</div>
				{/* <Link
					href={"/Auth/signup"}
					className="text-black flex justify-center items-center gap-2 w-fit mx-auto bg-white px-5 py-1 rounded-[12px] button"
				>
					<div className="font-serif font-semibold text-lg">
						{" "}
						See More
					</div>{" "}
					<FaArrowDownLong
						width={14}
						className="w-[14px] h-auto"
					/>
				</Link> */}
			</section>

			<section className="text-center px-10 py-16 lgMax:py-8 lgMax:px-4">
				<h5 className="my-4 font-medium text-primaryBgClr  sm:my-0">
					TOP RANKED SOLUTIONS
				</h5>
				<h1 className="font-extrabold sm:leading-7">
					Your One-Stop Solutions for <br /> Managing Phone
					Orders
				</h1>
				<h3 className="my-6 text-gray-400 sm:leading-7 hide-on-smaller">
					Streamline your phone order management
					effortlessly <br /> with our comprehensive
					solution
				</h3>
				<button className=" bg-primaryBgClr rounded-full hover:bg-green-600 text-white button-lg mt-4">
					<Link href={"/Auth/signup"} className="text-xl">
						Become an Affiliate
					</Link>
				</button>
			</section>

			<section className="bg-black text-white text-left px-10 py-10 flex items-center data-section lgMax:flex-col lgMax:gap-4 lgMax:text-center">
				{[
					{ count: "20K+", type: "Users" },
					{ count: "10,000+", type: "Phones" },
					{ count: "400+", type: "Deals" },
				].map(({ count, type }, index) => {
					return (
						<div
							key={index}
							className="font-extrabold text-white flex flex-col gap-y-4"
						>
							{" "}
							<h1 className="">{count}</h1>
							<h3 className="text-gray-400 font-semibold">
								{type}
							</h3>
						</div>
					);
				})}
			</section>

			<section
				className="text-center px-10 py-16 lgMax:py-8 lgMax:px-4"
				id="aboutUs"
			>
				<h5 className="font-medium text-primaryBgClr mb-4">
					ABOUT US
				</h5>
				<h1 className="font-extrabold sm:leading-7">
					Simplify Phone Order <br />
					Management
				</h1>
				<Image
					src={phoneImg}
					alt={"phones Image"}
					className="my-12 mx-auto sm:my-6"
				></Image>
				<h3 className="text-[#121212B2]">
					We&apos;re on a mission to Streamline phone order
					management. Our <br /> user-friendly platform
					empowers businesses and individuals to <br />{" "}
					optimize their processes effortlessly. Join us and
					experience the <br />
					convenience of seamless order management today
				</h3>
			</section>

			<section
				className="text-center py-16 px-10 bg-[#242424] text-white lgMax:py-8 lgMax:px-4"
				id="ourFeatures"
			>
				<h5 className="font-medium text-primaryBgClr mb-8 sm:mb-4">
					OUR FEATURES
				</h5>
				<h1
					className="font-extrabold "
					style={{ lineHeight: 1.75 }}
				>
					Unlock the power of seamless <br />
					phone Order Management
				</h1>

				<div className="flex justify-center gap-x-32 mt-12 items-center text-left lgMax:flex-col lgMax:gap-4 lgMax:mt-8">
					{[
						{
							head: (
								<>
									Real-Time Order <br />{" "}
									Alerts
								</>
							),
							desc: (
								<>
									{" "}
									Instant alerts for new{" "}
									<br /> orders and updates
									for <br /> seamless order{" "}
									<br /> management
								</>
							),
						},
						{
							head: (
								<>
									Customizable <br />{" "}
									Management{" "}
								</>
							),
							desc: (
								<>
									Get promotions <br />{" "}
									effortlessly. Set
									discounts, <br /> deals,
									quantities & <br />{" "}
									validity
								</>
							),
						},
						{
							head: (
								<>
									Advanced Order <br />{" "}
									Tracking{" "}
								</>
							),
							desc: (
								<>
									Effortlessly track orders,{" "}
									<br /> gain insights,
									provide <br />{" "}
									unparalleled customer{" "}
									<br /> service
								</>
							),
						},
					].map(({ head, desc }, index) => {
						return (
							<div
								key={index}
								className="flex flex-col p-9 rounded-2xl bg-[#FFFFFF1A] justify-start gap-y-3 sm:w-4/5 sm:py-3 sm:pl-4 sm:pr-0"
							>
								<GoBell className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

								<div className="text-lg font-semibold">
									{head}
								</div>
								<div className="text-[#FFFFFFB2]">
									{desc}
								</div>
							</div>
						);
					})}
				</div>
			</section>

			{/* <section
				className="py-16 px-10 lgMax:py-8 lgMax:px-4 bg-primaryBgClr"
				id="testimonials"
			>
				<h5 className="font-medium text-white mb-8 sm:mb-4">
					CUSTOMER TESTIMONIALS
				</h5>
				<h1 className="font-extrabold text-white mb-16 sm:mb-4 sm:leading-7">
					Hear What Our Clients <br />
					Have to Say!
				</h1>
				<SimpleSlider reviewArr={arr} />
			</section> */}
			<section
				className="py-16 px-10 lgMax:py-8 lgMax:px-4 bg-primaryBgClr"
				id="testimonials"
			>
				<h5 className="font-medium text-white mb-4 text-center">
					CUSTOMER TESTIMONIALS
				</h5>
				<h1 className="font-extrabold text-white mb-8 text-center text-3xl lgMax:text-2xl smMax:text-xl">
					Hear What Our Clients Have to Say!
				</h1>
				<SimpleSlider reviewArr={arr} />
			</section>

			<section className="bg-primaryBgClr flex justify-around py-4 text-sm text-white px-10 lgMax:px-4 lgMax:py-2 lgMax:flex-col lgMax:items-center lgMax:gap-4">
				<div className="flex gap-x-7 sm:gap-1">
					{[whtsap, insta, fb].map((icon, index) => {
						return (
							<Image
								key={index}
								src={icon}
								alt=""
								className="sm:w-6 w-8 h-8"
							/>
						);
					})}
				</div>
				<div className="responsiveLink flex flex-wrap font-medium items-center justify-center gap-x-5 sm:gap-1 sm:text-nowrap sm:text-[10px]">
					{[
						"Refund Policy",
						"Privacy Policy",
						"Terms and Conditions",
					].map((policy, index) => {
						return (
							<>
								<div key={index}>{policy}</div>
								{index < 2 && danda}
							</>
						);
					})}
				</div>
			</section>
		</>
	);
}
