"use client";
import { transactions } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

const Transactions = ({
	user,
	_id
}: {
	user?: boolean;
	_id: string;
	admin ?: boolean
}) => {
	const [data, setData] = useState<transactions[]>();
	const [newAmt, setNewAmt] = useState(0);

	const [transactionID, setTransactionID] = useState('');
	// const [paymentEdited, setPaymentEdited] = useState(false);
	
	console.log('is this user', user)
	async function getData() {
		try {
			const response = await axios.get(
				`/api/transactions?_id=${_id}`
			);
			if (response.data.success) {
				setData(response.data.data);
			}
		} catch {
			Popup("error", "Something missing, refresh the page");
		}
	}
	useEffect(() => {
		getData();
	}, [_id]);
	const userId = _id;
	// console.log(userId)

	async function editPayment() {
		try {
			const response = await axios.post(
				`/api/users/transaction/edit`,
				{newAmt, transactionID}
			);
			if (response.data.success) {
				Popup("success", response.data.message);
				getData();
				
			}else{
				Popup("error", response.data.message);
			}
		} catch {
			Popup("error", "something went wrong!!");
		}
	}

	return (
		<>
			<div className="mx-auto ">
				<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
					<Dialog>
						<DropdownMenu>
							<DialogContent className="bg-white rounded-[20px]">
								<DialogHeader>
									<DialogTitle>
										Enter the new amount							
									</DialogTitle>
								</DialogHeader>
								<input
									type="number"
									className={`border border-solid rounded-[10px] px-3 py-2`}
									placeholder="Paid Amount"
									value={newAmt}
									onChange={(e) =>
										setNewAmt(parseInt(e.target.value))
									}
								/>
								<DialogFooter className=" gap-3">
									<DialogClose className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50">
										Cancel
									</DialogClose>
									<DialogClose
										className="rounded-[10px] px-1 py-2 border border-solid hover:bg-gray-50"
										onClick={editPayment}
									>
										Submit
									</DialogClose>
								</DialogFooter>
							</DialogContent>
							
							<table className="min-w-full divide-y divide-gray-200 text-nowrap">

								<thead className="bg-green-100">
									<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
										Transaction ID
									</th>
									{!userId && (
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
										User Name
										</th>
									)}
									<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
										Date
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
										{/* Amount Received */}
										{user ? 'Amount Received': 'Amount Paid'}
									</th>
									{ 
										!user && 
										<th className="px-6 py-3 text-left text-xs font-medium text-[#2f4f4f] uppercase tracking-wider">
										Action
										</th>
									}
									</tr>
								</thead>
								
								<tbody>
									{data?.map(( transaction, index) => (
										<tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>

											<td className="py-4 px-6 text-gray-500">
												{transaction._id}
											</td>
											{!userId && (
												<td className="py-4 px-6 font-semibold text-primaryBgClr">
													{transaction?.user?.name}
												</td>
											)}
											<td className="py-4 px-6 text-gray-500">
												{new Date(transaction.dateOfPayment).toDateString()}
											</td>
											<td className="py-4 px-6 text-gray-500">
												₹{transaction.amount}
											</td>
											{ 
												!user &&
												<td className="py-4 px-6 text-gray-500">
													<DialogTrigger onClick={()=>{setNewAmt(transaction.amount); setTransactionID(transaction._id)}} className="text-gray-700 border border-gray-300 rounded-[6px] px-3 py-2 md:px-2 md:py-1 sm:text-xs hover:bg-gray-100 transition-colors duration-200">
														Edit
													</DialogTrigger>
												</td>
											}
										</tr>
									))}
								</tbody>

							</table>
						</DropdownMenu>
					</Dialog>
				</div>
			</div>
		</>
	);
};

export default Transactions;
