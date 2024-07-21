import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import dashboard from "@/../public/dashboard.svg";
import deals from "@/../public/deals.svg";
import OdrHistory from "@/../public/odrHistory.svg";
import dimProfile from "@/../public/dimProfile.svg";
import Navigation from "../components/Navigation";
import dealsActive from "@/../public/active_icons/deals_active.svg";
import dashboardActive from "@/../public/active_icons/dashboard_active.svg";
import odrHistoryActive from "@/../public/active_icons/odrHistory_active.svg";
import profileActive from "@/../public/active_icons/profile_active.svg";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "../components/nextToast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Card Mitra",
	description: "Cards to Cash",
};

const options = [
	{
		icon: dashboard,
		name: "Dashboard",
		link: "/dashboard",
		activeIcon: dashboardActive,
	},
	{ icon: deals, name: "Deals", link: "/deals", activeIcon: dealsActive },
	{
		icon: OdrHistory,
		name: "Order History",
		link: "/odrHistory",
		activeIcon: odrHistoryActive,
	},
	{
		icon: dimProfile,
		name: "Profile",
		link: "/userProfile",
		activeIcon: profileActive,
	},

	// {icon:dimBell, name:'Deals', link: '/deals'},
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className} style={{ display: "flex" }}>
				<Navigation options={options} />
				<div className="w-full px-6 py-4 ml-20 sm:ml-0 sm:px-4 sm:py-2">
					{children}
					<ToastContainer />
				</div>
			</body>
		</html>
	);
}
