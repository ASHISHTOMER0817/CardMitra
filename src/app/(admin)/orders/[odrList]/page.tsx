'use client'
import ProductDetails from '@/app/components/ProductDetails'
import ProductOrderList from '@/app/components/ProductOrderList'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const OrderList = ({params}:{params:{odrList:string}}) => {
      const [data, setData] = useState()

      useEffect(()=>{
            async function getData(){
                  try {
                        const response = await axios.get(`/api/users/productData?query=${params.odrList}`)
                        console.log(params.odrList)
                        setData(response.data.data)
                  }catch{
                        console.log("something went wrong, please try again later")
                  }
            }
            getData()
      },[params.odrList])
  return (
    <div className='m-10 flex flex-col mx-auto w-4/5 gap-9'>
      <ProductDetails data={data!}/>
      <ProductOrderList/>
    </div>
  )
}

export default OrderList