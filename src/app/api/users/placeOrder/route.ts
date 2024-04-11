import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import Product, { IProduct } from "@/models/productModel";


Database()
export async function POST(request: NextRequest) {

      try {
            const userId = await request.json()
            const objId = userId.objectid
            // const objectid = userId.toString()
            console.log('1st console', objId)
            const product = await Product.findOne<IProduct>({ _id: objId })
            console.log('2', product)
            if (product) {
                  return NextResponse.json({
                        data: product, message: 'User data successfully retrieved', success: true
                  })
            }
            return NextResponse.json({
                  message: "Something went wrong, Please refresh the page", success: false
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })
      }
}