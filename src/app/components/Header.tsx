import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/../public/logo.svg"
const Header = () => {
	const navbar = ['Home', 'Features', 'About Us', 'Contact Us']
	return (
		<div className="grid grid-rows-1 justify-between items-center grid-flow-col my-7 px-16 ">
			{" "}
			<Link href={"/"}>
				<Image src={Logo} alt={"Logo"}></Image>
			</Link>{" "}
			<ul className="font-medium text-gray-400  flex gap-x-36">
				{navbar.map((e, index)=>{
					return (
						<li key={index} className="hover:text-black hover:underline-offset-2 hover:underline focus:text-black hover:font-semibold transition-all">{e}</li>
					)
				})}
				
			</ul>
			<div>
				<Link className="px-6 py-3 mr-4 rounded-3xl font-semibold border-black border hover:bg-gray-100 hover:text-gray-600" href={"/login/login"}>Login</Link>
				<Link className="bg-primaryBgClr text-white px-6 py-3 font-semibold rounded-3xl hover:text-gray-300" href={"/login/signup"}>Sign Up</Link>
			</div>
		</div>
	);
};

export default Header;
