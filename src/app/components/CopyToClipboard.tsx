import React, { useRef } from "react";
import Image from "next/image";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { MdCopyAll } from "react-icons/md";
import Popup from "./Popup";

const CopyDivToClipboard = ({
	orderId,
	classList,
	stateChange,
}: {
	orderId: string;
	classList?: string;
	stateChange?: () => void;
}) => {
	const divRef = useRef<HTMLDivElement>(null);

	const copyToClipboard = () => {
		const text = divRef.current?.textContent;
		if (text) {
			navigator.clipboard
				.writeText(text)
				.then(() => {
					// alert(`Copied the text: ${text}`);
					Popup("info", `Copied successfully`, 700);
					// stateChange();
				})
				.catch((err) => {
					console.error("Failed to copy: ", err);
				});
		}
	};

	return (
		<div className={`text-xs ${classList}`}>
			<div className="text-red-500 font-serif flex justify-center items-center gap-1 mb-1">
				<IoMdInformationCircleOutline className="float-left w-6 h-6" />
				<div>Copy ID before proceeding</div>
			</div>
			<div
				className="flex justify-center items-center gap-1 cursor-pointer "
				onClick={copyToClipboard}
			>
				<div
					className="text-gray-500 rounded-full px-4 py-3 outline-none w-full"
					ref={divRef}
					style={{
						// padding: "10px",
						border: "1px solid #ccc",
						display: "inline-block",
						// marginBottom: "10px",
					}}
				>
					{orderId}
				</div>
				{/* <button >Copy text</button> */}
				<MdCopyAll className="w-5 h-5" />
			</div>
		</div>
	);
};

export default CopyDivToClipboard;
