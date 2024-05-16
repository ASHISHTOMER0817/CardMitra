import React from "react";
import Image from "next/image";
import arrowLeft from "@/../public/ArrowLeft.svg";
import { useRouter } from "next/navigation";
const BackwardButton = ({ pageType }: { pageType?: string }) => {
	const router = useRouter();

	function backward() {
		if (pageType=== 'homePage') {
			router.push("/");
			return;
		}
		router.back();
	}
	return (
		<Image
			onClick={backward}
			className={`mb-6 w-6 h-6 cursor-pointer sm:mb-1 rounded-full active:bg-gray-100`} 
			src={arrowLeft}
			alt={""}
		/>
	);
};

export default BackwardButton;
