import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import dashboard from "@/../public/dashboard.svg";
// import dimBell from "@/../public/dimBell.svg";
// import dimHelp from "@/../public/dimHelp.svg";
import deals from "@/../public/deals.svg";
// import OdrHistory from "@/../public/odrHistory.svg";
// import SideBar from "../components/Sidebar";
import bookers from "@/../public/bookers.svg";
import transactions from "@/../public/transactions.svg";
// import { Transactions } from "@/app/components/lib";
// import Loader from "../components/loader";
// import { Suspense } from "react";
import Navigation from "../components/Navigation";
import "react-toastify/dist/ReactToastify.css";

import dealsActive from "@/../public/active_icons/deals_active.svg";
import dashboardActive from "@/../public/active_icons/dashboard_active.svg";
// import odrHistoryActive from "@/../public/active_icons/odrHistory_active.svg"
// import profileActive from "@/../public/active_icons/profile_active.svg"

import bookersActive from "@/../public/active_icons/bookersActive.svg";
import transactionInactive from "@/../public/active_icons/transactionInactive.svg";
import { ToastContainer } from "../components/nextToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Card Mitra",
	description: "Cards to Cash",
	icons:{
		icon:{url:'/favicon.svg', sizes: '32x32', type: 'image/svg+xml'}
	}
};

const options = [
	{
		icon: dashboard,
		name: "Dashboard",
		link: "/adminDashboard",
		activeIcon: dashboardActive,
	},
	{ icon: deals, name: "Orders", link: "/orders", activeIcon: dealsActive },
	{
		icon: bookers,
		name: "Bookers",
		link: "/adminBookers",
		activeIcon: bookersActive,
	},
	{
		icon: transactionInactive,
		name: "Transactions",
		link: "/adminTransactions",
		activeIcon: transactions,
	},

	// {icon:dimBell, name:'Deals', link: '/deals'},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" >
			<body className={inter.className} style={{ display: "flex" }}>
			{/* <div
				className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
			></div>
			<form
				onSubmit={payment}
				className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 sm:gap-2`}
			>
				<RxCross1
					width={20}
					height={20}
					className=" cursor-pointer ml-auto hover:bg-gray-100 active:bg-gray-100 rounded-full"
					onClick={() => setOverlay("hidden")}
				/>
				<h4 className="sm:text-nowrap text-xl">
					{overlayElement?.heading}
				</h4>
				<input
					hidden={
						overlayElement?.action !== "payment"
							? true
							: false
					}
					type="number"
					required
					placeholder="Amount"
					className="outline-none border-b pb-2 border-black sm:text-sm"
					value={amount}
					onChange={(e) => setAmount(+e.target.value)}
				/>{" "}
				<div className="flex justify-center gap-3 items-center">
					<button
						onClick={() => {
							setOverlay("hidden");
						}}
						type="button"
						className="px-3 py-1 hover:bg-gray-200 border-gray-200 border rounded-full active:bg-gray-200"
					>
						Cancel
					</button>
					<button
						onClick={buttonOperation}
						type="submit"
						className="px-3 py-1 hover:bg-green-600 bg-primaryBgClr rounded-full text-white"
					>
						 {overlayElement?.button}
					</button>
				</div>
			</form> */}
				<Navigation options={options} />

				<div className="w-full ml-20 sm:ml-0 px-4 mt-3">
					{children}
					<ToastContainer />
				</div>
			</body>
		</html>
	);
}
