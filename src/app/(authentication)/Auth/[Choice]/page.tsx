"use client";
import React from "react";
import LoginAuth from "@/app/components/LoginAuth";
import SignUpAuth from "@/app/components/SignUpAuth";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/logo.svg";

const Page = () => {
	const params = useParams();
	const choice = params.Choice as string;

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<Link href="/" className="flex items-center space-x-2">
							<Image src={logo} alt="CardMitra Logo" width={32} height={32} />
							<span className="text-xl font-bold text-primaryBgClr">CardMitra</span>
						</Link>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
				<div className="w-full max-w-md">
					{choice === "login" ? <LoginAuth /> : <SignUpAuth />}
				</div>
			</main>
		</div>
	);
};

export default Page;
