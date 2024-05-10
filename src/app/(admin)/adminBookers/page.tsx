import Header from "@/app/components/Header";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";
import Loader from "@/app/components/loader";
import React, { Suspense } from "react";

const AdminBookers = () => {
	return (
			<AffiliateRequest heading="approved" />
	);
};

export default AdminBookers;
