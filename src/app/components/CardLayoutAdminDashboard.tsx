import React from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import deleteIcon from "@/../public/delete.svg";
import edit from "@/../public/edit.svg";
import productList from "@/interface/productList";

interface OrderHistory {
	product: productList;
}
const CardLayoutAdminDashboard = ({data}:{data:OrderHistory[]}) => {

	return (
		<>
			{data.map(({ product }, index: number) => {
				return (
					<CardLayout
						key={index}
						image={
							<>
								<Image
									src={deleteIcon}
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
						quantity={product.requirement}
						name={product.name}
						randomNo={0}
						price={product.price}
						commission={product.commission}
					/>
				);
			})}{" "}
		</>
	);
};

export default CardLayoutAdminDashboard;
