"use client";
import CardLayoutAdminDashboard from "@/app/components/CardLayoutAdminDashboard";
import Header from "@/app/components/Header";
import StatusBadge from "@/app/components/StatusBadge";
import Loader from "@/app/components/loader";
import productList, { order } from "@/interface/productList";
import { Product } from "@/models/userModel";
import axios from "axios";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { IoGridOutline } from "react-icons/io5";
import { IoListOutline } from "react-icons/io5";
import Popup from "@/app/components/Popup";

interface joint {
	orderHistory: productList[];
	orders: order[];
}

const exportTableToExcel = () => {
    const table = document.getElementById('order-table');
	if(!table)return;
    const rows = table.querySelectorAll('tr');

    let csvContent = '';

	rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData: string[] = [];
		
		cols.forEach(col => {
			
			const text = (col as HTMLElement).innerText.replace(/,/g, ''); // Cast to HTMLElement to access innerText
            rowData.push(text);
			
        });
		
		csvContent += rowData.join(',') + '\n'; // Add a new line after each row
    });

    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger a download
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.setAttribute('download', 'table.csv'); // use .csv extension
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

};

// Define the props type
interface StatusBadgeProps {
	status: string;
	orderId: string;
}

// StatusBadge Component
const StatusBadgeEnclosing: React.FC<StatusBadgeProps> = ({ status, orderId }) => {

	const [isEditing, setIsEditing] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState(status);
	const [finalVal, setFinalVal] = useState<string|null>(null);

	const statuses = ['undelivered', 'delivered', 'cancelled'];

	const updateStatus = async (setVal: string) => {
		console.log('sta');

		axios.post('/api/orders/updateStatus', {orderId, status:setVal})
		.then((res)=>{
			setFinalVal(res.data.val); 
			setIsEditing(false);
		})
		.catch(err=>{
			console.log('err', err.message);
		})
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedStatus(e.target.value);
		updateStatus(e.target.value);
		// handleBlur();
	};

	const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) =>{
		setIsEditing(false);
	}

	useEffect(()=>{
		console.log('edit', isEditing);
	}, [isEditing])

	return (
		<div
			tabIndex={0}
			className="relative"
			onClick={() => setIsEditing(true)}
			// onBlur={handleBlur}
		>
		{isEditing ? (
			<select
				value={selectedStatus}
				onChange={handleStatusChange}
				onBlur={handleBlur}
				className="border border-gray-300 rounded py-1 px-2"
				autoFocus
				>
				{statuses.map((statusOption) => (
					<option key={statusOption} value={statusOption}>
					{statusOption}
					</option>
				))}
			</select>
		) : (
			<span onClick={()=>setIsEditing(true)}> <StatusBadge status={finalVal || status} /> </span>
		)}
		</div>
	);
};


