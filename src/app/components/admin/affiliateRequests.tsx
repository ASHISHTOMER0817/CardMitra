'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface details{
      name:string
      number:string
      email:string
}
const UserTable = () => {
	const [users, setUsers] = useState<details[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get("api/affiliateRequest");
				setUsers( await response.data); // Assuming API response is an array of user objects
			} catch (error) {
				console.error("Something went wrong; Please reload the page", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container mx-auto my-8">
			<h5 className="font-semibold text-lg mb-4 pb-2 border-b">
				User List
			</h5>
			<div className="rounded-lg overflow-hidden border border-gray-300">
				<table className="min-w-full divide-y divide-gray-300">
					<thead>
						<tr>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Email</th>
							<th className="px-4 py-2">
								Contact No
							</th>
							<th className="px-4 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map(({name, email, number}, index) => (
							<tr
								key={index}
								className="border-b"
							>
								<td className="px-4 py-2">
									{name}
								</td>
								<td className="px-4 py-2">
									{email}
								</td>
								<td className="px-4 py-2">
									{number}
								</td>
								<td className="px-4 py-2 flex gap-2">
									<Image
										src="edit-icon.png"
										alt="Edit"
										width="20"
										height="20"
									/>
									<Image
										src="delete-icon.png"
										alt="Delete"
										width="20"
										height="20"
									/>
									<Image
										src="view-icon.png"
										alt="View"
										width="20"
										height="20"
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;
