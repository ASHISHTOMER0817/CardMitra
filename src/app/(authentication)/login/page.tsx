"use client";
import BackwardButton from "@/app/components/BackwardButton";
import LoginAuth from "@/app/components/LoginAuth";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import productList from "@/interface/productList";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const Page = () => {
	const [data, setData] = useState<productList>();

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.get("/api/users/practice");
				console.log(response.data.data.image);
				setData(response.data.data);
			} catch {
				console.log("slkdfkjgh");
			}
		}
		getData();
	}, []);
	return (
		<div className="flex flex-col lg:flex-row justify-center items-center min-h-screen p-4 lg:p-8">
			<section className="w-full lg:w-1/2 max-w-md mb-8 lg:mb-0 lg:mr-8">
				<BackwardButton pageType="homePage" />
				<h5 className="text-primaryBgClr mt-4">
					WELCOME BACK!{" "}
				</h5>
				<h1 className="text-3xl font-semibold mt-2">Login </h1>
				<p className="text-gray-400 font-medium mt-2 max-w-xs">
					Access your account effortlessly and pick up right
					where you left off{" "}
				</p>
			</section>
			{data?.name}

			<Dialog>
				<DialogTrigger>Open</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Are you absolutely sure?
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This
							will permanently delete your account
							and remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>

			<section className="w-full lg:w-1/2 max-w-md">
				<LoginAuth />{" "}
			</section>
		</div>
	);
};

export default Page;
