import Image from "next/image";
import phoneImg from "@/../public/phoneImg.svg"

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center text-center justify-between p-24">
			<section className="text-center">
				<h5 className="my-4">TOP RANKED SOLUTIONS</h5>
				<h1 className="font-extrabold ">
					Your One-Stop Solutions for Managing Phone Orders
				</h1>
				<h3 className="my-6">
					Streamline your phone order management
					effortlessly with our comprehensive solution
				</h3>
				<button className="px-7 py-6 mb-10">
					Become a Affiliate
				</button>
			</section>
			<section className="bg-black my-7 flex justify-center items-center text-center">
				{" "}
				<div className="font-extrabold text-white flex flex-col gap-y-3">
					{" "}
					<h1>20K+</h1>
					<div>Users</div>
				</div>
				<div className="font-extrabold text-white flex flex-col gap-y-3">
					<h1>10,000+</h1>
					<div>Phones</div>
				</div>
				<div className="font-extrabold text-white flex flex-col gap-y-3">
					<h1>400+</h1>
					<div>Deals</div>
				</div>
			</section>
			<section className="py-11 text-center">
        <div className="primaryBgClr mb-4">ABOUT US</div>
        <h1 className="">Simplify Phone Order Management</h1>
        <Image src={phoneImg} alt={"phones Image"} className="my-4"></Image>
        <h3>We&apos;re on a mission to Streamline phone order management. Our user-friendly platform empowers businesses and individuals to optimize their processes effortlessly. Join us and experience the convenience of seamless order management today</h3>
      </section>
			<section></section>
			<section></section>
		</main>
	);
}
