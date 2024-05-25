import fb from "@/../public/fb.svg";
import insta from "@/../public/Insta.svg";
// import whtsap from "@/../public/whatsapp.svg"
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import whtsap from "@/../public/whtsap.svg";
import footerDanda from "@/../public/FooterDanda.svg";
export default function Footer() {
	const danda = <Image src={footerDanda} alt={""} />;
	return (
		<section className="bg-primaryBgClr flex justify-around py-4 text-sm text-white px-10">
			<div className="flex gap-x-7 sm:gap-1">
				<Image src={whtsap} alt="" className="w-8 h-8" />
				<Image className=" w-8 h-8" src={insta} alt={""} />
				<div className="bg-white rounded-full">
					<Image
						className="w-8 h-8 p-[9px] "
						src={fb}
						alt={""}
					/>
				</div>
			</div>
			<div className="responsiveLink flex font-medium items-center justify-center gap-x-5 sm:gap-1 sm:text-nowrap">
				<div>Refund Policy</div>
				{danda}
				<div>Privacy Policy</div>
				{danda}
				<div>Terms and Conditions</div>
			</div>
		</section>
	);
}
