'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrowleft from "@/../public/ArrowLeft.svg";
import cardVerticalLine from "@/../public/cardVerticalLine.svg";
import cards from "@/../public/cards.svg";
import platform from "@/../public/platform.svg";
import Link from "next/link";
import OrderForm from "@/app/components/OrderForm";
import phoneImage from "@/../public/phoneImage.jpg";
// import phoneImage from "@/../public/phoneImage.jpg";
// import CardLayoutForDeals from "@/app/components/cardLayoutForDeals";
import NavigationSidebar from "@/app/components/NavigationSidebar";
import Dashboard from "@/app/components/user/Dashboard";
import Help from "@/app/components/help";
import Notification from "@/app/components/Notification";
import productList from "@/interface/productList";
import CardLayout from "@/app/components/CardLayout";
import { CiShoppingCart } from "react-icons/ci";
import { IoHeartOutline } from "react-icons/io5";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";
import ProductDetails from "@/app/components/ProductDetails";
const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<productList[]>([]);
	const objectid = params.placeorder;

	useEffect(() => {
		async function getData() {
			try {
				const response = await axios.post(
					"/api/users/placeOrder",
					{ objectid }
				);
				  setData(response.data.data);
				console.log(response.data.message, response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, [objectid, params]);

	useEffect(() => {
		async function similarProducts() {
			try {
				const response = await axios.get(
					"/api/users/similarProducts"
				).then()
				 setProductList( await response.data.data)
				
				console.log(response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		similarProducts();
	}, []);



	// const placeOrder = () => {};
	return (
		<>
			<div className="mt-16 mx-32 w-full">
				<Link href={"/deals"}>
					<Image
						className="mb-6 w-6 h-6"
						src={arrowleft}
						alt={""}
					/>
				</Link>
				{
					<section className="flex items-start text-sm justify-around">
						<div className="flex flex-col items-start gap-10 justify-around">
							<ProductDetails data={data!} />
							{/* <TestProductDetails name={data?.name!} price={data?.price!} commission={data?.commission!} productLink={data?.productLink!}/> */}
						</div>
						<div className="border px-10 py-7 rounded-2xl">
							<div className="text-base font-semibold text-primaryBgClr text-center">
								Order Form
							</div>
							<hr className="my-5" />
							<OrderForm objectId={objectid} />
						</div>
					</section>
				}
				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						Similar Products
					</div>
					<div className="grid grid-flow-row gap-3 grid-cols-3">
						<CardLayoutForDeals data={productList} />
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
