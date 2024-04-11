import React from "react";
import NavigationSidebar from "../../components/NavigationSidebar";
import SideBar from "../../components/Sidebar";
import heroicon from "@/../public/heroicon.svg";
import Heroicon from "@/app/components/Heroicon";
const Admin = () => {
	return (
		<div>
			<NavigationSidebar
				dashboard={undefined}
				deals={undefined}
				notification={undefined}
				help={undefined}
				Children={
					<SideBar
						img={heroicon}
						tab={"heroicon"}
						heading={""}
						classList={""}
						changeState={() => <Heroicon />}
					/>
				}
			/>
		</div>
	);
};

export default Admin;
