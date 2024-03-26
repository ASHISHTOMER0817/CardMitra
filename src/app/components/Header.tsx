import React from "react";
import Image from "next/image";
import Link from "next/link";
const Header = () => {
	return (
		<div className="grid grid-rows-1 grid-flow-col gap-x-8 my-7">
			{" "}
			<Link href={"/"}>
				<Image src={"logo"} alt={"Logo"}></Image>
			</Link>{" "}
			<ul className="font-semibold flex gap-x-3">
				<li>Home</li>
				<li>Features</li>
				<li>About Us</li>
				<li>Contact Us</li>
			</ul>
			<div>
				<button className="px-6 py-3">Login</button>
				<button className="primaryBgClr px-6 py-3">Sign Up</button>
			</div>
		</div>
	);
};

export default Header;
