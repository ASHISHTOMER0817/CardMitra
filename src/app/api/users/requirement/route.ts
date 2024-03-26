import { NextResponse, NextRequest } from "next/server";
import Product from "@/models/userModel"


export async function POST(request: NextRequest) {
      try{
            const productId = request.json()
            const product = await Product.findById({productId})
            if(product.requirement > 0){

                  await Product.findOneAndUpdate({_id:productId},{$set:{requirement: product.requirement -1}})
                  return NextResponse.json(
                        {
                              success: true, status: 200
                        }
                  ) 
            }else{
                  return NextResponse.json({
                        message: 'The requirement has been fulfilled.', status: 400
                  })
            }
      }catch(error){
            return NextResponse.json({
                  message: 'Something went wrong, Please try again later', success: false, status: 500
            })
      }
}