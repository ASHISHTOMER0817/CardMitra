"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import OrderForm from "@/app/components/OrderForm";
import productList, { Data } from "@/interface/productList";
import ProductDetails from "@/app/components/ProductDetails";
import Loader from "@/app/components/loader";
import CardLayout from "@/app/components/CardLayout";
import Link from "next/link";
import BackwardButton from "@/app/components/BackwardButton";
import { useRouter } from "next/navigation";

export interface MyArrayItem {
	0: string; // First element in the subarray (e.g., 'first', 'second', 'third', 'fourth')
	1: string; // Second element in the subarray (e.g., '1st', 'kjhgvfcghjkmjhgvf', etc.)
}
const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<Data>();
	const [arr, setArr] = useState<Array<MyArrayItem>>([]);

	const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
	const [lockCreated, setLockCreated] = useState(false);
	const hasRun = useRef(false);

  	const router = useRouter();

	useEffect(()=>{

		if (hasRun.current) return; // Prevent duplicate calls

        hasRun.current = true;

		if(!lockCreated){

			setLockCreated(true);

			axios.post(
				`/api/orders/lockQuantity`,
				{productId: params.placeorder}
			).then((res)=>{
				console.log('res: ', res);
				setTimeLeft(parseInt(res.data.remainingTime));
			}).catch((err)=>{
				// router.push('/deals');
				console.log('err: ', err);
			})
		}

	}, [params.placeorder]);

	useEffect(() => {
		async function getData() {
			try {
				console.log(params.placeorder);
				const response = await axios.get(
					`/api/users/productData?query=${params.placeorder}`
				);
				console.log(params.placeorder);
				setData(response.data.data);
				const { info } = await response.data.data;
				console.log(info);

				console.log(Object.entries(info));
				setArr(Object.entries(info));

				console.log(response.data.message, response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, [params.placeorder]);

	useEffect(() => {
		async function getData() {
			try {
				console.log("yes this is working");
				const response = await axios.get(
					"/api/orders/products?limit=three"
				);

				setProductList(response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

	useEffect(() => {
		if (timeLeft <= 0) {
		  // Time's up! Redirect the user to a different page
		  
		  router.push("/deals"); // Redirect to the previous page or another page
		  return;
		}
	
		const timerId = setTimeout(() => {
		  setTimeLeft(timeLeft - 1); // Decrease time by 1 second
		}, 1000);
	
		return () => clearTimeout(timerId); // Cleanup the timer
	}, [timeLeft, router]);

	// Function to format the time in MM:SS format
	const formatTime = (seconds:number) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
	};

	const releaseQuantity = async () =>{

		axios.post(
			`/api/orders/unlockQuantity`,
			{productId: params.placeorder}
		).then((res)=>{
			router.push("/deals");
		}).catch((err)=>{
			console.log('err: ', err);
		})
	}

	// const placeOrder = () => {};
	return (
		<>
			<div className="sm:flex sm:flex-col">
				<div className="flex justify-between">
					<BackwardButton />
					<div className="text-[#FC0808] sm:w-full text-center">
						<span>Complete your order within {formatTime(timeLeft)} or </span>
						<button onClick={releaseQuantity} className="underline text-blue-800">Release Qty now</button>
					</div>
				</div>
				<section className="flex items-start text-sm justify-around sm:flex-col flex-wrap">
					<div className="flex flex-col items-start justify-around sm:gap-0 sm:w-full">
						{!data && !arr ? (
							""
						) : (
							<ProductDetails
								data={data!}
								arr={arr}
							/>
						)}
					</div>
					<div className="border px-10 py-7 rounded-2xl sm:py-3 sm:px-4 order-form">
						<div className="text-base font-semibold text-primaryBgClr text-center">
							Order Form
						</div>
						<hr className="my-5" />
						<OrderForm objectId={params.placeorder} />
					</div>
				</section>

				<hr className="my-5" />
				<section className="my-1 mb-3">
					<div className="text-base font-semibold mb-4">
						Similar Products
					</div>
					<div className="flex flex-wrap gap-4 items-center justify-center">
						{!productList ? (
							<Loader />
						) : productList.products.length > 0 ? (
							productList?.products
								.slice(0, 3)
								.map(
									(
										{
											_id,
											requirement,
											name,
											price,
											commission,
											site,
											image,
											cards,
										},
										index
									) => {
										return (
											<>
												<CardLayout
													key={
														index
													}
													placeOrder={
														<button
															className={`bg-primaryBgClr p-[14px]  font-semibold text-base ${
																requirement >
																	0 &&
																productList
																	.user
																	.isApprove !==
																	false
																	? " hover:bg-green-600"
																	: " bg-gray-400"
															} rounded-full border text-center w-auto text-white sm:mt-1 sm:px-1 sm:py-2 sm:font-medium sm:text-[10px] sm:text-nowrap sm:leading-4`}
														>
															{requirement >
																0 &&
															productList
																.user
																.isApprove !==
																false ? (
																<Link
																	href={`/deals/${_id.toString()}`}
																>
																	Fulfill
																	Order
																</Link>
															) : (
																"Fulfill Order"
															)}
														</button>
													}
													quantity={
														requirement
													}
													name={
														name
													}
													price={
														price
													}
													commission={
														commission
													}
													site={
														site
													}
													deviceImage={
														image
													}
													cards={
														cards
													}
												/>
											</>
										);
									}
								)
						) : (
							<div className="text-red-500 font-serif mx-auto w-fit  sm:text-[10px]">
								No other products to order
							</div>
						)}
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
