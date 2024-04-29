'use client'
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import downloadImg from "@/../public/downloadImg.svg";
// import oneCard from "@/../public/oneCard.jpg";
// import hdfcCard from "@/../public/hdfcCard.jpg";
// import iciciCard from "@/../public/iciciCard.jpg";
// import flipkartAxis from "@/../public/flipkart_axis.png";
// import sbiCashback from "@/../public/sbi_cashback.webp";
// import amazonPay from "@/../public/amazonPay.jpeg";
// import amazonLogo from "@/../public/amazonLogo.webp"
// import flipkartLogo from "@/../public/flipkartLogo.png"
// import sbi from "@/../public/SBI.png"
import Dropdown from "@/app/components/dropdown";
import Popup from "@/app/components/Popup";

export interface dropdown{
	value:string,
	label:string
}
const ProductForm = () => {
	const [name, setName] = useState("Apple iPhone 15 (Blue, 128 GB)");
	const [randomNumber, setRandomNumber] = useState("4645756778695");
	const [price, setPrice] = useState(52999);
	const [commission, setCommission] = useState(800);
	const [cards, setCards] = useState<dropdown>();
	const [site, setSite] = useState<dropdown>();
	const [productLink, setProductLink] = useState("");
	const [image, setImage] = useState("");
	const [requirement, setRequirement] = useState<number>()
	const [address, setAddress] = useState("")

	//function to set Card
	const handleDropdownChangeCard = (option:dropdown) => {
		setCards(option);
	};

	//function to set Site
	const handleDropdownChangeSite = (option:dropdown) => {
		setSite(option);
	};

	//  LABEL IN CONSOLE
	console.log(cards?.label);
	console.log(site?.label);

	// CONVERT IMAGE TO BASE 64
	function convertToBase64(e: any) {
		console.log(e);
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			if (reader.result !== null) {
				console.log(reader.result);
				setImage(reader.result.toString()); // Convert reader.result to string
			    } else {
				console.log("Reader result is null");
			    }
		};
		reader.onerror = (error) => {
			console.log("error", error);
		};
	}
	//SEND DATA TO BACKEND
	async function postData() {
		// e.preventDefault()
		try {
			const formData = {
				name,
				price,
				commission,
				cards:cards?.value,
				site:site?.value,
				productLink,
				image,
				address, 
				requirement
			};
			console.log(formData);

			const response = await axios.post("/api/admin/addProduct", {
				formData
			});
			if(response.data.success){
				Popup("success", "Product added successfully")
			}
			console.log(response.data.message, response.data.success);
		} catch {
			Popup("error", 'Something went wrong, please try again later')
			console.log("Something went wrong, please try again later");
		}
	}

	// Cards Array
	const cardOptions:dropdown[] = [
		{ value: "Amazon pay icici", label: "Amazon pay icici" },
		{ value: "flipkart axis", label: "flipkart axis" },
		{ value: "SBI cashback", label: "SBI cashback" },
	];


	//Site Array
	const siteOptions:dropdown[] = [
		{ value: "Amazon", label: "Amazon" },
		{ value: "Flipkart", label: "Flipkart" },
		{ value: "Mi App", label: "Mi App" },
	];

	return (
		<div className="w-[90%] p-8">
			<div className="flex gap-10 mb-8">
				<div>
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
							// onDragOver={handleDragOver}
							// onDrop={handleDrop}
						>
							<Image
								src={downloadImg}
								alt=""
								className="w-9 h-9"
							/>
							<span>Drag and Drop</span>
							<span>or</span>
							<span>
								Browse Image
								{/* <input
											type="file"
											
											style={{
												display: "none",
											}}
										/> */}
							</span>
						</div>
					)}

					<input required
						type="file"
						accept="image/*"
						onChange={convertToBase64}
						// value={image}
					/>
				</div>
				<div className="">
					<input required
						id="price"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className=" outline-none text-2xl font-bold mb-6 mt-4"
					/>
					<div className="">
						<input required
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
							<input required
								id="price"
								type="number"
								value={price}
								onChange={(e) =>
									setPrice(+e.target.value)
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
							<input required
								id="commission"
								type="number"
								value={commission}
								onChange={(e) =>
									setCommission(
										+e.target.value
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

					<div className="relative inline-block">
						<Dropdown
							options={cardOptions}
							onChange={handleDropdownChangeCard}
						/>
					</div>
				</div>

				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="website" className="font-bold">
						Websites
					</label>

					<div className="relative inline-block">
						<Dropdown
							options={siteOptions}
							onChange={handleDropdownChangeSite}
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-flow-row grid-cols-2 items-end gap-y-3">
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="directLink" className="font-bold">
						Direct Links:
					</label>
					<input required
						id="directLink"
						type="text"
						value={productLink}
						onChange={(e) =>
							setProductLink(e.target.value)
						}
						className=" border border-gray-300 rounded-full p-4 w-[59%]"
						placeholder="Enter direct link"
					/>
				</div>
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="requirement" className="font-bold">
						Requirement:
					</label>
					<input required
						id="requirement"
						type="number"
						value={requirement}
						onChange={(e) =>
							setRequirement(+e.target.value)
						}
						className=" border border-gray-300 rounded-full p-4 w-[59%]"
						placeholder="Requirement"
					/>
				</div>
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="address" className="font-bold">
						Address:
					</label>
					<input required
						id="address"
						type="text"
						value={address}
						onChange={(e) =>
							setAddress(e.target.value)
						}
						className=" border border-gray-300 rounded-full p-4 w-[59%]"
						placeholder="Enter Address"
					/>
				</div>
				<div
					onClick={postData}
					className="w-64 text-white bg-primaryBgClr p-1 rounded-full"
					// type="submit"
				>
					Add Product
				</div>
			</div>
		</div>
	);
};

export default ProductForm;
