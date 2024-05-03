import React, { ReactNode } from "react";
import Image from "next/image";
import filter from "@/../public/Filter.svg";
import sort from "@/../public/sort.svg";
import Header from "./Header";
import Link from "next/link";

const  ProductDisplayFormat = ({ children, heading, Children }: { children: ReactNode, heading:string, Children?:ReactNode }) => {
	return (
		<div className="flex flex-col mx-auto">
			<Header heading={heading} Children={Children}/>
			<div className="grid grid-flow-row gap-7 grid-cols-3">
				{children}
			</div>
		</div>
	);
};

export default  ProductDisplayFormat;
