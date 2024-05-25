import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.svg";
const Header = () => {
	const navbar = ["Home", "Features", "About Us", "Contact Us"];
	return (
		<div className="grid grid-rows-1 justify-between items-center grid-flow-col my-7 px-16 sm:gap-6 sm:justify-center ">
			{" "}
			<Link href={"/"} className="sm:w-8 sm:h-auto">
				<Image src={Logo} alt={"Logo"} className=""></Image>
			</Link>{" "}
			<ul className="font-medium text-gray-400  flex gap-x-20 sm:text-nowrap sm:text-[10px] sm:gap-3">
				{navbar.map((e, index) => {
					return (
						<li
							key={index}
							className="hover:text-black cursor-pointer focus:text-black hover:font-semibold transition-all"
						>
							{e}
						</li>
					);
				})}
			</ul>
			<div className="sm:text-nowrap sm:flex sm:text-[10px] sm:justify-center sm:items-center sm:gap-2 ">
				<Link
					className="px-6 py-3 mr-4 rounded-3xl font-semibold border-black border hover:bg-gray-100 hover:text-gray-600 sm:py-0 sm:mr-0 sm:px-[10px]"
					href={"/Auth/login"}
				>
					Login
				</Link>
				<Link
					className="bg-primaryBgClr text-white px-6 py-3 font-semibold rounded-3xl hover:text-gray-300 sm:px-[10px] sm:py-0"
					href={"/Auth/signup"}
				>
					Sign Up
				</Link>
			</div>
		</div>
	);
};

export default Header;
