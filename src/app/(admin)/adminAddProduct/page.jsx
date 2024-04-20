"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import downloadImg from "@/../public/downloadImg.svg"

const ProductForm = () => {
	const [name, setName] = useState("Apple iPhone 15 (Blue, 128 GB)");
	const [randomNumber, setRandomNumber] = useState("4645756778695");
	const [price, setPrice] = useState(52999);
	const [commission, setCommission] = useState(800);
	const [bank, setBank] = useState("");
	const [website, setWebsite] = useState("");
	const [productLink, setProductLink] = useState("");

	// Send form data to the backend
	async function getData(e) {
		e.preventDefault();
		try {
			const formData = {
				name,
				randomNumber,
				price,
				commission,
				bank,
				website,
				productLink,
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

	const [image, setImage] = useState(null);

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
							"border-radius": "20px",
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
								<Image src={downloadImg} alt="" className="w-9 h-9"/>
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
					{image && (
						<button onClick={handleUpload}>
							Upload
						</button>
					)}
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

			<div className="flex gap-6 mb-6">
				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="bank" className="font-bold">
						Offers available on bank cards
					</label>
					<select
						id="bank"
						value={bank}
						onChange={(e) => setBank(e.target.value)}
						className=" border border-gray-300 rounded-3xl p-4 "
					>
						<option value="">Select a bank</option>
						<option value="icic">ICIC</option>
						<option value="sbi">SBI</option>
					</select>
				</div>

				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="website" className="font-bold">
						Websites
					</label>
					<select
						id="website"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
						className=" border border-gray-300 rounded-3xl p-4 "
					>
						<option value="">Select a website</option>
						<option value="myntra">Myntra</option>
						<option value="flipk">Flipk</option>
					</select>
				</div>
			</div>

			<div className="mb-4 flex flex-col gap-6">
				<label htmlFor="directLink" className="font-bold">
					Direct Links:
				</label>
				<input
					id="directLink"
					type="text"
					value={productLink}
					onChange={(e) => setProductLink(e.target.value)}
					className=" border border-gray-300 rounded-3xl p-4 w-2/4"
					placeholder="Enter direct link"
				/>
			</div>
		</div>
	);
};

export default ProductForm;
