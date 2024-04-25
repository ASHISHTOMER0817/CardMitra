"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderForm from "@/app/components/OrderForm";
import productList from "@/interface/productList";
import CardLayoutForDeals from "@/app/components/CardLayoutForDeals";
import ProductDetails from "@/app/components/ProductDetails";
import Popup from "@/app/components/Popup";

const Placeorder = ({ params }: { params: { placeorder: string } }) => {
	const [data, setData] = useState<productList>();
	const [productList, setProductList] = useState<productList[]>([]);

	useEffect(() => {
		async function getData() {
			try {
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
		async function similarProducts() {
			try {
				const response = await axios
					.get("/api/users/similarProducts")
					.then();
				setProductList(await response.data.data);

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
			<div className="mt-16 mx-10 w-[90%]">
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
						<OrderForm objectId={params.placeorder} />
					</div>
				</section>

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
