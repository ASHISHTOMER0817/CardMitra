"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Data, SpecialQuantity } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import Loader from "@/app/components/loader";
import Link from "next/link";
import CardLayout from "@/app/components/CardLayout";

const Deals = () => {
	const [data, setData] = useState<SpecialQuantity[]>([]);

	useEffect(() => {

		async function getData() {
			try {
				const response = await axios.get(
					"/api/admin/getSpecialQuantity"
				);
				const allProducts = response.data.data;
				// console.log(allProducts);
				setData(allProducts);
			} catch {
				Popup(
					"error",
					"Something went wrong, REFRESH THE PAGE"
				);
				console.log("Something went wrong, REFRESH THE PAGE");
			}
		}
		getData();

	}, []);

	return (
		<div className="">
			<h3 className="mb-4 mr-auto font-semibold">Special Requests</h3>
			<div className="flex gap-6 flex-wrap justify-center">

                {
                    data? data.length? (
                        <div className="overflow-x-auto bg-white shadow-md rounded-[8px] min-w-full">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-green-100">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fullfilled</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
    
                                <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    data?.map(
                                        (
                                            {
                                                _id,
                                                product,
                                                user,
                                                quantity, 
                                                orderedQuantity
                                            },
                                            index
                                        ) => {
                                            return (
                                                     
                                                <tr key={'SP'+index} className={ index%2 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.address}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quantity}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{orderedQuantity || 0}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {orderedQuantity != quantity && 
                                                            <Link href={`/specialQuantity/${_id}`} className="text-primaryBgClr text-base sm:text-xs">
                                                                Place Order
                                                            </Link>
                                                        }
                                                    </td>
                                                </tr>
                                                        
                                            );
                                        }
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    )

                    : (<Loader />) 

                    : (<div className="text-red-500 font-serif mx-auto w-fit ">
                            No special quantity to show...
                        </div>)
                }
				
				
			</div>
		</div>
	);
};

export default Deals;
