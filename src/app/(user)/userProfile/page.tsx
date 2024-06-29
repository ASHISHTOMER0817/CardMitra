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




// const InfoCard = ({ title, children }:{title:string | undefined, children:ReactNode}) => {
// 	return(<div className="bg-white shadow-md rounded-lg overflow-hidden">
// 	  <div className="px-6 py-4 bg-gray-50 border-b">
// 	    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
// 	  </div>
// 	  <div className="p-6 space-y-4">
// 	    {children}
// 	  </div>
// 	</div>)
// };
    
//     const InfoItem = ({ label, value }:{label:string | undefined, value:string |undefined}) => {
// 	return(<div className="flex justify-between">
// 	  <span className="text-gray-600">{label}:</span>
// 	  <span className="font-medium">{value}</span>
// 	</div>)
//     };



const InfoCard = ({ title, children }:{title:string | undefined, children:ReactNode}) => (
	<div className="bg-white shadow-md rounded-lg overflow-hidden">
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
		verifiedAmt: string;
		totalUnVerifiedAmt: string;
		// orderList:order[]
	}>();

	useEffect(() => {
		async function getData() {
			try {
				console.log("useEffect starts");
				const response = await axios.get(`/api/users/details`);
				console.log(response.data.message);
				if (!response.data.success) {
					console.log("false success");
					return Popup(
						"error",
						"something went wrong, please refresh"
					);
				}
				setData(response.data.data);
			} catch {
				console.log("catchpart");
				Popup("error", "something went wrong, please refresh");
			}
		}
		getData();
	}, []);

	return (
		<>
			{/* <div className="w-[100%] mb-10 mx-auto sm:ml-0 mt-4 ">
				<div className="flex justify-between items-center flex-wrap gap-4 mb-4">
					<div className="w-full flex justify-between gap-2">
						<h3 className="font-semibold text-primaryBgClr w-full">
							{data?.user.name}
						</h3>
						<Link
							href="/editUserDetails"

							className="rounded-3xl float-right text-nowrap cursor-pointer flex py-1 px-2 border justify-center items-center border-gray-400 hover:border-gray-600 text-gray-500 hover:text-gray-600 sm:py-1 sm:text-[12px]"
						>
							Edit
							<VscEdit className="float-right ml-2" />
						</Link>
						<Link
							href="/reviewForm"
							className="rounded-3xl float-right text-nowrap cursor-pointer flex py-1 px-2 border justify-center items-center border-gray-400 hover:border-gray-600 text-primaryBgClr hover:text-green-600 sm:py-1 sm:text-[10px]"
						>
							Submit a Feedback
							<GoCodeReview className="float-right ml-2" />
						</Link>
					</div>

					<div className="p-3 flex bg-gray-200 rounded-[12px] w-full sm:flex-col justify-around">
						<div className="flex items-center text-lg sm:text-[14px] sm:leading-none">
							Earnings:{" "}
							<LiaRupeeSignSolid
								width={20}
								height={20}
								className="text-primaryBgClr"
							/>{" "}
							<div className="text-primaryBgClr font-bold">
								{data?.user.paid}
							</div>
						</div>
						<div className="text-gray-600 flex flex-col text-sm sm:text-[12px] sm:leading-none sm:mt-3">
							<div className="font-medium text-base sm:text-[11px]">
								pending amount{" "}
							</div>

							<div className="flex items-center">
								Verified:{" "}
								<LiaRupeeSignSolid
									width={10}
									height={10}
									className="under"
								/>{" "}
								{data?.verifiedAmt}
							</div>
							<div className="flex items-center mb-2">
								Unverified:{" "}
								<LiaRupeeSignSolid
									width={10}
									height={10}
									className="under"
								/>{" "}
								{data?.totalUnVerifiedAmt}
							</div>
						</div>
					</div>
				</div>
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[12px] sm:mb-1">
					PERSONAL
				</h6>
				<section className=" flex justify-between sm:text-[12px] flex-wrap  sm:flex-col sm:justify-start">
					<div>Name: {data?.user.name}</div>
					<div>Email: {data?.user.email}</div>
					<div>Contact: {data?.user.contact} </div>
				</section>

				<hr className="border w-full my-7" />
				<h6 className="text-gray-400 mb-4 text-sm font-semibold sm:text-[12px] sm:mb-1">
					BANK DETAILS
				</h6>

				<section className="flex justify-between sm:text-[12px] flex-wrap sm:flex-col sm:justify-start">
					<div>
						Bank Account Number: {data?.user.accountNo}
					</div>
					<div>IFSC Code: {data?.user.ifsc} </div>
					<div className="">UPI ID: {data?.user.upi}</div>
				</section>

				<h6 className="text-gray-400 text-sm mt-10 mb-4 rounded-full font-semibold">
					TRANSACTIONS
				</h6>

				{!data ? (
					<Loader />
				) : data?.user._id ? (
					<Transactions _id={data?.user._id} />
				) : (
					""
				)}
			</div> */}

{/* <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{data?.user.name}</h1>
        <div className="space-x-4">
          <Link
            href="/editUserDetails"
            className="btn btn-outline btn-sm"
          >
            Edit Profile
          </Link>
          <Link
            href="/reviewForm"
            className="btn btn-primary btn-sm"
          >
            Submit Feedback
          </Link>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-2xl font-semibold mb-4">Earnings Overview</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg">Total Earnings</p>
              <p className="text-3xl font-bold">₹{data?.user.paid}</p>
            </div>
            <div>
              <p className="text-sm">Pending Amount</p>
              <p className="text-lg">Verified: ₹{data?.verifiedAmt}</p>
              <p className="text-lg">Unverified: ₹{data?.totalUnVerifiedAmt}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
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

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
        </div>
        <div className="p-6">
          <Transactions _id={data?.user?._id!} />
        </div>
      </div>
    </div> */}
  

  <div className="max-w-6xl mx-auto px-4 sm:px-0">
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

      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8 md:mb-6 sm:mb-4">
        <div className="p-6 md:p-4 sm:p-3 bg-gradient-to-r from-green-400 to-blue-500 text-white">
          <h2 className="text-2xl md:text-xl sm:text-lg font-semibold mb-4 md:mb-3 sm:mb-2">Earnings Overview</h2>
          <div className="flex justify-between items-center md:flex-col md:items-start">
            <div className="md:mb-3">
              <p className="text-base md:text-sm">Total Earnings</p>
              <p className="text-3xl md:text-2xl sm:text-xl font-bold">₹{data?.user.paid}</p>
            </div>
            <div>
              <p className="text-sm md:text-xs mb-1">Pending Amount</p>
              <p className="text-base md:text-sm">Verified: ₹{data?.verifiedAmt}</p>
              <p className="text-base md:text-sm">Unverified: ₹{data?.totalUnVerifiedAmt}</p>
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

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 md:px-4 md:py-3 sm:px-3 sm:py-2 bg-gray-50 border-b">
          <h2 className="text-xl md:text-lg sm:text-base font-semibold text-gray-800">Transactions</h2>
        </div>
        <div className="p-6 md:p-4 sm:p-3">
          <Transactions _id={data?.user._id!} />
        </div>
      </div>
    </div>
		</>
	);
};

export default UserProfile;
