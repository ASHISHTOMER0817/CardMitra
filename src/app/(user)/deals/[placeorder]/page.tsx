'use client'
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderForm from "@/app/components/OrderForm";
import productList, { Data } from "@/interface/productList";
import ProductDetails from "@/app/components/ProductDetails";
import { pointsToRemember } from "@/app/components/pointsToRemember";
import Loader from "@/app/components/loader";
import CardLayout from "@/app/components/CardLayout";
import Link from "next/link";

const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<Data>();
	const [arr, setArr] = useState<string[]>([])

	useEffect(() => {
		async function getData() {
			try {
				console.log(params.placeorder)
				const response = await axios.get(
					`/api/users/productData?query=${params.placeorder}`
				);
				console.log(params.placeorder);
				setData(response.data.data);
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
				const response = await axios.get(
					"/api/orders/products?limit=three"
				);

				setProductList(response.data.data);
				const {info} = response.data.data
				setArr(pointsToRemember(info))
				console.log(response.data.data);
			} catch (error) {
				console.log(error);
			}
		}
		getData();
	}, []);

	// const placeOrder = () => {};
	return (
		<>
			<div className="mt-16 mx-10 w-[90%]">
				<section className="flex items-start text-sm justify-around">
					<div className="flex flex-col items-start gap-10 justify-around">
						<ProductDetails data={data!} arr={arr} />
					</div>
					<div className="border px-10 py-7 rounded-2xl">
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
					<div className="grid grid-flow-row gap-3 grid-cols-3">
						 {/* <CardLayoutForDeals data={productList!} /> */}
						 {!productList ? <Loader/> : productList.products.length >0 ? productList?.products.map(
				(
					{
						_id,
						requirement,
						name,
						price,
						commission,
						site,
						image,
						cards
					},
					index
				) => {
					return (
						<>
							<CardLayout
								key={index}
								
								placeOrder={
									<button
										className={`bg-primaryBgClr p-[14px] font-semibold text-base ${
											requirement >
												0 &&
												productList.user
												.isApprove !==
												false
												? ""
												: "bg-gray-400"
										} rounded-full border text-center w-auto text-white`}
									>
										{requirement > 0 &&
										productList.user
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
								
								quantity={requirement}
								name={name}
								price={price}
								commission={commission}
								site={site}
								deviceImage={image}
								cards={cards}
							/>
						</>
					);
				}
			): <div className="text-red-500 font-serif mx-auto w-fit ">No other products to order</div>}
					</div>
				</section>
			</div>
		</>
	);
};

export default Placeorder;
