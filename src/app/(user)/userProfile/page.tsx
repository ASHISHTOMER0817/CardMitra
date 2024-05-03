'use client'
import BackwardButton from '@/app/components/BackwardButton'
import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx';

const UserProfile = () => {
	const [amount, setAmount] = useState<number>(0);
	const [overlay, setOverlay] = useState("hidden");





      function overlayFeature(){
		setOverlay("hidden")
		console.log(overlay)
	}
  return (
    <div><div className="w-[90%] mx-10 mt-6 relative">
    <div
          className={`${overlay} w-full h-full absolute bg-gray-500 z-10 opacity-45`}
    ></div>
    <div className={`${overlay} bg-white flex px-10 z-20 absolute opacity-100 py-6 flex-col gap-6 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}>
          <RxCross1
                className=" cursor-pointer ml-auto"
                onClick={overlayFeature}
          />
          <h4>Fill all the Bank details</h4>
          <input
                type="number"
                required
                placeholder="Amount"
                className="outline-none border-b pb-2 border-black"
                value={amount}
                onChange={(e)=>setAmount(+e.target.value)}
          />{" "}
          <button onClick={()=>setListType("reduce")} className="px-3 py-1">Submit</button>
    </div>
    <BackwardButton />
    <div className="flex justify-between mb-10 items-center">
          <h3>{data?.user?.name}</h3>
          {/* <div className="flex gap-6 text-sm"> */}
          {/* <button className="rounded-3xl flex text-center items-center justify-center w-36 py-1 bg-primaryBgClr">
                      <Image
                            onClick={() =>
                                  acceptAffiliate(
                                        true,
                                        user?.email!
                                  )
                            }
                            src={accept}
                            alt="accept"
                            width={30}
                            height={30}
                            className="cursor-pointer"
                      />{" "}
                      Accept
                </button> */}

          {listType === "delivered" && amount !== 0 && (
                <div
                      onClick={() => setOverlay("")}
                      className="rounded-3xl text-nowrap cursor-pointer bg-primaryBgClr flex py-2 px-4 border justify-center items-center  text-white"
                >
                      pay Rs.{data?.totalAmt}
                </div>
          )}
    </div>
    <h6 className="text-gray-400 mb-4 text-sm">PERSONAL</h6>
    <section className=" flex justify-between items-center">
          <div>Name: {data?.user?.name}</div>
          <div>Email: {data?.user?.email}</div>
          <div>Contact: {data?.user?.contact} </div>
    </section>

    <hr className="border w-4/5 my-7" />
    <h6 className="text-gray-400 mb-4 text-sm">BANK DETAILS</h6>

    <section className="flex justify-between items-center">
          <div>
                Bank Account Number:{" "}
                {data?.user?.bank_account_number}
          </div>
          <div>IFSC Code: {data?.user?.bank_account_number} </div>
          <div className="mr-20">
                UPI ID: {data?.user?.UPI_ID}
          </div>
    </section>

    <div className="flex justify-start gap-4 mt-8 mb-4 items-center ">
          <h6
                onClick={() => setListType("delivered")}
                className={` text-gray-400 text-sm p-[10px] rounded-full ${
                      listType === "delivered" && "bg-blue-100"
                }`}
          >
                Delivered List
          </h6>
          <h6
                onClick={() => setListType("nonDelivered")}
                className={` text-gray-400 text-sm p-[10px] rounded-full ${
                      listType === "nonDelivered" && "bg-blue-100"
                }`}
          >
                non-delivered List
          </h6>
    </div>

    {data ? (
          data?.orderList?.length! > 0 ? (
                <UserOrders data={data?.orderList!} />
          ) : (
                <div className="mt-28 mx-auto w-fit text-sm text-red-500 font-serif">
                      User did not ordered any product yet
                </div>
          )
    ) : (
          <div>Loading...</div>
    )}
</div></div>
  )
}

export default userProfile