const AdminOrderHistory = () => {
	const [data, setData] = useState<joint>();
	const [view, setView] = useState("grid");
	const [zipcode, setZipcode] = useState<string>("");
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [name, setName] = useState("");

	const [showFilter, setShowFilter] = useState(false);

	const [deliveryStatus, setDeliveryStatus] = useState('');

	// const [editingOrderId, setEditingOrderId] = useState<String | null>(null);

	// const handleStatusClick = (orderId:String) => {
	// 	setEditingOrderId(orderId);
	// };
	

	const setFilter = () =>{
		setShowFilter(!showFilter);
	}

	// const [total, setTotal] = useState<number | null>();

	

	useEffect(() => {

		async function clearQuantity (){
			try {
				await axios.post(
					"/api/orders/unlockExpiredQuantity"
				);
			} catch {
				Popup(
					"error",
					"Something went wrong, REFRESH THE PAGE"
				);
				console.log("Something went wrong, REFRESH THE PAGE");
			}
		}

		async function getData() {
			try {
				const response = await axios.get(
					`/api/admin/dashboard?query=orderHistory&startDate=${startDate}&endDate=${endDate}`
				);
				// console.log( 'resp: ', response.data.data);
				setData(response.data.data);
			} catch {
				console.log("what is happening here !!");
			}
		}

		clearQuantity().then(()=>{
			getData();
		})
	}, [startDate, endDate]);
	// console.log(endDate);
	return (
		<div className="flex flex-col mx-auto">
			<Header
				className="sm:mb-4"
				heading={"Order History"}
				Children={
					<div className="flex gap-[10px] sm:w-full">
						
						<div
							onClick={() => setView("list")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-nowrap ${
								view === "list" &&
								"bg-gray-200 rounded-2xl"
							}`}
						>
							<IoGridOutline />
							<div> List view</div>
						</div>
						<div
							onClick={() => setView("grid")}
							className={`px-3 py-1 gap-1 cursor-pointer flex justify-center items-center text-sm hover:bg-gray-200 sm:px-3 sm:py-0 sm:text-nowrap ${
								view === "grid" &&
								"bg-gray-200 rounded-2xl"
							}`}
						>
							<IoListOutline />
							<div>Grid view</div>
						</div>
						
					</div>
				}
			/>

			{!data ? (
				<Loader />
			) : view === "grid" ? (
				data.orderHistory.length < 1 ? (
					<div className="text-red-500 text-sm mx-auto w-fit font-serif">
						Currently there are no orders
					</div>
				) : (
					<div className="flex flex-wrap justify-center gap-4 transition-all">
						{data.orderHistory.map(
							(
								data: productList,
								index: number
							) => {
								return (
									<CardLayoutAdminDashboard
										key={index}
										data={data}
										collaborator
									/>
								);
							}
						)}
						{/* <CardLayoutAdminDashboard
							data={data.orderHistory}
						/> */}
					</div>
				)
			) : <>
					<div className="flex mb-3">
						<button className="text-primaryBgClr text-left" onClick={setFilter}>
							<span>
								{showFilter ? '- ' : '+ '}
							</span>
							Advanced Filters
							
						</button>

						<button
							onClick={exportTableToExcel}
							className={`cursor-pointer hover:bg-gray-200 ml-auto text-primaryBgClr`}
						>
							Download CSV
						</button>
					</div>
					{showFilter &&
						<div className="flex lg:flex-row flex-col gap-3 py-3 px-2 rounded-[8px]" style={{border: '1px solid aliceblue'}}>
							
							<div className="flex justify-between items-center gap-3" >
								<input
									className=""
									type="date"
									placeholder="Start Date"
									value={
										startDate
											? startDate
													.toISOString()
													.substring(
														0,
														10
													)
											: ""
									}
									onChange={(e) =>
										setStartDate(
											e.target.value
												? new Date(
														e.target.value
												)
												: null
										)
									}
								/>

								<div className="text-gray-400">to</div>
								
								<input
									className=""
									type="date"
									placeholder="End Date"
									value={
										endDate
											? endDate
													.toISOString()
													.substring(
														0,
														10
													)
											: ""
									}
									onChange={(e) =>
										setEndDate(
											e.target.value
												? new Date(
														e.target.value
												)
												: null
										)
									}
								/>
							</div>

							<span className="mx-auto">AND / OR</span>

							<div className="flex lg:flex-row flex-col gap-3">
								<select
									style={{border: '1px solid aliceblue'}}
									className="py-1 px-2 rounded-[8px]"
									value={deliveryStatus}
									onChange={(e) =>
										setDeliveryStatus(e.target.value)
									}
								>
									<option value="">Select</option>
									<option value="undelivered">undelivered</option>
									<option value="unverified">unverified</option>
									<option value="delivered">delivered</option>
								</select>
								{/* <input
									style={{border: '1px solid aliceblue'}}
									className="py-1 px-2 rounded-[8px]"
									type="text"
									placeholder="Enter Pincode"
									value={zipcode}
									onChange={(e) =>
										setZipcode(e.target.value)
									}
								/> */}
								<input
									style={{border: '1px solid aliceblue'}}
									className="py-1 px-2 rounded-[8px]"
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) =>
										setName(e.target.value)
									}
								/>
							</div>

						</div>
					}

					{data.orderHistory.length < 1 ? (
						<div className="text-red-500 text-sm mx-auto w-fit font-serif">
							Currently there are no orders
						</div>
						) : (
							<>
							

								{/*Latest Design changes */}
								<div className="">
									<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
										<table id="order-table" className="min-w-full divide-y divide-gray-200 text-nowrap">
											<thead className="bg-green-100">
												<tr>
													{/* <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Affiliate
													</th> */}
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Orderer Name
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Device
													</th>
													{/* <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Return Amt
													</th> */}
													{/* <th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Pincode
													</th> */}
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Order ID
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Tracking ID
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Delivery Date
													</th>
													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Order Date
													</th>

													<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
														Status
													</th>
												</tr>
											</thead>
											<tbody className="bg-white divide-y divide-gray-200">
												{data.orders.map(
													(
														{
															user,
															product,
															orderedAt,
															delivered,
															_id,
															trackingID,
															deliveryDate,
															ordererName,
														},
														index
													) => {
														let show = false;

														if (!zipcode && !name && !deliveryStatus) {	
															// If both have no value, show = true
															show = true;
														} else {
															// If only zipcode or name has a value, check and set show=true if it matches
															const zipcodeMatches = zipcode && product.zipCode.includes(zipcode);
															const nameMatches = name && (ordererName.toLowerCase().includes(name.toLowerCase()) || user.name.toLowerCase().includes(name.toLowerCase()));

															const statusMatches = deliveryStatus && (delivered.toLowerCase() === deliveryStatus.toLowerCase());

															if (zipcode && name && deliveryStatus) {
																// If both have values, both must match (AND condition)
																show = Boolean(zipcodeMatches && nameMatches && statusMatches);
															} else {
																// If only one has a value, check if it matches
																show = Boolean(zipcodeMatches || nameMatches || statusMatches);
															}
														}

													

														return (
															show && (
																<tr
																	key={
																		index
																	}
																	className={
																		index %
																			2 ===
																		0
																			? "bg-gray-100"
																			: "bg-white"
																	}
																>
																	{/* <td className="py-4 px-6 text-sm font-semibold text-primaryBgClr">
																		{
																			user.name
																		}
																	</td> */}
																	<td className="py-4 px-6 text-sm font-semibold text-primaryBgClr">
																		{
																			ordererName
																		}
																	</td>
																	<td className="py-4 px-6 text-sm text-gray-500">
																		{
																			product.name
																		}
																	</td>
																	{/* <td className="py-4 px-6 text-sm text-gray-500">
																		{+product.price +
																			+product.commission}
																	</td> */}
																	{/* <td className="py-4 px-6 text-sm text-gray-500">
																		{
																			product.zipCode
																		}
																	</td> */}
																	<td className="py-4 px-6 text-sm text-gray-500">
																		<span
																			className="block overflow-hidden text-ellipsis whitespace-nowrap"
																			title={
																				_id
																			}
																		>
																			{
																				_id
																			}
																		</span>
																	</td>
																	<td className="py-4 px-6 text-sm text-gray-500">
																		<span
																			className="block overflow-hidden text-ellipsis whitespace-nowrap"
																			title={trackingID}
																		>
																			{trackingID}
																		</span>
																	</td>
																	<td className="py-4 px-6 text-sm text-gray-500">
																		{deliveryDate ? new Date(deliveryDate).toDateString() : ''}
																		
																	</td>
																	<td className="py-4 px-6 text-sm text-gray-500">
																		{orderedAt ? new Date(orderedAt).toDateString() : ''}
																	</td>

																	<td className="py-4 px-6 text-sm text-gray-500">
																		<StatusBadgeEnclosing orderId={_id} status={delivered} />
																		{/* <StatusBadge
																			status={
																				delivered
																			}
																		/> */}
																	</td>
																</tr>
															)
														);
													}
												)}
											</tbody>
										</table>
									</div>
								</div>
							</>
						)
					}
				</> 
			}
			
			
		</div>
	);
};

export default AdminOrderHistory;
