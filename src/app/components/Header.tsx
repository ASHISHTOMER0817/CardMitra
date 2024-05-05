import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";

const Header = ({
	heading,
	Children,
}: {
	heading: string;
	Children?: ReactNode;
}) => {
	return (
		<>
			<div className="flex justify-between w-full items-center gap-5 my-12 mr-auto">
				<h1 className=""> {heading}</h1>
				{Children}
			</div>
		</>
	);
};

export default Header;
