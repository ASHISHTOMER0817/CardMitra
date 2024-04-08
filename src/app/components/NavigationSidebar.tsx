'use client'
import React, { ReactNode, useState } from "react";
import logo from "@/../public/logo.svg";
import dimBell from "@/../public/dimBell.svg";
import home from "@/../public/Home.svg";
import apps from "@/../public/apps.svg"
import bell from "@/../public/bell.svg";
import dimApps from "@/../public/dimApps.svg";
import helpicon from "@/../public/Help.svg";
import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
import dimHome from "@/../public/dimHome.svg"
import { useContext } from "react";
import { useGlobalState } from "./globalVariable";
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
	const {reload, setReload} = useGlobalState()

	const navigationBar = [true, false, false, false]
	const [navigationbar, setNavigationbar] = useState(navigationBar);

  const changeState = (change: React.ReactNode, toggle?:string) => {
    setMain(change)
    if (toggle && toggle === 're-render') {
	setReload(!reload);
    }

//     const updatedNavigationbar = navigationBar.map((item, index) =>
//       index === position ? true : false
//     );
//     setNavigationbar(updatedNavigationbar);
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
					img={
						// navigationbar[0]? home : 
						dimHome}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={"mt-3"}
					changeState={() => changeState(dashboard)}
				/>
				<SideBar
					img={
						// navigationbar[1]? apps :
						 dimApps}
					tab={"Deals"}
					heading={""}
					classList={""}
					changeState={() => changeState(deals, 're-render')}
				/>
				<SideBar
					img={
						// navigationbar[2]? bell:
						 dimBell}
					tab={"Notifications"}
					heading={""}
					classList={""}
					changeState={() => changeState(notification)}
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
