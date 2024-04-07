'use client'
import React, { ReactNode, useState } from "react";
import logo from "@/../public/logo.svg";
import home from "@/../public/Home.svg";
import dimBell from "@/../public/dimBell.svg";
import bell from "@/../public/bell.svg";
import dimApps from "@/../public/dimApps.svg";
import helpicon from "@/../public/Help.svg";
import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
import dimHome from "@/../public/dimHome.svg"
import apps from "@/../public/apps.svg"
const NavigationSidebar = ({
	Children,
	dashboard,
	deals,
	notification,
	help,
}: {
	Children?: ReactNode;
	dashboard: ReactNode;
	deals: ReactNode;
	notification: ReactNode;
	help: ReactNode;
}) => {
	const [main, setMain] = useState<ReactNode>(<Dashboard />);

	const navigationBar = [true, false, false, false]
	const [navigationbar, setNavigationbar] = useState(navigationBar);

  // Function to change navigation state based on position
  const changeState = (change: React.ReactNode, position: number) => {
    setMain(change); // Update main content state

    // Update navigationbar state based on position
    const updatedNavigationbar = navigationBar.map((item, index) =>
      index === position ? true : false
    );
    setNavigationbar(updatedNavigationbar);
  };


	return (
		<div className="flex items-start">
			<section className=" px-6 py-6 gap-6 flex flex-col min-h-screen items-start top-0 justify-between border-r-[5px] border-r-gray-300 sticky">
				<SideBar
					img={logo}
					tab={""}
					heading={""}
					classList={""}
					changeState={function (): void {
						throw new Error(
							"Function not implemented."
						);
					}}
				/>
				<SideBar
					img={navigationbar[0]? home : dimHome}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={"mt-3"}
					changeState={() => changeState(dashboard, 0)}
				/>
				<SideBar
					img={navigationbar[1]? apps : dimApps}
					tab={"Deals"}
					heading={""}
					classList={""}
					changeState={() => changeState(deals, 1)}
				/>
				<SideBar
					img={navigationbar[2]? bell : dimBell}
					tab={"Notifications"}
					heading={""}
					classList={""}
					changeState={() => changeState(notification, 2)}
				/>
				<SideBar
					img={helpicon}
					tab={"Chat support"}
					heading={"SUPPORT"}
					classList={"mt-auto"}
					changeState={() => help}
				/>
				{Children}
			</section>
			{main}
		</div>
	);
};

export default NavigationSidebar;
