import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";

const Header = ({ heading, Children }: { heading: string, Children?:ReactNode }) => {
	return (
		<>
			<div className="flex justify-between gap-5 my-12 mr-auto">
				<h1 className=""> {heading}</h1>
				{/* <div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={filter} alt={""} />
					<div className="">filter</div>
				</div>
				<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={sort} alt={""} />
					<div className="">Sort</div>
				</div> */}
				{Children}
			</div>
		</>
	);
};

export default Header;
