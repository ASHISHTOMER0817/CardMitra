import React from "react";
import Image from "next/image";
import arrowLeft from "@/../public/ArrowLeft.svg";
import { useRouter } from "next/navigation";
const BackwardButton = () => {
	const router = useRouter();

	function backward() {
		router.back();
	}
	return (
		<Image
			onClick={backward}
			className="mb-6 w-6 h-6 cursor-pointer"
			src={arrowLeft}
			alt={""}
		/>
	);
};

export default BackwardButton;
