import Product from "@/models/productModel";
import { NextResponse, NextRequest } from "next/server";


export async function GET() {
      try{
            const products = await Product.find({isAvail: true})
            console.log('1st console',products)
            if(products){
                  return NextResponse.json(
                        {
                             data: products, success: true, status: 200
                        }
                  )
            }else{
                  return NextResponse.json({
                        message: 'Currently there are no product to order', status: 400
                  })
            }
      }catch(error){
            return NextResponse.json({
                  message: 'Something went wrong, Please try again later', success: false, status: 500
            })
      }
}