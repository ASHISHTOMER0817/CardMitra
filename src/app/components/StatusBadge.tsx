import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
	let bgColor, textColor;

	switch (status) {
		case "delivered":
			bgColor = "bg-green-200";
			textColor = "text-green-800";
			break;
		case "undelivered":
			bgColor = "bg-red-200";
			textColor = "text-red-800";
			break;
		case "wrong OTP":
			bgColor = "bg-[#F5EFC4]";
			textColor = "text-yellow-800";
			break;
		case "OTP submitted":
			bgColor = "bg-blue-200";
			textColor = "text-blue-800";
			break;
		case "cancelled":
			bgColor = "bg-gray-200";
			textColor = "text-gray-800";
			break;
		default:
			bgColor = "bg-gray-200";
			textColor = "text-gray-800";
	}

	return (
		<div
			className={`mx-auto rounded-full px-2 py-0.5 sm:text-[10px] sm:mr-2 ${bgColor} ${textColor}`}
		>
			{status}
		</div>
	);
};

export default StatusBadge;
