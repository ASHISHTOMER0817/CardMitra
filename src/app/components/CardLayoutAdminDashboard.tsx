import React from "react";
import CardLayout from "./CardLayout";
import Image from "next/image";
import deleteIcon from "@/../public/delete.svg";
import edit from "@/../public/edit.svg";
const CardLayoutAdminDashboard = () => {
	return (
		<div>
			<CardLayout
				image={
					<>
						<Image
							src={deleteIcon}
							alt={""}
							className=""
						/>
						<Image src={edit} alt={""} className="" />
					</>
				}
				placeOrder={undefined}
				beforeDate={undefined}
			/>
		</div>
	);
};

export default CardLayoutAdminDashboard;
