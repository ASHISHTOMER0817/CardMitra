import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/userModel"


export async function GET() {
      try{

            const products = await Product.find({isValid: true})
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