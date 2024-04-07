import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import Product from "@/models/productModel";


Database()
export async function POST(request: NextRequest) {

      try {
            const userId = request.json()
            const product = await Product.findById({userId})
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