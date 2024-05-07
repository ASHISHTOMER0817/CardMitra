// import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface sidebar {
	img?: string;
	reactIcon?:ReactNode
	tab?: string;
	heading?: string;
	classList?: string;
	changeState?: string;
	tabClassList: string;
	deleteToken?:()=>void
}
const SideBar = ({
	img,
	reactIcon,
	tab,
	heading,
	classList,
	changeState,
	tabClassList,
	deleteToken
}: sidebar) => {
	return (
		<>
			{
				heading && <div className={`font-semibold mb-3 ${classList}`}>{heading}</div>
			}
			<Link onClick={deleteToken}
				className={`flex cursor-pointer items-center my-3 font-medium ${ tab && 'gap-x-3'}`}
				href={!changeState ? '': changeState}
			>
				{img? <Image src={img} className="min-w-[30px] min-h-7" alt={""} />:reactIcon}
				{tab && <div className={`text-sm ${tabClassList}`}>{tab}</div>}
			</Link>
		</>
	);
};

export default SideBar;
