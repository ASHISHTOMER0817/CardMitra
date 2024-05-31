import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.svg";
const Header = () => {
	// const navbar = ["Home", "About Us", "Features", "Testimonials", "Contact Us"];
	const navbar = {
		Home: "",
		"About Us": "#aboutUs",
		Features: "#ourFeatures",
		Testimonails: "#testimonials",
		"Contact Us": "#contactUs",
	};
	return (
		<div className="flex items-center mx-4 my-4 mb-1">
			{" "}
			{/* className="grid  grid-rows-1 justify-between items-center grid-flow-col my-7 px-16 sm:gap-2 sm:justify-center " */}
			<Link href={"/"} className="sm:w-8 sm:h-auto">
				<Image src={Logo} alt={"Logo"} className=""></Image>
			</Link>{" "}
			<ul className="font-medium text-gray-400 mx-auto header-items">
				{Object.entries(navbar).map(([key, value]) => {
					return (
						<li
							key={key}
							className="hover:text-black cursor-pointer focus:text-black hover:font-semibold transition-all"
						>
							<a href={value}>{key}</a>
						</li>
					);
				})}
			</ul>
			<Link
				className="button button-primary font-bold me-3 login-button"
				href={"/Auth/login"}
			>
				Login
			</Link>
			<Link className="button font-bold" href={"/Auth/signup"}>
				Sign Up
			</Link>
		</div>
	);
};

export default Header;
