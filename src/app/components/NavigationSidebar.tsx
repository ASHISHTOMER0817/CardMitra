'use client'
import React, { ReactNode, useState } from "react";
import logo from "@/../public/logo.svg";
// import dimBell from "@/../public/dimBell.svg";
// import home from "@/../public/Home.svg";
// import apps from "@/../public/apps.svg";
// import bell from "@/../public/bell.svg";
// import dimApps from "@/../public/dimApps.svg";
// import helpicon from "@/../public/Help.svg";
// import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
// import dimHome from "@/../public/dimHome.svg";
// import { useContext } from "react";
// import { useGlobalState } from "./globalVariable";
const NavigationSidebar = ({
	Children,
	icon,
	main
}: {
	Children?: ReactNode;
	icon:string[],
	main:ReactNode
}) => {
	 
	return (
		<div className="flex items-start">
			<section className=" px-6 py-6 gap-6 flex flex-col min-h-screen items-start top-0 justify-between border-r-[5px] border-r-gray-300 sticky">
				<SideBar
					img={logo}
					tab={""}
					heading={""}
					classList={""}
					changeState={'/'}
				/>
				<SideBar
					img={
						icon[0]
					}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={"mt-3"}
					changeState={'/dashboard'}
				/>
				<SideBar
					img={
						icon[1]
					}
					tab={"Deals"}
					heading={""}
					classList={""}
					changeState={'/deals'}
				/>
				<SideBar
					img={
						icon[2]
					}
					tab={"Notifications"}
					heading={""}
					classList={""}
					changeState={'/notifications'}
				/>
				<SideBar
					img={
						icon[3]
					}
					tab={"Order History"}
					heading={""}
					classList={""}
					changeState={'/odrHistory'}
				/>
				<SideBar
					img={icon[4]}
					tab={"Chat support"}
					heading={"SUPPORT"}
					classList={"mt-auto"}
					changeState={'/help'}
				/>
				{Children}
			</section>
			{main}
			</div>
	);
};

export default NavigationSidebar;
