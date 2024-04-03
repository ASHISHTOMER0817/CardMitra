'use client'
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import logo from "@/../public/logo.svg";
import home from "@/../public/Home.svg";
import bell from "@/../public/bell.svg";
import apps from "@/../public/Apps.svg";
import help from "@/../public/Help.svg";
import Deals from "../components/Deals";
import Link from "next/link";

const Dashboard = () => {
      const [main, setMain] = useState<ReactNode>(<Deals/>) 

      const SideBar = (
            img: string,
            tab?: string,
            heading?: string,
            classList?: string,
            node? : ReactNode
            
      ) => {
            return (
                  <div className={classList}>
                        {heading && (
                              <div className="font-semibold mb-3">{heading}</div>
                        )}
      
                        <div onClick={()=>setMain(node)} className="flex items-center font-medium gap-x-3">
                              <Image src={img} alt={""} />
                              <div className="text-sm">{tab}</div>
                        </div>
                  </div>
            );
      };
	return (
		<div className="flex items-start">
			<section className=" px-6 py-6 gap-6 flex flex-col min-h-screen items-start top-0 justify-between border-r-[5px] border-r-gray-300 sticky">
				{SideBar(logo)}
				{SideBar(home, "Dashboard", "MENU", "mt-3")}
				{SideBar(bell, "Deals",undefined,undefined, <Deals/>)}
				{SideBar(apps, "Notifications")}
				{SideBar(help, "Chat support", "SUPPORT", "mt-auto")}
			</section>
			<section className="mx-auto">
				{main}
			</section>
		</div>
	);
};

export default Dashboard;
