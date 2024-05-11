'use client'
import React, { ReactNode, useState } from "react";
import logo from "@/../public/logo.svg";
import "react-toastify/dist/ReactToastify.css";

// import dimBell from "@/../public/dimBell.svg";
// import home from "@/../public/Home.svg";
// import apps from "@/../public/apps.svg";
// import bell from "@/../public/bell.svg";
// import dimApps from "@/../public/dimApps.svg";
// import helpicon from "@/../public/Help.svg";
// import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
import { ToastContainer } from "@/app/components/nextToast";
import Popup from "./Popup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";

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
	firstSection: string;
	secondSection: string;

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
		image: ReactNode;
		name: string;
		changeState: string;
	};
}) => {
	const [classList, setClassList] = useState("items-center");
	const [visible, setVisible] = useState(
		"hidden transition-all duration-500"
	);
	const [sectionMR, setSectionMr] = useState("");
	const router = useRouter();

	function hoverability(
		classList: string,
		visibility: string,
		margin_right: string
	) {
		setClassList(classList);
		setVisible(visibility);
		setSectionMr(margin_right);
	}

	async function DeleteToken() {
		try {
			const response = await axios.delete("/api/deleteToken");
			if (!response.data.success) {
				return Popup("error", response.data.message);
			} else {
				Popup("success", response.data.message);
				setTimeout(() => {
					router.refresh();
				}, 1500);
			}
		} catch {
			Popup("error", "failed to logout, refresh the page");
		}
	}

	return (
		<div className="flex items-start">
			<section
				className={` px-4 py-6 gap-3 transition-all duration-500 flex flex-col min-h-screen w-fit top-0 justify-start border-r-[5px] border-r-gray-300 sticky ${classList}`}
				onMouseEnter={() =>
					hoverability(
						"items-start",
						"",
						" transition-all duration-500"
					)
				}
				onMouseLeave={() =>
					hoverability(
						" items-center",
						"hidden",
						"transition-all duration-500"
					)
				}
			>
				<SideBar
					img={logo}
					changeState={firstSection}
					tabClassList={`mb-2`}
				/>
				<SideBar
					img={icon[0]}
					tab={"Dashboard"}
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
					reactIcon={fifthSection?.image}
					tab={fifthSection?.name}
					changeState={fifthSection?.changeState}
					tabClassList={visible}
				/>

				<hr className="border w-[100%]" />
				<SideBar
					deleteToken={DeleteToken}
					reactIcon={
						<TbLogout2 className="text-gray-700 w-6 h-6" />
					}
					tab={"Logout"}
					tabClassList={visible}
				/>
				
			</section>
			{main}
			<ToastContainer />
		</div>
	);
};

export default NavigationSidebar;
