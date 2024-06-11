import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";

const Header = ({
	heading,
	Children,
	className,
}: {
	heading: string;
	Children?: ReactNode;
	className?: string;
}) => {
	return (
		<>
			<div
				className={`flex justify-between w-full items-center gap-5 mb-8 mr-auto sm:flex-col ${className}`}
			>
				<h3 className="font-semibold sm:self-start">
					{" "}
					{heading}
				</h3>
				{Children}
			</div>
		</>
	);
};

export default Header;
