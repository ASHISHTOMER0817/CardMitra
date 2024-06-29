import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product, User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
import bufferToString from "@/app/components/bufferToString";
import productList from "@/interface/productList";

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
                  // let products = await Product.find({})
                  if (limit === 'none') {
                        const { _id } = await GetToken()
                        const user = await User.findOne({ _id: _id })
                  // products =  products.find({deals:true})
                        let productsArr:productList[] = await Product.find({ deals: true })
                        .populate({path:'cards', select:'value image'})
                        .populate('site').lean();
                        console.log(productsArr)
                      const products = bufferToString(productsArr)
                        const data = { products, user }
                        console.log('1st console', products)

                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  else if (limit === 'three') {
                        const { _id } = await GetToken()
                        const user = await User.findOne({ _id: _id })
                        const productsArr:productList[] = await Product.find({ deals: true }).limit(3)
                        .populate({path:'cards', select:'value image'})
                        .populate('site').lean();

                        const products = bufferToString(productsArr)
                        const data = { products, user }
                        return NextResponse.json({ data: data, success: true, status: 200 })
                  }
                  // console.log('i got here too')
                  else if (limit === 'homePage') {
                        console.log('else if condition')
                        const allProducts:productList[] = await Product.find({ showOnHomePage: true })
                        .populate({path:'cards', select:'value image'})
                        .populate('site').lean();

                        const products = bufferToString(allProducts)
                        
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
                  let base64Image: any
                  if (product && product.image) {
                        base64Image = product.image.toString('base64');
                  }
                  return NextResponse.json({
                        message: 'showing the existing product', success: true, data: {
                              ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                              image: base64Image // Replace buffer with base64 string
                        }
                  })
            }


      } catch (error) {
            return NextResponse.json({
                  message: 'Something went wrong, Please try again later', success: false, status: 500
            })
      }
}