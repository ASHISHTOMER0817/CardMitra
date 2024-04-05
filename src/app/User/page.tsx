"use client";
import React from "react";
import Deals from "../components/Deals";
// import Link from "next/link";
import Dashboard from "../components/user/Dashboard";
import SideBar from "../components/Sidebar";
import Notification from "../components/Notification";
import NavigationSidebar from "../components/NavigationSidebar";
import Help from "@/app/components/help";
const User = () => {
	return (
		<NavigationSidebar
			dashboard={<Dashboard />}
			deals={<Deals />}
			notification={<Notification />}
			help={<Help />}
		/>
	);
};

export default User;
