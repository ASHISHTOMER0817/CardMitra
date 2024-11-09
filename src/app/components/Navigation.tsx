'use client'

import { ReactNode, useEffect, useRef, useState } from "react";
import OptionLink, { Logout } from "./Sidebar";
import logo from "@/../public/logo.svg";
import arrow from "@/../public/arrow.svg";

import Image from "next/image";
import { RxDragHandleHorizontal } from "react-icons/rx";

interface Options {
      options: {
            icon: string,
            name: string,
            link: string,
            activeIcon: string
      }[]
}

const Navigation:React.FC<Options> = ({options}) =>{

      const [isMobile, setIsMobile] = useState(1);
      const [menuVisible, setMenuVisible] = useState(false);

      const sidebarRef = useRef<HTMLDivElement>(null);
      const buttonRef = useRef<HTMLButtonElement>(null);

      const handleResize = () =>{
            setIsMobile(window.innerWidth);
      }

      const handleMenuVisiblity = (width: number) =>{
            if(width>638){
                  setMenuVisible(true);
            }
      }

      const handleClickOutside = (event: MouseEvent) => {
           console.log('width: ', window.innerWidth)
            if (window.innerWidth<=638 && sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && !buttonRef.current?.contains(event.target as Node)) {
                  setMenuVisible(false);
            }
      }

      useEffect(()=>{
            setIsMobile(window.innerWidth);
            handleMenuVisiblity(window.innerWidth);
            window.addEventListener('resize', handleResize);

            document.addEventListener('click', handleClickOutside);

            return () => {
                  window.removeEventListener('resize', handleResize);
                  document.removeEventListener('click', handleClickOutside);
            }

      }, [])

      const onSidebarButtonClick =() =>{
            setMenuVisible(!menuVisible);
      }

      return <div className="flex fixed h-full z-10">

            { menuVisible &&
                  <aside ref={sidebarRef} className={` ${isMobile > 638 ? 'w-20' : ''} overflow-hidden flex p-4 flex-col duration-300 gap-4 hover:w-48 side-navigation`} style={{borderRight: '3px solid grey', background: 'white', zIndex: 9}}>
                        <Image src={logo} alt="icon" className="mb-4" style={{alignSelf: 'center'}}/>
                        {
                              options.map((opt)=>{
                                    return <OptionLink key={opt.name} link={opt.link} name={opt.name} icon={opt.icon} activeIcon={opt.activeIcon}  />
                              })
                        }
                        <Logout />
                  </aside>
            }
            { isMobile < 638 && isMobile > 1 &&
                  <button ref={buttonRef} className="h-12 p-2 side-navigation-button" style={{borderTopRightRadius: '12px', borderBottomRightRadius: '12px', background: '#e3e3e3', alignSelf: 'center'}} onClick={onSidebarButtonClick}>
                        <Image src={arrow} height={16} width={16} alt="left image" />
                  </button>
            }

      </div>
}

export default Navigation;