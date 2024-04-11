// import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface sidebar {
	img: string;
	tab: string;
	heading: string;
	classList: string;
	changeState: string;
}
const SideBar = ({ img, tab, heading, classList, changeState }: sidebar) => {
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
				<div className="text-sm">{tab}</div>
			</Link>
		</div>
	);
};

export default SideBar;
