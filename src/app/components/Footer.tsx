import fb from "@/../public/fb.svg";
import insta from "@/../public/Insta.svg";
// import whtsap from "@/../public/whatsapp.svg"
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import footerDanda from "@/../public/FooterDanda.svg"
export default function Footer() {
      const danda = <Image src={footerDanda} alt={""}/>
	return (
		<section className="bg-primaryBgClr flex justify-around py-4 text-sm text-white px-10">
			<div className="flex gap-x-7 ">
				{/* <div className="bg-white rounded-full"> */}
					<FaWhatsapp
						
						className=" w-12 h-12 rounded-full p-[5px] text-primaryBgClr bg-white"
					/>
				{/* </div> */}

				<div className="bg-white rounded-full">
					<Image
						className="p-[9px] w-12 h-12"
						
						src={insta}
						alt={""}
					/>
				</div>
				<div className="bg-white rounded-full">
					<Image className="w-12 h-12 p-[9px]" src={fb} alt={""} />
				</div>
			</div>
			<div className="responsiveLink flex items-center justify-center gap-x-5">
				<div>Refund Policy</div>{danda}
				<div>Privacy Policy</div>{danda}
				<div>Terms and Conditions</div>
			</div>
		</section>
	);
}
