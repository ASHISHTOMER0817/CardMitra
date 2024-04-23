"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import downloadImg from "@/../public/downloadImg.svg";
import oneCard from "@/../public/oneCard.jpg";
import hdfcCard from "@/../public/hdfcCard.jpg";
import iciciCard from "@/../public/iciciCard.jpg";
import flipkartAxis from "@/../public/flipkart_axis.png";
import sbiCashback from "@/../public/sbi_cashback.webp";
import amazonPay from "@/../public/amazonPay.jpeg";
import amazonLogo from "@/../public/amazonLogo.webp"
import flipkartLogo from "@/../public/flipkartLogo.png"
import sbi from "@/../public/SBI.png"

const ProductForm = () => {
	const [name, setName] = useState("Apple iPhone 15 (Blue, 128 GB)");
	const [randomNumber, setRandomNumber] = useState("4645756778695");
	const [price, setPrice] = useState(52999);
	const [commission, setCommission] = useState(800);
	const [bank, setBank] = useState("");
	const [website, setWebsite] = useState("");
	const [productLink, setProductLink] = useState("");
	const [image, setImage] = useState(null);

	const [isOpen, setIsOpen] = useState(false);
	const [selectedBank, setSelectedBank] = useState("");



	//SITE
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState('');




  const toggleDropdownSite = () => {
	setIsDropDownOpen(!isOpen);
    };
  
    const selectWebsite = (value) => {
	setSelectedWebsite(value);
	setIsDropDownOpen(false);
    };

    // SITE



	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const selectBank = (value) => {
		setSelectedBank(value);
		setIsOpen(false);
	};

	async function getData() {
		try {
			const formData = {
				name,
				// randomNumber,
				price,
				commission,
				selectedBank,
				selectedWebsite,
				productLink,
				image,
			};
			console.log(formData);

			// Replace the following with your backend API call

			const response = await axios.post("addProduct", {
				formData,
			});
			console.log(response.data.message, response.data.success);
		} catch {
			console.log("Something went wrong, please try again later");
		}
	}

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		setImage(URL.createObjectURL(file));
	};

	const handleFileInput = (e) => {
		const file = e.target.files[0];
		setImage(URL.createObjectURL(file));
	};

	const handleUpload = async () => {
		if (!image) return;

		const formData = new FormData();
		formData.append("image", await fetchBlob(image));

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Upload failed");
			}

			console.log("Upload successful");
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	const fetchBlob = async (url) => {
		const response = await fetch(url);
		const blob = await response.blob();
		return blob;
	};

	const banks = [
		{
			value: "",
			label: "Select a bank",
		},
		{
			value: "icici",
			label: (
				<>
					<Image
						src={amazonPay}
						width={20}
						height={20}
						alt="icici"
						className="inline-block mr-2"
					/>
					Amazon pay ICICI
				</>
			),
		},
		{
			value: "sbi",
			label: (
				<>
					<Image
						src={sbi}
						width={20}
						height={20}
						alt="sbi"
						className="inline-block mr-2"
					/>
					SBI Cashback
				</>
			),
		},
		{
			value: "flipkartAxis",
			label: (
				<>
					<Image
						src={flipkartAxis}
						width={20}
						height={20}
						alt="flipkart"
						className="inline-block mr-2"
					/>
					Flipkart Axis
				</>
			),
		},
		{
			value: "hdfc",
			label: (
				<>
					<Image
						src={hdfcCard}
						width={20}
						height={20}
						alt="hdfc"
						className="inline-block mr-2"
					/>
					HDFC
				</>
			),
		},
		{
			value: "icici",
			label: (
				<>
					<Image
						src={iciciCard}
						width={20}
						height={20}
						alt="icici"
						className="inline-block mr-2"
					/>
					ICICI
				</>
			),
		},
		{
			value: "oneCard",
			label: (
				<>
					<Image
						src={oneCard}
						width={20}
						height={20}
						alt="oneCard"
						className="inline-block mr-2"
					/>
					OneCard
				</>
			),
		},
	];



	const websites = [
		{
		  value: '',
		  label: 'Select a website',
		},
		{
		  value: 'myntra',
		  label: (
		    <>
			<Image src={amazonLogo} width={20} height={20} alt="myntra" className="inline-block mr-2" />
			Amazon
		    </>
		  ),
		},
		{
		  value: 'flipkart',
		  label: (
		    <>
			<Image src={flipkartLogo} width={20} height={20} alt="flipkart" className="inline-block mr-2" />
			Flipkart
		    </>
		  ),
		},
	    ];

	return (
		<div className="flex-1 p-8">
			<div className="flex gap-10 mb-8">
				<div>
					<div
						style={{
							width: "300px",
							height: "300px",
							border: "2px dotted #ccc",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							borderRadius: "20px",
						}}
						onDragOver={handleDragOver}
						onDrop={handleDrop}
					>
						{image ? (
							<Image
								src={image}
								alt="Uploaded"
								style={{
									maxWidth: "100%",
									maxHeight: "100%",
								}}
								width={250}
								height={300}
							/>
						) : (
							<>
								<Image
									src={downloadImg}
									alt=""
									className="w-9 h-9"
								/>
								<span>Drag and Drop</span>
								<span>or</span>
								<span>
									Browse Image
									<input
										type="file"
										onChange={
											handleFileInput
										}
										style={{
											display: "none",
										}}
									/>
								</span>
							</>
						)}
					</div>
				</div>
				<div className="">
					<input
						id="price"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className=" outline-none text-2xl font-bold mb-6 mt-4"
					/>
					<div className="">
						<input
							id="price"
							type="text"
							value={randomNumber}
							onChange={(e) =>
								setRandomNumber(e.target.value)
							}
							className=" outline-none text-base font-semibold mb-6"
						/>
					</div>
					<div className="flex items-centergap-7 mb-4 font-normal">
						<div className=" flex flex-col items-start">
							<input
								id="price"
								type="number"
								value={price}
								onChange={(e) =>
									setPrice(e.target.value)
								}
								className=" outline-none px-2 font-semibold text-primaryBgClr py-1"
							/>
							<label
								draggable="true"
								htmlFor="price"
								className=""
							>
								Price{" "}
								<span className="text-gray-300">
									/ Unit:
								</span>
							</label>
						</div>
						<div className="flex-col flex items-start">
							<input
								id="commission"
								type="number"
								value={commission}
								onChange={(e) =>
									setCommission(
										e.target.value
									)
								}
								className="  outline-none font-semibold px-2 py-1"
							/>
							<label
								htmlFor="commission"
								className=""
							>
								Commission:
							</label>
						</div>
					</div>
				</div>
			</div>
			{/* <Image src={sbi} width={20} height={20} alt="icici" /> */}
			<div className="flex gap-6 mb-6">
				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="bank" className="font-bold">
						Offers available on bank cards
					</label>
					{/* <select
						id="bank"
						value={bank}
						onChange={(e) => setBank(e.target.value)}
						className=" border border-gray-300 rounded-full p-4 "
					>
						<option value="">Select a bank</option>
						<option value="icic"> <Image src={sbi} width={20} height={20} alt="icici" />Amazon pay ICIC</option>
						<option value="sbi">SBI Cashback</option>
						<option value="sbi">Flipkart Axis</option>
						<option value="sbi">HDFC</option>
						<option value="sbi">ICICI</option>
						<option value="sbi">OneCard </option>
					</select> */}

					<div className="relative inline-block">
						<button
							className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center"
							onClick={toggleDropdown}
						>
							{selectedBank
								? banks.find(
										(bank) =>
											bank.value ===
											selectedBank
								  )?.label
								: "Select a bank"}
							<svg
								className={`ml-2 transition-transform ${
									isOpen
										? "transform rotate-180"
										: ""
								}`}
								viewBox="0 0 20 20"
								fill="currentColor"
								width="16"
								height="16"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{isOpen && (
							<div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2">
								{banks.map((bank) => (
									<button
										key={bank.value}
										className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
										onClick={() =>
											selectBank(
												bank.value
											)
										}
									>
										{bank.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="website" className="font-bold">
						Websites
					</label>






					<div className="relative inline-block">
						<button
							className="bg-white border border-gray-300 rounded-full px-4 py-2 flex items-center"
							onClick={toggleDropdownSite}
						>
							{selectedWebsite
								? websites.find(
										(website) =>
											website.value ===
											selectedWebsite
								  )?.label
								: "Select a website"}
							<svg
								className={`ml-2 transition-transform ${
									isDropDownOpen
										? "transform rotate-180"
										: ""
								}`}
								viewBox="0 0 20 20"
								fill="currentColor"
								width="16"
								height="16"
							>
								<path
									fillRule="evenodd"
									d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						{isDropDownOpen && (
							<div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-2">
								{websites.map((website) => (
									<button
										key={website.value}
										className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center"
										onClick={() =>
											selectWebsite(
												website.value
											)
										}
									>
										{website.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex justify-between items-end">
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="directLink" className="font-bold">
						Direct Links:
					</label>
					<input
						id="directLink"
						type="text"
						value={productLink}
						onChange={(e) =>
							setProductLink(e.target.value)
						}
						className=" border border-gray-300 rounded-full p-4 w-2/4"
						placeholder="Enter direct link"
					/>
				</div>
				<button
					onClick={getData}
					className="w-64 bg-primaryBgClr p-4 rounded-full"
					type="submit"
				>
					Add Product
				</button>
			</div>
		</div>
	);
};

export default ProductForm;
