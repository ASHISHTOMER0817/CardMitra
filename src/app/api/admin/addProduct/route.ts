import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";

Database()

export async function POST(request: NextRequest){
      try{
            const reqBody = await request.json()

            
            const {name, requirement,cards, site, address, productLink, image, price, commission} = reqBody.formData
            const binaryImage = Buffer.from(image,'base64')
            // console.log("first time", image)
            
            const newProduct = await new Product({
                  name, requirement, cards, site, address, productLink, image:binaryImage, price, commission
            })
            console.log(binaryImage)
            newProduct.save()
            // console.log(newProduct)
            // const newProduct = await Product.create({productData})
            
            console.log("second Time",newProduct)
            return NextResponse.json({
                  message: "The product has been added", success: true, status: 200
            })
      }catch{
            return NextResponse.json({
                  message: "Something went wrong please try again later", success: false, status: 500
            })
      }
}