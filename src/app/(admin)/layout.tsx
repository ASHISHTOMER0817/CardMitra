import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavigationSidebar from "../components/NavigationSidebar";
import dimHome from "@/../public/dimHome.svg";
import dimBell from "@/../public/dimBell.svg";
import dimHelp from "@/../public/dimHelp.svg";
import deals from "@/../public/apps.svg";
// import OdrHistory from "@/../public/odrHistory.svg";
// import SideBar from "../components/Sidebar";
import bookers from "@/../public/bookers.svg";
import transactions from "@/../public/transactions.svg";
import { Transactions } from "@/app/components/lib"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NavigationSidebar
					firstSection={"/adminDashboard"}
					secondSection={"/adminDashboard"}
					icon={[dimHome, dimBell, dimHelp]}
					thirdSection={{
						image: deals,
						name: "Orders",
						changeState: "/orders",
					}}
					fourthSection={{
						image: bookers,
						name: "Bookers",
						changeState: "/adminBookers",
					}}
					fifthSection={{
						image: <Transactions/>,
						name: "Transactions",
						changeState: "/transactions",
					}}
					main={children}
				/>
			</body>
		</html>
	);
}
