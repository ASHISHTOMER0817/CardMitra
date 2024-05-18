import { ReactNode } from "react";
import OptionLink, { Logout } from "./Sidebar";
import logo from "@/../public/logo.svg";

import Image from "next/image";

interface Options {
      options: {
            icon: string,
            name: string,
            link: string,
            activeIcon: string
      }[]
}

const Navigation:React.FC<Options> = ({options}) =>{

          

      return <aside className="fixed h-full overflow-hidden w-20 flex p-4 flex-col duration-300 gap-4 hover:w-48" style={{borderRight: '3px solid grey', background: 'white', zIndex: 9}}>
            <Image src={logo} alt="icon" className="mb-4"/>
            {
                  options.map((opt)=>{
                        return <OptionLink key={opt.name} link={opt.link} name={opt.name} icon={opt.icon} activeIcon={opt.activeIcon}  />
                  })
            }
            <Logout />
      </aside>
}

export default Navigation;