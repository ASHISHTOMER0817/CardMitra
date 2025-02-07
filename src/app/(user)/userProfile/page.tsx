"use client";
// import BackwardButton from "@/app/components/BackwardButton";
// import UserOrders from "@/app/components/userOrders";
import axios from "axios";
import React, { ReactNode, Suspense, useEffect, useState } from "react";
// import { RxCross1 } from "react-icons/rx";
import { UserDetails, order, user } from "@/interface/productList";
import Popup from "@/app/components/Popup";
import Loader from "@/app/components/loader";
import Transactions from "@/app/components/transactions";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { VscEdit } from "react-icons/vsc";
import { GoCodeReview } from "react-icons/go";

import Link from "next/link";

const InfoCard = ({ title, children }:{title:string | undefined, children:ReactNode}) => (
	<div className="bg-white shadow-md rounded-[8px] overflow-hidden">
	  <div className="px-6 py-4 md:px-4 md:py-3 sm:px-3 sm:py-2 bg-gray-50 border-b">
	    <h3 className="text-lg md:text-base sm:text-sm font-semibold text-gray-800">{title}</h3>
	  </div>
	  <div className="p-6 md:p-4 sm:p-3 space-y-4 md:space-y-3 sm:space-y-2">{children}</div>
	</div>
);
    
const InfoItem = ({ label, value }:{label:string | undefined, value:string |undefined}) => (
	<div className="flex justify-between items-center">
	<span className="text-base md:text-sm sm:text-xs text-gray-600">{label}:</span>
	<span className="text-base md:text-sm sm:text-xs font-medium">{value}</span>
	</div>
);

const UserProfile = () => {
	const [data, setData] = useState<{
		user: user;
		// verifiedAmt: string;
		balance: number;
		// orderList:order[]
	}>();

  useEffect(()=>{
    async function getData(){
      try{
        const res = await axios.get("/api/users/profile")
        if(!res.data.success) return Popup("error","something went wrong, please refresh");
        setData(res.data.data)
      }catch(error){
        Popup("error", "something went wrong, please refresh");
        return;
      }
    }
    getData()
  }, [])

  // console.log(data?.user?._id, 'and this is suer id')
	return (
		<>

  <div className="max-w-6xl mx-auto sm:px-0">
      <div className="flex  justify-between items-start md:items-center sm:mb-4">
        <h1 className="text-3xl md:text-2xl sm:text-xl font-bold text-gray-800 mb-4 md:mb-0">{data?.user.name}</h1>
        <div className="flex space-x-4 md:space-x-3 sm:space-x-2 flex-wrap justify-end">
          <Link
            href="/editUserDetails"
            className="btn btn-outline btn-sm px-3 py-2 md:px-2 md:py-1 sm:text-xs hover:bg-gray-100 transition-colors duration-200"
          >
            Edit Profile
          </Link>
          <Link
            href="/reviewForm"
            className="btn btn-primary btn-sm px-3 py-2 md:px-2 md:py-1 sm:text-xs hover:bg-gray-100 transition-colors duration-200"
          >
            Submit Feedback
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-[8px] overflow-hidden mb-8 md:mb-6 sm:mb-4">
        <div className="p-6 md:p-4 sm:p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold mb-4 md:mb-3 sm:mb-2">Earnings Overview</h2>
          <div className="flex justify-between items-center md:flex-col md:items-start">
            <div className="md:mb-3">
              <p className="text-base md:text-sm">Total Earnings</p>
              <p className="text-3xl md:text-2xl sm:text-xl font-bold">₹{data?.user.paid}</p>
            </div>
            <div>
              <p className="text-sm md:text-xs mb-1 underline underline-offset-4 font-semibold">Pending Verified Amount{" "}-{" "}{data?.balance}</p>
              {/* <p className="text-base md:text-sm">Verified: ₹{data?.user?.unpaid}</p> */}
              {/* <p className="text-base md:text-sm">Unverified: ₹{data?.unverifiedAmt}</p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-1 gap-8 md:gap-6 sm:gap-4 mb-8 md:mb-6 sm:mb-4">
        <InfoCard title="Personal Information">
          <InfoItem label="Name" value={data?.user.name} />
          <InfoItem label="Email" value={data?.user.email} />
          <InfoItem label="Contact" value={data?.user.contact} />
        </InfoCard>

        <InfoCard title="Bank Details">
          <InfoItem label="Account Number" value={data?.user.accountNo} />
          <InfoItem label="IFSC Code" value={data?.user.ifsc} />
          <InfoItem label="UPI ID" value={data?.user.upi} />
        </InfoCard>
      </div>

      <div className="bg-white shadow-lg rounded-[8px] overflow-hidden">
        <div className="px-6 py-4 md:px-4 md:py-3 sm:px-3 sm:py-2 bg-gray-50 border-b">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-gray-800">Transactions</h2>
        </div>
        <div className="p-6 md:p-4 sm:p-0">
        {data?.user?._id && <Transactions _id={data?.user?._id} user={true} />}  
        </div>
      </div>
    </div>
		</>
	);
};

export default UserProfile;
