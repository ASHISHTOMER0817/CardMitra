import Header from "@/app/components/Header";
// import ProductDisplayFormat from "@/app/components/ProductDisplayFormat";
import AffiliateRequest from "@/app/components/admin/affiliateRequests";
import Loader from "@/app/components/loader";
import React, { Suspense } from "react";

const AdminBookers = () => {
	return (
		<Suspense fallback={<Loader />}>
			<AffiliateRequest heading="approved" />
		</Suspense>
	);
};

export default AdminBookers;
