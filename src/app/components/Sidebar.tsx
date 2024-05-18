'use client'
// // import { ReactNode } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import logout from "@/../public/static/logout.svg"
import Popup from "./Popup";
import axios from "axios";


// interface sidebar {
// 	img?: string;
// 	reactIcon?:ReactNode
// 	tab?: string;
// 	heading?: string;
// 	classList?: string;
// 	changeState?: string;
// 	tabClassList: string;
// 	deleteToken?:()=>void
// }
// const SideBar = ({
// 	img,
// 	reactIcon,
// 	tab,
// 	heading,
// 	classList,
// 	changeState,
// 	tabClassList,
// 	deleteToken
// }: sidebar) => {
// 	return (
// 		<>
// 			{
// 				heading && <div className={`font-semibold mb-3 ${classList}`}>{heading}</div>
// 			}
// 			<Link onClick={deleteToken}
// 				className={`flex cursor-pointer items-center my-3 font-medium ${ tab && 'gap-x-3'}`}
// 				href={!changeState ? '': changeState}
// 			>
// 				{img? <Image src={img} className="min-w-[30px] min-h-7" alt={""} />:reactIcon}
// 				{tab && <div className={`text-sm text-nowrap ${tabClassList}`}>{tab}</div>}
// 			</Link>
// 		</>
// 	);
// };

// export default SideBar;

interface OptionLinkInterface{
	icon: string,
	name: string,
	link: string,
	activeIcon: string
}

const OptionLink:React.FC<OptionLinkInterface> = ({icon, name, link, activeIcon}) =>{

	const iconToBeUsed = usePathname() === link ? activeIcon: icon;
	const textPrimary = usePathname() === link ? 'text-primaryBgClr': ''

	return <div className="p-[9px] overflow-hidden">
		<Link href={link} className={'flex items-center '}>
			<Image src={iconToBeUsed} className="w-7 h-7" alt="icon"/>
			<h6 className={`pl-[9px] text-nowrap ${textPrimary} text-[16px]`}>{name}</h6>
		</Link>
	</div>
}

export default OptionLink;


export const Logout = () =>{
	const Router = useRouter();

      async function DeleteToken() {
		try {
			const response = await axios.delete("/api/deleteToken");
			if (!response.data.success) {
				return Popup("error", response.data.message);
			} else {
				Popup("success", response.data.message);
				setTimeout(() => {
					Router.refresh();
				},600);
			}
		} catch {
			Popup("error", "failed to logout, refresh the page");
		}
	}  

	return (
		<div className="p-[9px] overflow-hidden">
                  <Link href={'#'} className={'flex items-center '} onClick={DeleteToken}>
                        <Image src={logout} className="w-7 h-7" alt="icon"/>
                        <h6 className={`pl-[9px] text-nowrap text-[16px]`}>Logout</h6>
                  </Link>
            </div>
	)
}


