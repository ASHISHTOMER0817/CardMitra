import React from "react";

const StatusBadge = ({
	status,
	paid,
}: {
	status: string;
	paid?: null | Date;
}) => {
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
			className={`mx-auto rounded-full px-4 py-1 sm:text-[8px] sm:mt-2 sm:py-0 ${bgColor} ${textColor}`}
		>
			{paid
				? `paid on - ${new Date(paid).getDate()}-${new Date(
						paid
				  ).getMonth()}`
				: status}
		</div>
	);
};

export default StatusBadge;
