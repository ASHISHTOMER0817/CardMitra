"use client";
import React, {
	useState,
	useEffect,
	ReactNode,
	ChangeEvent,
	useRef,
} from "react";
import axios from "axios";
import Image from "next/image";
// import reject from "@/../public/reject.svg";
// import accept from "@/../public/accept.svg";
import view from "@/../public/view.svg";
import Link from "next/link";
// import AcceptAffiliate from "../acceptAffiliate";
import Popup from "../Popup";
import { order, user } from "@/interface/productList";
import Loader from "../loader";
// import { count } from "console";

const AffiliateRequest = ({ heading }: { heading: string }) => {
	const [users, setUsers] = useState<{
		allRequest: ({ user: user; balance: number } | user)[];
		passwords: {
			user: string;
			password: string;
		}[];
		lastId: string;
	}>();
	const [refreshData, setRefreshData] = useState(false);
	const [searchText, setSearch] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [lastId, setLastId] = useState(null);
	const [navigate, setNavigate] = useState("gt");
	// const [pageHistory, setPageHistory] = useState<string[]>([]);
	// const pageHistory:string[] = useRef([]).current;
	const [tempCount, setTempCount] = useState(0)


	const userArr =
		useRef<
			{
				name: string;
				email: string;
				contact: number;
				_id: string;
			}[]
		>();
	// const [userArr, setUsersArr] = useState<{name:string, email:string, contact:number}[]>()
	const [matchedNames, setMatchedNames] =
		useState<
			{
				name: string;
				email: string;
				contact: number;
				_id: string;
			}[]
		>([]);

	// const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
	// 	setSearch(ev.target.value);
	// };

	const handleSearch = (ev: React.FormEvent<HTMLInputElement>) => {
		setSearch((ev.target as HTMLInputElement).value);
	  };
	  

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(
					`/api/affiliate/affiliateRequest?isApproved=${heading}&lastId=${
						lastId || ""
					}&navigate=${navigate}`
				);
				setUsers(res.data.data); // Assuming API response is an array of user objects
				setTotalPages(res.data.data.totalPages);
				setLastId(res.data.data.lastId);
				// pageHistory=[...pageHistory, res.data.data.lastId];
			} catch (error) {
				console.error(
					"Something went wrong; Please reload the page",
					error
				);
			}
		};
		fetchData();
	}, [heading, refreshData, navigate]);

	useEffect(() => {
		const UsersData = async () => {
			try {
				const res = await axios.get(
					"/api/affiliate/searchAffiliate"
				);
				userArr.current = [...res.data.user];
				console.log(res.data.user);
			} catch (error) {
				console.log(error);
			}
		};
		UsersData();
	}, []);

	async function isAccept(choice: boolean, _id: string) {
		try {
			const response = await axios.get(
				`/api/affiliate/affiliateAcceptOrReject?choice=${choice}&objectId=${_id}`
			);
			const msg = response.data.message;
			const status = response.data.status;
			if (status === 200) {
				Popup("success", msg);
				setRefreshData(!refreshData);
			}
			if (status === 400) {
				Popup("info", msg);
				setRefreshData(!refreshData);
			}
			if (status === 500) {
				Popup("error", msg);
			}
		} catch {
			Popup("error", "Something went wrong, REFRESH");
		}
	}

	function findPassword(email: string) {
		if (users?.passwords)
			for (let userData of users.passwords) {
				if (userData.user === email) {
					return userData.password;
				}
			}
	}

	useEffect(() => {
		console.log('currently outside')
		if (userArr.current !== undefined) {
			try {
				console.log(tempCount, 'I am in wow')
				let allMatchedUser = [];
				for (let user of userArr.current) {
					if (allMatchedUser.length === 8 || !searchText) break;
					if (
						user.name
							.toLowerCase()
							.includes(searchText) ||
						String(user.contact).includes(searchText) ||
						user.email
							.toLowerCase()
							.includes(searchText)
					) {
						allMatchedUser.push(user);
					}
				}
				setTempCount(tempCount+1)
				console.log("matched_Count", allMatchedUser)
				setMatchedNames([...allMatchedUser]);
			} catch (error) {
				console.log(error);
			}
		}
	}, [searchText, userArr]);

	// console.log(matchedNames)

	return (
		<>
			<div
				className={`${
					heading === "approved" && " sm:w-full"
				} mx-auto md:text-[10px] `}
			>
				{heading === "approved" && (
					<h3 className="font-semibold mb-4 sm:text-xs">
						User List
					</h3>
				)}

				<div className="flex relative ml-auto flex-col items-start w-fit">
					<input 
						// ref={searchRef.current}
						value={searchText}
						onInput={(ev) => handleSearch(ev)}
						// onChange={(ev) => handleSearch(ev)}
						type="text"
						name="search-user"
						id="search-user"
						placeholder="Search by name, email, mob..."
						className="py-1 px-2 rounded-[8px] mb-2"
						style={{ border: "1px solid aliceblue" }}
					/>
					<div className="flex flex-col items-start absolute bg-white p-2 rounded-md top-full right-0">
						{matchedNames &&
							matchedNames?.map(
								(
									{
										name,
										email,
										_id,
									}: {
										name: string;
										email: string;
										_id: string;
									},
									index
								) => {
									console.log(name)
									return (
										<Link
											className="hover:bg-gray-200 focus:bg-gray-200 border-b-2 text-nowrap border-gray-500 text-sm sm:text-[10px] w-full"
											key={index}
											href={`/adminBookers/${_id}`}
										>
											{name} |{" "}
											{email}
										</Link>
									);
								}
							)}
					</div>
				</div>

				<div>
					<button
						disabled={page === 1}
						onClick={() => {
							setPage(page - 1);
							setNavigate("lt");
							setRefreshData(!refreshData);
						}}
					>
						Prev
					</button>
					<span>
						{" "}
						Page {page} of {totalPages}{" "}
					</span>
					<button
						disabled={page === totalPages}
						onClick={() => {
							setPage(page + 1);
							setNavigate("gt");
							setRefreshData(!refreshData);
						}}
					>
						Next
					</button>
				</div>

				{!users ? (
					<Loader />
				) : users.allRequest.length > 0 ? (
					<div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-green-100">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										User Type
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Contact
									</th>

									{heading && (
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Amount
										</th>
									)}
									{
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Password
										</th>
									}

									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Action
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{users.allRequest.map(
									(info, index) => {
										// console.log(user, balance)
										// const { user, balance } = info
										const user =
											"balance" in
											info
												? info.user
												: info;
										const balance =
											"balance" in
											info
												? info.balance
												: 0;
										const {
											name,
											role,
											email,
											contact,
											isApprove,
											_id,
											unpaid,
										} = user;

										// let show = false;

										// if (!searchText) {
										// 	show = true;
										// } else {
										// 	show =
										// 		name
										// 			.toLowerCase()
										// 			.includes(
										// 				searchText.toLowerCase()
										// 			) ||
										// 		email
										// 			.toLowerCase()
										// 			.includes(
										// 				searchText.toLowerCase()
										// 			) ||
										// 		contact
										// 			.toLowerCase()
										// 			.includes(
										// 				searchText.toLowerCase()
										// 			);
										// }
										return (
											  (
											// show && (
												<tr
													key={
														index
													}
													className={
														index %
															2 ===
														0
															? "bg-white"
															: "bg-gray-50"
													}
												>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														<Link
															href={`/adminBookers/${_id}`}
														>
															{
																name
															}
														</Link>
													</td>
													{[
														role,
														email,
														contact,
													].map(
														(
															val,
															index
														) => {
															return (
																<td
																	key={
																		index
																	}
																	className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
																>
																	{
																		val
																	}
																</td>
															);
														}
													)}
													{/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{
															role
														}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{
															email
														}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{
															contact
														}
													</td> */}

													{heading && (
														<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
															{isApprove &&
																heading &&
																balance}
														</td>
													)}
													<td>
														{findPassword(
															email
														)}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
														{!isApprove ? (
															<>
																<div
																	onClick={() =>
																		isAccept(
																			true,
																			_id
																		)
																	}
																	className="text-sm text-white hover:bg-green-600 py-2 px-5 cursor-pointer  rounded-full border bg-primaryBgClr sm:py-1 sm:text-[12px] sm:my-auto sm:h-fit sm:px-3"
																>
																	Accept
																</div>
																<div
																	onClick={() =>
																		isAccept(
																			false,
																			_id
																		)
																	}
																	className="text-sm py-2 px-5 cursor-pointer hover:bg-slate-100 rounded-full border text-red-500 sm:py-1 sm:text-[12px] sm:my-auto sm:h-fit sm:px-3"
																>
																	Reject
																</div>
															</>
														) : (
															<Link
																href={`/adminBookers/${_id}`}
															>
																<Image
																	src={
																		view
																	}
																	alt="View"
																	width={
																		30
																	}
																	className={`cursor-pointer h-auto sm:h-[17px] sm:w-[17px] sm:mt-[1px] ${
																		!(
																			index %
																			2
																		)
																			? "hover:bg-gray-200"
																			: "hover:bg-[#d3d1d1]"
																	} rounded-full`}
																/>
															</Link>
														)}
													</td>
												</tr>
											)
										);
									}
								)}
							</tbody>
						</table>
					</div>
				) : (
					<div className="mx-auto w-fit mt-20 text-red-500 font-serif">
						No data to show !!
					</div>
				)}
			</div>

			{/*Latest Design changes */}
			{/* <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {heading === "approved" && (
        <h1 className="text-2xl font-semibold mb-6">User List</h1>
      )}
      <div className="overflow-x-auto bg-white shadow-md rounded-[8px]">
        {!users ? (
          <Loader />
        ) : users.allRequest.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Contact</th>
                {heading && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.allRequest.map(({ name, email, contact, isApprove, _id }, index) => {
                let payable = 0;
                for (let i = 0; i < users.order.length; i++) {
                  const order = users.order[i];
                  if (_id === order.user._id && order.delivered === 'delivered' && order.paid === null) {
                    payable += order.product.price;
                  }
                }
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primaryBgClr">{name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact}</td>
                    {heading && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{isApprove && payable}</td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {!isApprove ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => isAccept(true, _id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => isAccept(false, _id)}
                            className="px-3 py-1 bg-red-100 text-red-500 rounded-full hover:bg-red-200 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <Link href={`/adminBookers/${_id}`}>
                          <Image
                            src={view}
                            alt="View"
                            width={20}
                            height={20}
                            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
                          />
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-red-500 font-serif">No data to show!</div>
        )}
      </div>
    </div> */}
		</>
	);
};

export default AffiliateRequest;
