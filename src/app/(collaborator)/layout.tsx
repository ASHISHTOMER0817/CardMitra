import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import dashboard from "@/../public/dashboard.svg";
// import dimBell from "@/../public/dimBell.svg";
// import dimHelp from "@/../public/dimHelp.svg";
import deals from "@/../public/deals.svg";
import OdrHistory from "@/../public/odrHistory.svg";
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
import odrHistoryActive from "@/../public/active_icons/odrHistory_active.svg"
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
		link: "/collabDashboard",
		activeIcon: dashboardActive,
	},
	{ icon: deals, name: "Orders", link: "/collabOrders", activeIcon: dealsActive },
	
	{
		icon: OdrHistory,
		name: "Today's OTPs",
		link: "/collabOTPs",
		activeIcon: odrHistoryActive,
	},
	
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" >
			<body className={inter.className} style={{ display: "flex" }}>
			
				<Navigation options={options} />

				<div className="w-full ml-20 sm:ml-0 px-4 mt-3">
					{children}
					<ToastContainer />
				</div>
			</body>
		</html>
	);
}
