
import { NextResponse } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";



Database()
export async function GET() {




      // { IProduct }
      try{
            const products = await Product.find({isAvail: true}).limit(3)
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