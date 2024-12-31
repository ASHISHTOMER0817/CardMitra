"use client";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import downloadImg from "@/../public/downloadImg.svg";
import Select from "react-select";

import Dropdown, { defaultStyles } from "@/app/components/dropdown";
import Popup from "@/app/components/Popup";
import productList, { SpecialQuantity, user } from "@/interface/productList";
import Loader from "@/app/components/loader";
import { useRouter } from "next/navigation";
import { RxCross1 } from "react-icons/rx";
import { IoAddSharp } from "react-icons/io5";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogClose,
} from "@/components/ui/dialog";

export interface dropdown {
	value: string;
	label: string;
	
}
const ProductForm = ({ params }: { params: { _id: string } }) => {
	const [name, setName] = useState("");
	const [price, setPrice] = useState<number>();
	const [commission, setCommission] = useState<number>();
	const [cards, setCards] = useState<dropdown[]>([]);
	const [site, setSite] = useState<dropdown>();
	const [collaborator, setCollaborator] = useState<dropdown>();
	const [productLink, setProductLink] = useState("");
	const [image, setImage] = useState<any>();
	const [file, setFile] = useState<File>();
	const [requirement, setRequirement] = useState<number>();
	const [address, setAddress] = useState("");
	const [info, setInfo] = useState({
		first: "",
		second: "",
		third: "",
		fourth: "",
	});
	const [zipCode, setZipCode] = useState("");
	const [loader, setLoader] = useState(false);
	const router = useRouter();
	const [siteOptions, setSiteOptions] = useState<dropdown[]>([]);
	const [cardOptions, setCardOptions] = useState<dropdown[]>([]);
	const [collaboratorOptions, setCollaboratorOption] = useState<dropdown[]>([]);
	const [addOption, setAddOption] = useState("");
	const [optionName, setOptionName] = useState("");
	const [optionFile, setOptionFile] = useState<File>();
	const [updateOptions, setUpdateOptions] = useState(false);
	const [existingImg, setExistingImage] = useState("");
	const [buttonClick, setButtonClick] = useState(false);
	const [returnAmt, setReturnAmt] = useState<number>();

	const [specialQuantity, setSpecialQuantity] = useState<number>();
	const [specialUser, setSpecialUser] = useState("");
	const [allSpecialUsers, setAllSpecialUsers] = useState<user[]>([]);
	const [specialUserId, setSpecialUserId] = useState<string>();

	const [special, setSpecials] = useState<SpecialQuantity[]>([]);

	const [usersVsibile, setUsersVisible] = useState<boolean>(false);


	//function to set Site
	const handleDropdownChangeSite: any = (option: dropdown) => {
		setSite(option);
	};

	//function to set Site
	const handleDropdownChangeCollaborator: any = (option: dropdown) => {
		console.log('inside function');
		setCollaborator(option);
	};

	// Function to set Cards
	const handleChange = (selectedOptions: any) => {
		setCards(selectedOptions);
	};

	// Edit a existing product
	useEffect(() => {
		async function getData() {
			try {
				if (params._id !== "newProduct") {
					setLoader(true);
					const response = await axios.get(
						`/api/orders/products?productId=${params?._id}`
					);
					const product: productList = await response.data
						.data;
					setImage(
						`data:image/jpg;base64,${product.image}`
					);
					setExistingImage(
						`data:image/jpg;base64,${product.image}`
					);
					setName(product.name);
					setPrice(product.price);
					setCommission(product.commission);
					setProductLink(product.productLink);
					setRequirement(product.requirement);
					setAddress(product.address);
					setInfo({
						...info,
						first: product.info.first,
						second: product.info.second,
						third: product.info.third,
						fourth: product.info.fourth,
					});

					setCards(product.cards);
					setSite(product.site);
					setZipCode(product.zipCode);
					setReturnAmt(product.returnAmount);
					setLoader(false);
				}
				return;
			} catch {
				Popup("error", "something went wrong");
				setLoader(false);
			}
		}
		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params?._id]);

	useEffect(() => {
		async function getDate() {
			try {
				const response = await axios.get("/api/admin/options");
				setCardOptions(response.data.data.cards);
				setSiteOptions(response.data.data.sites);
				setCollaboratorOption(response.data.data.collaborators);
				if (response.data.success !== true) {
					Popup("error", "server error, please refresh");
				}
			} catch {
				Popup("error", "server error, please refresh");
			}
		}
		getDate();
	}, [updateOptions]);

	useEffect(() => {
        setReturnAmt((price || 0) + (commission || 0));
    }, [price, commission]);

	async function AddOption(option: string) {
		try {
			const optionObject = JSON.stringify({
				value: option,
				label: option,
			});
			const formData = new FormData();
			formData.append("optionName", optionObject);

			// if (addOption === "site") {
			formData.append("file", optionFile!);
			// }
			formData.append("addOption", addOption);
			const response = await axios.post(
				"/api/admin/addProduct?query=option",
				formData
			);

			if (response.data.success !== true) {
				Popup("error", "server error, please refresh");
			} else if (response.data.success) {
				Popup("success", response.data.message);
				setUpdateOptions(!updateOptions);
			}
		} catch {
			Popup("error", "server error, please refresh");
		}
	}

	//SEND DATA TO BACKEND
	async function postData(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			setButtonClick(true)
			// Creating a formData instance
			const formData = new FormData();

			formData.append("name", name);
			formData.append("commission", commission!.toString());
			formData.append("productLink", productLink);
			formData.append("price", price!.toString());
			formData.append("requirement", requirement!.toString());
			formData.append("address", address);
			formData.append(
				"returnAmt",
				(returnAmt ? returnAmt : 0).toString()
			);
			formData.append("card", JSON.stringify(cards));
			formData.append("site", JSON.stringify(site));
			formData.append("collaborator", JSON.stringify(collaborator));
			if (file) {
				formData.append("file", file);
			} else {
				formData.append("existingImg", existingImg);
			}

			formData.append("info", JSON.stringify(info));

			formData.append("zipCode", zipCode);
			formData.append("productId", params._id)
			// console.log(formData.get("returnAmt"));
			const response = await axios.post(
				`/api/admin/addProduct?query=newProduct`,
				formData
			);

			// console.log(response);
			if (response.data.success) {

				Popup("success", response.data.message);
				router.back();
			} else {
				setButtonClick(false)
				Popup("error", response.data.message);
			}
		} catch (error: any) {
			setButtonClick(false)
			Popup("error", "Something went wrong, try again later");
		}
	}

	// handle Droped Images
	const handleDrop = (event: any) => {
		event.preventDefault();
		const { files } = event.dataTransfer;
		if (files && files[0]) {
			const droppedFile = files[0];
			setImage(URL.createObjectURL(droppedFile));
			setFile(droppedFile);
		}
	};

	const handleDragOver = (event: any) => {
		event.preventDefault();
	};

	
	async function onSpecialRequestSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			
			const formData = {
				user: specialUserId,
				quantity: specialQuantity,
				product: params._id,
			};

			const response = await axios.post(
				`/api/admin/addSpecial`,
				formData
			);

			// console.log(response);
			if (response.data.success) {

				Popup("success", response.data.message);
				fetchSpecials();
				// router.back();
			} else {
				
				Popup("error", response.data.message);
			}
		} catch (error: any) {
			
			Popup("error", "Something went wrong, try again later");
		}
	}
	

	useEffect(()=>{
		
		async function fetchUsers(){
			try {
				const response = await axios.get(`/api/admin/allUsers?q=${specialUser}`);
				setAllSpecialUsers(response.data.users);
				
				if (response.data.success !== true) {
					Popup("error", "server error, please refresh");
				}
			} catch {
				Popup("error", "server error, please refresh");
			}
		}

		fetchUsers();
		
	}, [specialUser]);

	
	async function fetchSpecials(){
		try {
			const response = await axios.get(`/api/admin/getSpecialQuantity?product=${params._id}`);

			console.log('res data: ', response.data.data);
			setSpecials(response.data.data);
			
			if (response.data.success !== true) {
				Popup("error", "server error, please refresh");
			}
		} catch {
			Popup("error", "server error, please refresh");
		}
	}

	useEffect(()=>{

		fetchSpecials();
		
	}, []);

	const onUserClick = (usr: user) =>{
		setSpecialUser(usr.name);
		setSpecialUserId(usr._id);
		setUsersVisible(false);
	}

	const onSpecialDelete = async (id: string) =>{
		try {
			const response = await axios.post(`/api/admin/deleteSpecialQuantity`, {id});

			if(response.data.success){	
				Popup("success", "Deleted successfully");
				fetchSpecials();
			}
			
			if (response.data.success !== true) {
				Popup("error", "server error, please refresh");
			}
		} catch {
			Popup("error", "server error, please refresh");
		}
	}


	return (
		<Dialog>
			<form onSubmit={postData} className="p-8 sm:px-0">
				{loader ? (
					<Loader />
				) : (
					<>
						
						{/* <DialogTrigger>Open</DialogTrigger> */}
						<DialogContent>
							<DialogHeader>
								<DialogTitle>
									{" "}
									Write, {
										addOption
									}{" "}
									name you want to add
								</DialogTitle>
								{/* <DialogDescription>
								</DialogDescription> */}
							</DialogHeader>
							<input
								type="text"
								placeholder={`${
									addOption === "site"
										? "Site Name"
										: "Card name"
								}`}
								className="outline-none border-b pb-2 border-black sm:text-xs"
								value={optionName}
								onChange={(e) =>
									setOptionName(
										e.target.value
									)
								}
							/>{" "}
							<input
								type="file"
								placeholder={`${
									addOption === "site"
										? "Site Image"
										: "Card Image"
								}`}
								className={`outline-none border-b pb-2 border-black sm:text-xs `}
								onChange={({
									target,
								}) => {
									if (target.files) {
										setOptionFile(
											target
												.files[0]
										);
									}
								}}
							/>{" "}
							<DialogFooter className=" gap-3">
								<DialogClose className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50">
									Cancel
								</DialogClose>
								<DialogClose
									className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50"
									onClick={() => {
										optionName &&
											AddOption(
												optionName
											);
									}}
								>
									Add
								</DialogClose>
							</DialogFooter>
						</DialogContent>
	
						<div className="flex gap-10 mb-8 sm:flex-col sm:mb-4 sm:gap-4">
							<label
								htmlFor="image"
								className="cursor-pointer"
								onDragOver={handleDragOver}
								onDrop={handleDrop}
							>
								{image ? (
									<>
										<Image
											src={image}
											alt="Uploaded"
											style={{
												maxWidth: "100%",
												maxHeight:
													"100%",
											}}
											width={250}
											height={300}
										/>
										<input
											type="file"
											className="hidden cursor-pointer"
											id="image"
											onChange={({
												target,
											}) => {
												if (
													target.files
												) {
													const file =
														target
															.files[0];
													setImage(
														URL.createObjectURL(
															file
														)
													);
													
													setFile(
														file
													);
												}
											}}
										/>
									</>
								) : (
									<div className="w-60 h-80 border-2 border-dotted border-[#ccc] flex flex-col justify-center items-center rounded-[20px] sm:w-full">
										<Image
											src={
												downloadImg
											}
											alt=""
											className="w-9 h-9"
										/>
										<span>
											Drag and Drop
										</span>
										<span>or</span>
										<span>
											Browse Image
											<input
												// required
												type="file"
												className="hidden"
												id="image"
												onChange={({
													target,
												}) => {
													if (
														target.files
													) {
														const file =
															target
																.files[0];

														setImage(
															URL.createObjectURL(
																file
															)
														);

														setFile(
															file
														);
													}
												}}
											/>
										</span>
									</div>
								)}
							</label>
							<div className="">
								<input
									required
									id="name"
									type="text"
									value={name}
									onChange={(e) =>
										setName(
											e.target.value
										)
									}
									placeholder="Product name"
									className=" outline-none border-b border-black text-2xl font-bold mb-6 mt-4 sm:text-base"
								/>
								<div className="flex flex-wrap items-center gap-7 mb-4 font-normal sm:text-[12px] sm:gap-3">
									<div className=" flex flex-col items-start">
										<input
											required
											id="price"
											type="number"
											placeholder="0"
											value={price}
											onChange={(
												e
											) =>
												setPrice(
													+e
														.target
														.value
												)
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
											placeholder="0"
											value={
												commission
											}
											onChange={(e) =>
												setCommission(
													+e
														.target
														.value
												)
											}
											className="  outline-none border-b border-black font-semibold px-2 py-1"
										/>
										<label
											htmlFor="commission"
											className=""
										>
											Commission{" "}
											<span className="text-gray-300">
												/ Unit:
											</span>
										</label>
									</div>
									<div className=" flex flex-col items-start">
										<input
											required
											id="returnAmt"
											type="number"
											placeholder="0"
											readOnly
											value={
												returnAmt
											}
											className=" outline-none px-2 border-b border-black font-semibold text-primaryBgClr py-1"
										/>
										<label
											draggable="true"
											htmlFor="returnAmt"
											className=""
										>
											Return Amount{" "}
											<span className="text-gray-300">
												/ Unit:
											</span>
										</label>
									</div>
								</div>
								<h6 className="text-red-500">
									** Points to remember
									while Ordering **
								</h6>
								<div className="text-gray-500 flex flex-col gap-5 text-sm w-2/4 lgmax:w-full ">
									<input
										type="text"
										className="border-b border-b-black outline-none mt-8"
										value={info.first}
										onChange={(e) =>
											setInfo({
												...info,
												first: e
													.target
													.value,
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
												second: e
													.target
													.value,
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
												third: e
													.target
													.value,
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
												fourth: e
													.target
													.value,
											})
										}
									/>
								</div>
							</div>
						</div>

						<div className="grid grid-flow-row grid-cols-2 items-end gap-x-6 gap-y-3 sm:flex sm:flex-col">
							<div className="mb-4 sm:mb-0 flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="bank"
									className="font-bold sm:text-[13px]"
								>
									Offers available on bank
									cards
								</label>

								<div className="relative flex gap-1">
									<Select
										// defaultValue={
										// 	cardOptions
										// }
										isMulti
										// name="colors"
										options={
											cardOptions
										}
										className="basic-multi-select flex-1 sm:text-[10px]"
										classNamePrefix="select"
										onChange={
											handleChange
										}
										styles={
											defaultStyles
										}
										// value={
										// 	cards
										// 		? cards
										// 		: cardOptions[0]
										// }
									/>
									<DialogTrigger>
										<IoAddSharp
											onClick={() => {
												// setOverlay("");
												setAddOption(
													"card"
												);
											}}
											className="border border-gray-500 rounded-full p-2 hover:bg-gray-100 w-[37px] h-[37px]"
										/>
									</DialogTrigger>
								</div>
							</div>
							<div className="mb-4 sm:mb-0 flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="website"
									className="font-bold sm:text-[13px]"
								>
									Websites
								</label>

								<div className="relative flex gap-1">
									<Dropdown
										options={
											siteOptions
										}
										onChange={
											handleDropdownChangeSite
										}
										className="flex-1 sm:text-[10px]"
									/>
									<DialogTrigger>
										<IoAddSharp
											onClick={() => {
												// setOverlay("");
												setAddOption(
													"site"
												);
											}}
											className="border border-gray-500 rounded-full p-2 hover:bg-gray-100 w-10 h-10"
										/>
									</DialogTrigger>
								</div>
							</div>
							<div className=" flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="directLink"
									className="font-bold sm:text-[13px]"
								>
									Direct Links:
								</label>
								<input
									required
									id="directLink"
									type="text"
									value={productLink}
									onChange={(e) =>
										setProductLink(
											e.target.value
										)
									}
									className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
									placeholder="Enter direct link"
								/>
							</div>
							<div className=" flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="requirement"
									className="font-bold sm:text-[13px]"
								>
									Requirement:
								</label>
								<input
									required
									id="requirement"
									type="number"
									value={requirement}
									onChange={(e) =>
										setRequirement(
											+e.target
												.value
										)
									}
									className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
									placeholder="Requirement"
								/>
							</div>
							<div className=" flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="address"
									className="font-bold sm:text-[13px]"
								>
									Address:
								</label>
								<input
									required
									id="address"
									type="text"
									value={address}
									onChange={(e) =>
										setAddress(
											e.target.value
										)
									}
									className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
									placeholder="Enter Address"
								/>
							</div>
							<div className=" flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="address"
									className="font-bold sm:text-[13px]"
								>
									Zip Code:
								</label>
								<input
									required
									id="zipcode"
									type="text"
									value={zipCode}
									onChange={(e) =>
										setZipCode(
											e.target.value
										)
									}
									className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
									placeholder="Enter Zip Code"
								/>
							</div>
							<div className="mb-4 sm:mb-0 flex flex-col w-full gap-3 sm:gap-2">
								<label
									htmlFor="collaborator"
									className="font-bold sm:text-[13px]"
								>
									Collaborator
								</label>

								<div className="relative flex gap-1">
									<Dropdown
										options={
											collaboratorOptions
										}
										onChange={
											handleDropdownChangeCollaborator
										}
										className="flex-1 sm:text-[10px]"
									/>
									{/* <DialogTrigger>
										<IoAddSharp
											onClick={() => {
												// setOverlay("");
												setAddOption(
													"collaborator"
												);
											}}
											className="border border-gray-500 rounded-full p-2 hover:bg-gray-100 w-10 h-10"
										/>
									</DialogTrigger> */}
								</div>
							</div>
						</div>

						<div className="ml-auto w-fit flex gap-3 mt-8 sm:mr-auto">
							<button
								onClick={() => router.back()}
								className="w-64 p-2 text-red-500 hover:bg-gray-100 border-red-500 border rounded-full sm:w-[8rem] sm:py-0 sm-px-0.5"
								type="reset"
							>
								Cancel
							</button>
							<button
								className="w-64 p-2 text-white hover:bg-green-600 bg-primaryBgClr rounded-full sm:w-[8rem] sm:py-0 sm-px-0.5"
								type="submit" disabled={buttonClick}
							>
								Add Product
							</button>
						</div>
					</>
				)}
			</form>

			<hr />

			<h5 className="mt-3">Special Quantities</h5>

			<form onSubmit={onSpecialRequestSubmit} className="grid grid-flow-row grid-cols-3 p-8 sm:px-0 gap-x-6">
				<div className=" flex flex-col w-full gap-3 sm:gap-2 relative">
					<label
						htmlFor="special-user"
						className="font-bold sm:text-[13px]"
					>
						Special User:
					</label>
					<input
						required
						id="special-user"
						type="text"
						value={specialUser}
						onChange={(e) =>{
								setSpecialUser(
									e.target
										.value
								);
								!usersVsibile && setUsersVisible(true);
							}
							
						}
						className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
						placeholder="Special Quantity"
					/>

					{ 	usersVsibile && 
						<div className=" absolute z-10 bg-white border border-gray-300 shadow-md rounded-lg" style={{maxHeight: '150px', overflow: 'auto', width: '100%', top: '100%'}}>
							{allSpecialUsers.map((usr)=>{
								return <div className="cursor-pointer hover:bg-gray-100 p-2" onClick={()=>onUserClick(usr)}>
									{usr.name}
								</div>
							})}
						</div>
					}
					
				</div>
				<div className=" flex flex-col w-full gap-3 sm:gap-2">
					<label
						htmlFor="special-quantity"
						className="font-bold sm:text-[13px]"
					>
						Special Quantity:
					</label>
					<input
						required
						id="special-quantity"
						type="number"
						value={specialQuantity}
						onChange={(e) =>
							setSpecialQuantity(
								+e.target
									.value
							)
						}
						className=" border border-gray-300 rounded-full p-2 w-full sm:text-[10px]"
						placeholder="Special Quantity"
					/>
				</div>
				<div className="flex gap-3 align-items-end" style={{alignItems: 'end'}}>
					
					<button
						className="w-64 p-2 text-white hover:bg-green-600 bg-primaryBgClr rounded-full sm:w-[8rem] sm:py-0 sm-px-0.5"
						type="submit"
						style={{maxHeight: '41px'}}
					>
						Add Quantity
					</button>
				</div>
			</form>

			<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-green-100">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fullfilled</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{special?.map((spec, index)=>{
							return <tr className={ index%2 ? 'bg-white' : 'bg-gray-50'}>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.user.name}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{spec.orderedQuantity || 0}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{!spec.orderedQuantity && 
									<button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full w-36 shadow-md transition duration-300" onClick={()=>{onSpecialDelete(spec._id)}}>Delete</button> }
								</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>

		</Dialog>
	);
};

export default ProductForm;
