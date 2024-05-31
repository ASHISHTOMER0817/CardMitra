import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";

Database()
export async function GET(request: NextRequest) {
      try {
            console.log('its workin')
            const searchParams = request.nextUrl.searchParams
            const limit = searchParams.get('limit')
            const productId = searchParams.get('productId')
            const icon = searchParams.get('icon')
            console.log(productId)
            console.log(limit, 'thisis limit')
            if (limit) {
                  // token 
                  console.log('inside limit')
                  console.log('i got here limit')

                  if (limit === 'none') {
                        const { _id } = await GetToken()
                        const user = await User.findOne({ _id: _id })
                        const products = await Product.find({ deals: true })

                        const data = { products, user }
                        // console.log('1st console', products)

                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  else if (limit === 'three') {
                        const { _id } = await GetToken()
                        const user = await User.findOne({ _id: _id })
                        const products = await Product.find({ deals: true }).limit(3)
                        const data = { products, user }
                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  // console.log('i got here too')
                  else if (limit === 'homePage') {
                        console.log('else if condition')
                        const products = await Product.find({ showOnHomePage: true })
                        return NextResponse.json({ data: products, success: true, status: 200 })
                  }
            } else if (productId) {
                  console.log('else if condition')
                  const product = await Product.findOne({ _id: productId })
                  // console.log(product)
                  if (icon === 'false') {
                        product.showOnHomePage = false
                  } else if (icon === 'true') {
                        product.showOnHomePage = true
                  }
                  await product.save();
                  return NextResponse.json({
                        message: 'showing the existing product', success: true, data: product
                  })
            }


      } catch (error) {
            return NextResponse.json({
                  message: 'Something went wrong, Please try again later', success: false, status: 500
            })
      }
}