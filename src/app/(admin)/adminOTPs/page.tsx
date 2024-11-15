"use client";
import Loader from "@/app/components/loader";
import { order } from "@/interface/productList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OTPTable from "@/app/components/OTPTable";


const OTPHistory = () => {
    const [orders, setOrders] = useState<order[]>([]);

	async function getData() {
		try {
			const response = await axios.get(
				`/api/orders/otps`
			);
			// console.log( 'resp: ', response.data.data);
			setOrders(response.data.orders);
		} catch {
			console.log("what is happening here !!");
		}
	}

	useEffect(() => {
        getData();  
	}, []);

	return (
		<div className="flex flex-col mx-auto">
            <h5>Today&apos;s  OTPs</h5>

            {!orders ? (
                <Loader />
            ) : orders.length === 0 ? (
                <div className="mx-auto w-fit mt-20 text-red-500 font-serif">
                    No data to show !!
                </div>// Display this when the orders array is empty
            ) : (
                <OTPTable orders={orders} /> // Display OTPTable when data is available
            )}
        </div>
	);
};

export default OTPHistory;
