"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
	main,
	firstSection,
	secondSection,
	thirdSection,
}: {
	Children?: ReactNode;
	icon: string[];
	main: ReactNode;
	dealsAndhistory?: ReactNode;
	firstSection: {
		image: string;
		name: string;
		changeState: string;
	};
	secondSection: {
		image: string;
		name: string;
		changeState: string;
	};
	thirdSection?: {
		image: string;
		name: string;
		changeState: string;
	};
}) => {
	const [classList, setClassList] = useState("w-[82px]");
	const [visible, setVisible] = useState("hidden transition-all duration-500");
	const [sectionMR, setSectionMr] = useState("")

	function hoverability(classList: string, visibility: string,margin_right:string) {
		setClassList(classList);
		setVisible(visibility);
		setSectionMr(margin_right)
	}

	return (
		<div className="flex items-start">
			<section
				className={` px-6 py-6 gap-3 transition-all duration-500 flex flex-col min-h-screen items-start top-0 justify-between border-r-[5px] border-r-gray-300 sticky ${classList}`}
				onMouseEnter={() => hoverability("", "", "mr-12 transition-all duration-500")}
				onMouseLeave={() => hoverability("w-[82px]", "hidden", "transition-all duration-500")}
			>
				<SideBar
					img={logo}
					changeState={"/"}
					classList={`mb-2`}
					tabClassList={visible}
				/>
				<SideBar
					img={icon[0]}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={`mt-3 ${sectionMR}`}
					changeState={"/dashboard"}
					tabClassList={visible}
				/>
				<hr className="border  w-[100%]" />
				<SideBar
					img={firstSection.image}
					tab={firstSection.name}
					changeState={firstSection.changeState}
					tabClassList={visible}
				/>
				<hr className="border w-[100%]" />
				<SideBar
					img={secondSection.image}
					tab={secondSection.name}
					changeState={secondSection.changeState}
					tabClassList={visible}
				/>

				<hr className="border w-[100%]" />
				<SideBar
					img={thirdSection?.image!}
					tab={thirdSection?.name}
					changeState={thirdSection?.changeState!}
					tabClassList={visible}
				/>

				<hr className="border w-[100%]" />
				<SideBar
					img={icon[1]}
					tab={"Notifications"}
					changeState={"/notifications"}
					tabClassList={visible}
				/>
				<hr className="border w-[100%]" />
				{Children}
				<SideBar
					img={icon[2]}
					tab={"Chat support"}
					heading={"SUPPORT"}
					classList={"mt-auto"}
					changeState={"/help"}
					tabClassList={visible}
				/>
			</section>
			{main}
		</div>
	);
};

export default NavigationSidebar;
