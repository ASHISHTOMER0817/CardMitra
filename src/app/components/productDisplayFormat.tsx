import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Header from "./Header";

const  ProductDisplayFormat = ({ children, heading }: { children: ReactNode, heading:string }) => {
	return (
		<div className="flex flex-col mx-auto">
			<Header heading={heading}/>
			<div className="grid grid-flow-row gap-7 grid-cols-3">
				{children}
			</div>
		</div>
	);
};

export default  ProductDisplayFormat;
