import Header from "@/app/components/Header";
import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";
import React from "react";

const AdminBookers = () => {
	return (
		<div className="flex flex-col w-full mx-7">
			<Header heading={"Bookers"} />
			<AffiliateRequest />
		</div>
	);
};

export default AdminBookers;
