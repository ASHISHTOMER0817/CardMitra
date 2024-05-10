"use client";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import downloadImg from "@/../public/downloadImg.svg";
import Select, { MultiValue } from "react-select";
// import oneCard from "@/../public/oneCard.jpg";
// import hdfcCard from "@/../public/hdfcCard.jpg";
// import iciciCard from "@/../public/iciciCard.jpg";
// import flipkartAxis from "@/../public/flipkart_axis.png";
// import sbiCashback from "@/../public/sbi_cashback.webp";
// import amazonPay from "@/../public/amazonPay.jpeg";
// import amazonLogo from "@/../public/amazonLogo.webp"
// import flipkartLogo from "@/../public/flipkartLogo.png"
// import sbi from "@/../public/SBI.png"
import Dropdown, { customStyles } from "@/app/components/dropdown";
import Popup from "@/app/components/Popup";
import productList from "@/interface/productList";
import { RxCross1 } from "react-icons/rx";

export interface dropdown {
	value: string;
	label: string;
}
const ProductForm = ({ params }: { params: { _id: string } }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [commission, setCommission] = useState(0);
	const [cards, setCards] = useState<dropdown[]>([]);
	const [site, setSite] = useState<dropdown>();
	const [productLink, setProductLink] = useState("");
	const [image, setImage] = useState("");
	const [file, setFile] = useState<File>();
	const [requirement, setRequirement] = useState<number>(0);
	const [address, setAddress] = useState("");
	const [info, setInfo] = useState({
		first: "",
		second: "",
		third: "",
		fourth: "",
	});

	// Cards Array
	const cardOptions: dropdown[] = [
		{ value: "Amazon pay icici", label: "Amazon pay icici" },
		{ value: "flipkart axis", label: "flipkart axis" },
		{ value: "SBI cashback", label: "SBI cashback" },
	];

	//Site Array
	const siteOptions: dropdown[] = [
		{ value: "Amazon", label: "Amazon" },
		{ value: "Flipkart", label: "Flipkart" },
		{ value: "Mi App", label: "Mi App" },
	];

	// const [cardsArr, setCardsArr] = useState<string[]>();
	console.log(cards);
	// const [arr, setArr] = useState<string[]>([]);
	// const [visible, setVisible] = useState(false);

	//function to set Site
	const handleDropdownChangeSite = (option: dropdown) => {
		setSite(option);
	};

	useEffect(() => {
		async function getData() {
			try {
				if (params._id !== "newProduct") {
					const response = await axios.get(
						`/api/admin/addProduct?_id=${params?._id}`
					);
					console.log(params._id);
					const product: productList = await response.data
						.data;
					setName(product.name);
					setPrice(product.price);
					setCommission(product.commission);
					setProductLink(product.productLink);
					setRequirement(product.requirement);
					setAddress(product.address);
					setInfo({ ...info, first: product.info.first });
					setInfo({ ...info, second: product.info.second });
					setInfo({ ...info, third: product.info.third });
					setInfo({ ...info, fourth: product.info.fourth });
				}
				return;
			} catch {
				Popup("error", "something went wrong");
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?._id]);

	//SEND DATA TO BACKEND
	async function postData() {
		// e.preventDefault();
		try {
			cards.entries;

			// Creating a formData instance
			const formData = new FormData();
			console.log(image);
			formData.append("name", name);
			formData.append("commission", commission.toString());
			formData.append("productLink", productLink);
			formData.append("price", price.toString());
			formData.append("requirement", requirement.toString());
			formData.append("address", address);

			formData.append("card", JSON.stringify(cards));
			formData.append("site", site?.label!);
			formData.append("file", file!);
			formData.append("info", JSON.stringify(info));

			// const group = {formData, name}
			const response = await axios.post(
				"/api/admin/addProduct",
				formData
			);
			console.log(response);
			// if (response.data) {
			// 	Popup("success", "Product added successfully");
			// }
		} catch (error: any) {
			Popup(
				"error",
				"Something went wrong, please try again later"
			);
			console.log("Something went wrong, please try again later");
		}
	}

	const handleChange = (selectedOptions: any) => {
		setCards(selectedOptions);
	};

	return (
		<form onSubmit={postData} className="w-[90%] p-8">
			<div className="flex gap-10 mb-8">
				<label htmlFor="image">
					{image ? (
						<>
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
							<input
								required
								type="file"
								name="file"
								className="hidden"
								id="image"
								onChange={({ target }) => {
									if (target.files) {
										const file =
											target
												.files[0];
										console.log(file);
										setImage(
											URL.createObjectURL(
												file
											)
										);
										console.log(
											URL.createObjectURL(
												file
											)
										);
										setFile(file);
									}
								}}
							/>
						</>
					) : (
						<label
							htmlFor="image"
							className="w-60 h-80 border-2 border-dotted border-[#ccc] flex flex-col justify-center items-center rounded-[20px]"
						>
							<Image
								src={downloadImg}
								alt=""
								className="w-9 h-9"
							/>
							{/* <span>Drag and Drop</span>
							<span>or</span> */}
							<span>
								Browse Image
								<input
									required
									type="file"
									name="file"
									className="hidden"
									id="image"
									onChange={({
										target,
									}) => {
										if (target.files) {
											const file =
												target
													.files[0];
											console.log(
												file
											);
											setImage(
												URL.createObjectURL(
													file
												)
											);
											console.log(
												URL.createObjectURL(
													file
												)
											);
											setFile(file);
										}
									}}
								/>
							</span>
						</label>
					)}
				</label>
				<div className="">
					<input
						required
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className=" outline-none border-b border-black text-2xl font-bold mb-6 mt-4"
					/>
					<div className="flex items-center gap-7 mb-4 font-normal">
						<div className=" flex flex-col items-start">
							<input
								required
								id="price"
								type="number"
								value={price}
								onChange={(e) =>
									setPrice(+e.target.value)
								}
								className=" outline-none px-2 border-b border-black font-semibold text-primaryBgClr py-1"
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
								required
								id="commission"
								type="number"
								value={commission}
								onChange={(e) =>
									setCommission(
										+e.target.value
									)
								}
								className="  outline-none border-b border-black font-semibold px-2 py-1"
							/>
							<label
								htmlFor="commission"
								className=""
							>
								Commission:
							</label>
						</div>
					</div>
					<h6 className="text-red-500">
						** Points to remember while Ordering **
					</h6>
					<div className="text-gray-500 flex flex-col gap-5 text-xs">
						<input
							type="text"
							className="border-b border-b-black outline-none mt-8"
							value={info.first}
							onChange={(e) =>
								setInfo({
									...info,
									first: e.target.value,
								})
							}
						/>
						<input
							type="text"
							className="border-b border-b-black outline-none"
							value={info.second}
							onChange={(e) =>
								setInfo({
									...info,
									second: e.target.value,
								})
							}
						/>
						<input
							type="text"
							className="border-b border-b-black outline-none"
							value={info.third}
							onChange={(e) =>
								setInfo({
									...info,
									third: e.target.value,
								})
							}
						/>
						<input
							type="text"
							className="border-b border-b-black outline-none"
							value={info.fourth}
							onChange={(e) =>
								setInfo({
									...info,
									fourth: e.target.value,
								})
							}
						/>
					</div>
				</div>
			</div>
			<div className="flex gap-6 mb-6">
				<div className="mb-4 flex flex-col w-full gap-6">
					<label htmlFor="bank" className="font-bold">
						Offers available on bank cards
					</label>

					<div className="relative inline-block">
						<Select
							defaultValue={[
								cardOptions[1],
								cardOptions[2],
							]}
							isMulti
							name="colors"
							options={cardOptions}
							className="basic-multi-select"
							classNamePrefix="select"
							onChange={handleChange}
							styles={customStyles}
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

			<div className="grid grid-flow-row grid-cols-2 items-end gap-x-6 gap-y-3">
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="directLink" className="font-bold">
						Direct Links:
					</label>
					<input
						required
						id="directLink"
						type="text"
						value={productLink}
						onChange={(e) =>
							setProductLink(e.target.value)
						}
						className=" border border-gray-300 rounded-full p-2 w-full"
						placeholder="Enter direct link"
					/>
				</div>
				<div className=" flex flex-col w-full gap-6">
					<label
						htmlFor="requirement"
						className="font-bold"
					>
						Requirement:
					</label>
					<input
						required
						id="requirement"
						type="number"
						value={requirement}
						onChange={(e) =>
							setRequirement(+e.target.value)
						}
						className=" border border-gray-300 rounded-full p-2 w-full"
						placeholder="Requirement"
					/>
				</div>
				<div className=" flex flex-col w-full gap-6">
					<label htmlFor="address" className="font-bold">
						Address:
					</label>
					<input
						required
						id="address"
						type="text"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						className=" border border-gray-300 rounded-full p-2 w-full"
						placeholder="Enter Address"
					/>
				</div>
				<button
					className="w-64 p-2 text-white bg-primaryBgClr rounded-full"
					type="submit"
				>
					Add Product
				</button>
			</div>
		</form>
	);
};

export default ProductForm;
