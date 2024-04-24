"use client";
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
	icon,
	main,
	firstSection,
	secondSection,
	thirdSection,
	fourthSection,
	fifthSection,
}: {
	icon: string[];
	main: ReactNode;
	// dealsAndhistory?: ReactNode;
	firstSection:string,
	secondSection:string


	thirdSection: {
		image: string;
		name: string;
		changeState: string;
	};
	fourthSection: {
		image: string;
		name: string;
		changeState: string;
	};
	fifthSection: {
		image: string;
		name: string;
		changeState: string;
	};
}) => {
	const [classList, setClassList] = useState(" items-center");
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
				className={` px-4 py-6 gap-3 transition-all duration-500 flex flex-col min-h-screen w-fit top-0 justify-between border-r-[5px] border-r-gray-300 sticky ${classList}`}
				onMouseEnter={() => hoverability("items-start", "", " transition-all duration-500")}
				onMouseLeave={() => hoverability(" items-center", "hidden", "transition-all duration-500")}
			>
				<SideBar
					img={logo}
					changeState={firstSection}
					tabClassList={`mb-2`}
				/>
				<SideBar
					img={icon[0]}
					tab={"Dashboard"}
					heading={"MENU"}
					classList={`mt-3 ${sectionMR}`}
					changeState={secondSection}
					tabClassList={visible}
				/>
				<hr className="border w-[100%]" />
				<SideBar
					img={thirdSection.image}
					tab={thirdSection.name}
					changeState={thirdSection.changeState}
					tabClassList={visible}
				/>
				<hr className="border w-[100%]" />
				<SideBar
					img={fourthSection.image}
					tab={fourthSection.name}
					changeState={fourthSection.changeState}
					tabClassList={visible}
				/>

				<hr className="border w-[100%]" />
				<SideBar
					img={fifthSection?.image}
					tab={fifthSection?.name}
					changeState={fifthSection?.changeState}
					tabClassList={visible}
				/>

				<hr className="border w-[100%]" />
				<SideBar
					img={icon[1]}
					tab={"Notifications"}
					changeState={"/notifications"}
					tabClassList={visible}
				/>
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
