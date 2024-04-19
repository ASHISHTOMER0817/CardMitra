import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";

const productDisplayFormat = ({ children, heading }: { children: ReactNode, heading:string }) => {
	return (
		<div className="flex flex-col mx-auto">
			<div className="flex justify-between gap-5 my-12">
				<h1 className="mr-auto"> {heading}</h1>
				<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={filter} alt={""} />
					<div className="">filter</div>
				</div>
				<div className="border flex justify-center items-center gap-3 rounded-2xl px-3 py-1">
					<Image src={sort} alt={""} />
					<div className="">Sort</div>
				</div>
			</div>
			<div className="grid grid-flow-row gap-7 grid-cols-3">
				{children}
			</div>
		</div>
	);
};

export default productDisplayFormat;
