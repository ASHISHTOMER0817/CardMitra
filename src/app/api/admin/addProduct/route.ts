import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";

Database()

export async function POST(request: NextRequest){
      try{
            const reqBody = await request.json()
            
            const productData = reqBody.formData
            
            const newProduct = await Product.create({productData})
            
            console.log(newProduct)
            return NextResponse.json({
                  message: "The product has been added", success: true, status: 200
            })
      }catch{
            return NextResponse.json({
                  message: "Something went wrong please try again later", success: false, status: 500
            })
      }
}