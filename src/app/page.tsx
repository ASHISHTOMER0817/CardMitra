import Image from "next/image";
import phoneImg from "@/../public/phoneImg.svg";
import { GoBell } from "react-icons/go";
import { CiRoute } from "react-icons/ci";
import { IoCubeOutline } from "react-icons/io5";
import vector from "@/../public/Vector.svg";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
	const image = <Image src={vector} alt={""}></Image>;
	return (
		<>
			<Header />
			<main className=" min-h-screen text-center">
				<section className="text-center px-10 py-24">
					<h5 className="my-4 text-primaryBgClr">
						TOP RANKED SOLUTIONS
					</h5>
					<h1 className="font-extrabold ">
						Your One-Stop Solutions for <br /> Managing
						Phone Orders
					</h1>
					<h3 className="my-6 text-gray-400">
						Streamline your phone order management
						effortlessly <br /> with our comprehensive
						solution
					</h3>
					<button className="px-7 py-4 mb-10 rounded-[36px] bg-primaryBgClr font-bold text-white">
						Become a Afilliate
					</button>
				</section>
				<section className="bg-black text-white px-10 py-10 flex justify-evenly  items-center">
					{" "}
					<div className="font-extrabold text-white flex flex-col gap-y-4">
						{" "}
						<h1 className="text-[52px]">20K+</h1>
						<h3 className="text-gray-400 font-semibold">
							Users
						</h3>
					</div>
					{image}
					<div className="font-extrabold text-white flex flex-col gap-y-4">
						<h1 className="text-[52px]">10,000+</h1>
						<h3 className="text-gray-400 font-semibold">
							Phones
						</h3>
					</div>
					{image}{" "}
					<div className="font-extrabold text-white flex flex-col gap-y-3">
						<h1 className="text-[52px]">400+</h1>
						<h3 className="text-gray-400 font-semibold">
							Deals
						</h3>
					</div>
				</section>
				<section className="py-[3.75rem] text-center px-10">
					<div className=" text-primaryBgClr mb-8">
						ABOUT US
					</div>
					<h1 className="font-extrabold">
						Simplify Phone Order <br />
						Management
					</h1>
					<Image
						src={phoneImg}
						alt={"phones Image"}
						className="my-12 mx-auto"
					></Image>
					<h3 className="text-gray-400">
						We&apos;re on a mission to Streamline phone
						order management. Our <br /> user-friendly
						platform empowers businesses and individuals
						to <br /> optimize their processes
						effortlessly. Join us and experience the{" "}
						<br />
						convenience of seamless order management
						today
					</h3>
				</section>
				<section className="text-center py-24 px-10 bg-black text-white">
					<div className="text-primaryBgClr mb-8">
						OUR FEATURES
					</div>
					<h1 className="font-extrabold ">
						Unlock the power of seamless <br />
						phone Order Management
					</h1>
					<div className="flex justify-center gap-x-32 mt-12 items-center text-left mt-">
						<div className="flex flex-col p-5 rounded-3xl bg-gray-700 justify-start gap-y-3">
							<GoBell className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

							<div className="text-lg">
								Real-Time Order Alerts
							</div>
							<div className="text-gray-400">
								Instant alerts for new <br />{" "}
								orders and updates for <br />{" "}
								seamless order <br /> management
							</div>
						</div>
						<div className="flex flex-col p-3 rounded-3xl bg-gray-700 justify-start gap-y-3">
							<CiRoute className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />

							<div className="text-lg">
								Customizable Management
							</div>
							<div className="text-gray-400">
								Get promotions <br />{" "}
								effortlessly. Set <br />{" "}
								discounts, deals, <br />{" "}
								quantities & validity
							</div>
						</div>
						<div className="flex flex-col p-3 rounded-3xl bg-gray-700 justify-start gap-y-3">
							<IoCubeOutline className="w-12 h-12 rounded-3xl p-2 text-white bg-primaryBgClr" />
							<div className="text-lg">
								Advanced Order Tracking
							</div>
							<div className="text-gray-400">
								Effortlessly track orders,{" "}
								<br /> gain insights, provide{" "}
								<br /> unparalleled customer{" "}
								<br /> service
							</div>
						</div>
					</div>
				</section>
				<section className="pt-24 pb-24 px-10">
					<div className="text-primaryBgClr mb-8">
						BECOME AN AFFILIATE
					</div>
					<h1 className="my-12 font-extrabold">
						Join Our Affiliate Program <br /> & Start
						Earning Today
					</h1>
					<div className="py-12 px-8 bg-gray-200 flex justify-center gap-x-[17rem] items-center">
						<div className="text-left">
							<h2 className=" font-medium">
								Fill the form
							</h2>
							<h5 className="text-gray-400 mt-3 leading-normal">
								Begin your journey to affiliate{" "}
								<br /> success by completing the
								form
							</h5>
						</div>
						<div className="text-sm flex flex-col gap-y-5 items-center justify-center">
							<input
								type="name"
								placeholder="Name"
								className="py-4 px-3 w-96 outline-none rounded-3xl"
							/>
							<input
								type="email"
								placeholder="Email"
								className="py-4 px-3 w-96 outline-none rounded-3xl"
							/>
							<input
								type="number"
								placeholder="Phone Number"
								className="py-4 px-3 w-96 outline-none rounded-3xl"
							/>
							<button className="py-4 w-96 font-extrabold hover:text-gray-200 bg-primaryBgClr text-white rounded-3xl">
								Send Request
							</button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
