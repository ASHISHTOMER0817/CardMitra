import React from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import deleteIcon from "@/../public/delete.svg";
import edit from "@/../public/edit.svg";
import productList from "@/interface/productList";
import Link from "next/link";

// interface OrderHistory {
// 	product: productList;
// }
const CardLayoutAdminDashboard = ({ data }: { data: productList[] }) => {
	return (
		<>
			{/* {data.map(
				(
					{ _id, requirement, name, price, commission },
					index: number
				) => {
					return (
						<Link href={`/orders/${_id}`} key={index}>
							<CardLayout
								classList="hover:border-primaryBgClr"
								image={
									<>
										<Image
											src={
												deleteIcon
											}
											alt={""}
											className=""
										/>
										<Image
											src={edit}
											alt={""}
											className=""
										/>
									</>
								}
								quantity={requirement}
								name={name}
								randomNo={0}
								price={price}
								commission={commission}
							/>
						</Link>
					);
				}
			)}{" "} */}
		</>
	);
};

export default CardLayoutAdminDashboard;
