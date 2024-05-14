import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";

Database()
export async function GET(request: NextRequest) {
      try {
            console.log('its workin')
            const limit = request.nextUrl.searchParams.get('limit')
            const productId = request.nextUrl.searchParams.get('productId')
            console.log(productId)
            if (limit) {
                  // token 
                  const { _id } = await GetToken()
                  const user = await User.findOne({ _id: _id })

                  if (limit === 'none') {
                        const products = await Product.find({ deals: true })

                        const data = { products, user }
                        // console.log('1st console', products)

                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  else if (limit === 'three') {
                        const products = await Product.find({ deals: true }).limit(3)
                        const data = { products, user }
                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  // else if(limit === 'allProducts'){
                  //       const products = await Product.find()
                  // }
            }else if(productId){
                  console.log('else if condition')
                  const product = await Product.findOne({_id:productId})
                  // console.log(product)
                  return NextResponse.json({
                        message:'showing the existing product', success:true, data:product
                  }) 
            }


      } catch (error) {
            return NextResponse.json({
                  message: 'Something went wrong, Please try again later', success: false, status: 500
            })
      }
}