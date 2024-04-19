'use client'
import React, { useState, useEffect } from "react";

const ProductForm = () => {
	const [name, setName] = useState("");
	const [randomNumber, setRandomNumber] = useState("");
	const [price, setPrice] = useState(0);
	const [commission, setCommission] = useState(0);
	const [bank, setBank] = useState("");
	const [website, setWebsite] = useState("");
	const [directLink, setDirectLink] = useState("");

	useEffect(() => {
		// Send form data to the backend
		const formData = {
			name,
			randomNumber,
			price,
			commission,
			bank,
			website,
			directLink,
		};
		// Replace the following with your backend API call
		console.log(formData);
	}, [name, randomNumber, price, commission, bank, website, directLink]);

	return (
		<div className="flex">
			{/* Leave space for sidebar */}
			<div className=" bg-gray-200 h-screen"></div>

			<div className="flex-1 p-8">
				<h2 className="text-2xl font-bold mb-4">{name}</h2>
				<div className="text-xl mb-2">{randomNumber}</div>
				<div className="flex items-center mb-4">
					<div className="mr-4">
						<label
							htmlFor="price"
							className="font-bold"
						>
							Price / Unit:
						</label>
						<input
							id="price"
							type="number"
							value={price}
							onChange={(e) =>
								setPrice(e.target.value)
							}
							className="ml-2 border border-gray-300 rounded px-2 py-1"
						/>
					</div>
					<div>
						<label
							htmlFor="commission"
							className="font-bold"
						>
							Commission:
						</label>
						<input
							id="commission"
							type="number"
							value={commission}
							onChange={(e) =>
								setCommission(e.target.value)
							}
							className="ml-2 border border-gray-300 rounded px-2 py-1"
						/>
					</div>
				</div>

				<div className="mb-4">
					<label htmlFor="bank" className="font-bold">
						Offers available on bank cards:
					</label>
					<select
						id="bank"
						value={bank}
						onChange={(e) => setBank(e.target.value)}
						className="ml-2 border border-gray-300 rounded px-2 py-1"
					>
						<option value="">Select a bank</option>
						<option value="icic">ICIC</option>
						<option value="sbi">SBI</option>
					</select>
				</div>

				<div className="mb-4">
					<label htmlFor="website" className="font-bold">
						Websites:
					</label>
					<select
						id="website"
						value={website}
						onChange={(e) => setWebsite(e.target.value)}
						className="ml-2 border border-gray-300 rounded px-2 py-1"
					>
						<option value="">Select a website</option>
						<option value="myntra">Myntra</option>
						<option value="flipk">Flipk</option>
					</select>
				</div>

				<div className="mb-4">
					<label htmlFor="directLink" className="font-bold">
						Direct Links:
					</label>
					<input
						id="directLink"
						type="text"
						value={directLink}
						onChange={(e) =>
							setDirectLink(e.target.value)
						}
						className="ml-2 border border-gray-300 rounded px-2 py-1 w-full"
						placeholder="Enter direct link"
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductForm;
