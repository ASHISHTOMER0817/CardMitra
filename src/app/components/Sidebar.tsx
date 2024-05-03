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
	changeState: string;
	tabClassList: string;
}
const SideBar = ({
	img,
	reactIcon,
	tab,
	heading,
	classList,
	changeState,
	tabClassList,
}: sidebar) => {
	return (
		<>
			{
				heading && <div className={`font-semibold mb-3 ${classList}`}>{heading}</div>
			}
			<Link
				className={`flex cursor-pointer items-center my-3 font-medium ${ tab && 'gap-x-3'}`}
				href={changeState}
			>
				{img?<Image src={img} alt={""} />:reactIcon}
				{tab && <div className={`text-sm ${tabClassList}`}>{tab}</div>}
			</Link>
		</>
	);
};

export default SideBar;
