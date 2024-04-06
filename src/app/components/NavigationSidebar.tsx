'use client'
import React, { ReactNode, useState } from "react";
import logo from "@/../public/logo.svg";
import home from "@/../public/Home.svg";
import bell from "@/../public/bell.svg";
import apps from "@/../public/Apps.svg";
import helpicon from "@/../public/Help.svg";
import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
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

	function changeState(change: ReactNode) {
		setMain(change);
	}

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
					img={home}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={"mt-3"}
					changeState={() => changeState(dashboard)}
				/>
				<SideBar
					img={apps}
					tab={"Deals"}
					heading={""}
					classList={""}
					changeState={() => changeState(deals)}
				/>
				<SideBar
					img={bell}
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
