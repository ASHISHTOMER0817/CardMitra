import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {

      try {
            // const userId = await request.json()
            const _id = request.nextUrl.searchParams.get('query')
            // const objId = userId.objectid
            console.log('1st console', _id)
            const product = await Product.findOne({ _id:_id })
            console.log('2', product)
            if (product) {
                  return NextResponse.json({
                        data: product, message: 'Product data is being shown', success: true
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