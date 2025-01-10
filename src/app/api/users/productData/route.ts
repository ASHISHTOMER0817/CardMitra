import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Product, SpecialQuantity } from "@/models/userModel";
import productList from "@/interface/productList";
import bufferToString from "@/app/components/bufferToString";

Database()

export async function GET(request: NextRequest) {

      try {
            // const userId = await request.json()
            const _id = request.nextUrl.searchParams.get('query');
            const special = request.nextUrl.searchParams.get('special');
            let productId = _id;

            // Check if special query param is true
            if (special === 'true') {
                  const specialEntry = await SpecialQuantity.findOne({ _id: _id });

                  // If a special entry exists, use spec.productId as the new ID
                  if (specialEntry) {
                        productId = specialEntry.product;
                  }
            }

            // Fetch the product details using the updated productId
            let productDetails = await Product.findOne({ _id: productId })
                  .populate({ path: 'cards', select: 'value image' })
                  .populate('site').lean()

                  // console.log('this is a single product',productDetails)
            const product = bufferToString(productDetails as productList)

            // console.log('2', product)
            return NextResponse.json({
                  data: product, message: 'Product data is being shown', success: true
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })
      }
}