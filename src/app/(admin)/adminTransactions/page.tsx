import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";
import React, { Suspense } from "react";

const AdminTransactions = () => {
	// const [data, setData] = useState<transactions[]>([]);
	// useEffect(() => {
	// 	async function getData() {
	// 		try {
	// 			const response = await axios.get(
	// 				"/api/admin/transactions"
	// 			);
	// 			if (response.data.success) {
	// 				setData(response.data.data);
	// 			} else {
	// 				Popup("error", response.data.message);
	// 			}
	// 		} catch {
	// 			Popup("error", "Something missing, refresh the page");
	// 		}
	// 	}
	// 	getData();
	// }, []);

	return (
		<div className="w-[85%] mx-auto mt-6 ">
			<h3 className="font-semibold my-12">Transactions</h3>
			<Transactions userPage={false} />
		</div>
	);
};

export default AdminTransactions;
