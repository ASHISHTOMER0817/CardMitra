import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NavigationSidebar from "../components/NavigationSidebar";
import dimHome from "@/../public/dimHome.svg";
import dimBell from "@/../public/dimBell.svg";
import dimHelp from "@/../public/dimHelp.svg";
import deals from "@/../public/apps.svg";
import OdrHistory from "@/../public/odrHistory.svg";
import SideBar from "../components/Sidebar";
// import { GlobalStateProvider } from "./components/globalVariable";

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
					icon={[
						dimHome,
						dimBell,
						dimHelp,
					]}
					main={children} firstSection={{
						image: deals,
						name: "Deals",
						changeState: "/deals"
					}} secondSection={{
						image: OdrHistory,
						name: "Order History",
						changeState: "/odrHistory"
					}}				
				/>
			</body>
		</html>
	);
}


// dealsAndhistory={
// 	<>
// 		<SideBar
// 			img={deals}
// 			tab={"Deals"}
// 			changeState={"/deals"}
// 		/>
// 		<hr className="border  w-[30%]" />
// 		<SideBar
// 			img={OdrHistory}
// 			tab={"Order History"}
// 			changeState={"/odrHistory"}
// 		/>
// 	</>
// }