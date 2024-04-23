// import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface sidebar {
	img: string;
	tab?: string;
	heading?: string;
	classList?: string;
	changeState: string;
	tabClassList:string
}
const SideBar = ({ img, tab, heading, classList, changeState, tabClassList }: sidebar) => {
	return (
		<div className={classList}>
			{heading && (
				<div className="font-semibold mb-3">{heading}</div>
			)}

			<Link
				className="flex cursor-pointer items-center font-medium gap-x-3"
				href={changeState}
			>
				<Image src={img} alt={""} />
				<div className={`text-sm ${tabClassList}`}>{tab}</div>
			</Link>
		</div>
	);
};

export default SideBar;
