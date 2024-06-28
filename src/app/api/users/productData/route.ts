import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";
import productList from "@/interface/productList";
import bufferToString from "@/app/components/bufferToString";

Database()


// interface Card {
//       value: string;
//       image: Buffer | null | string;
// }

// interface Site {
//       image: Buffer | null | string;
// }

// interface product {
//       _id: string;
//       image: Buffer | null | string;
//       cards: Card[];
//       site: Site | null;
//       [key: string]: any;
//       // Add other fields as needed
// }

export async function GET(request: NextRequest) {

      try {
            // const userId = await request.json()
            const _id = request.nextUrl.searchParams.get('query')
            // const objId = userId.objectid
            console.log('1st console', _id)
            let productDetails = await Product.findOne({ _id: _id })
                  .populate({ path: 'cards', select: 'value image' })
                  .populate('site').lean()

                  console.log('this is a single product',productDetails)
            const product = bufferToString(productDetails as productList)

            // Converting the Buffer images to base64
            // if (product) {
            //       product = {
            //             ...product,
            //             image: product?.image ? product.image.toString('base64') : null,
            //             cards: product.cards.map((card: any) => ({
            //                   ...card,
            //                   image: card.image ? card.image.toString('base64') : null
            //             })),
            //             site: {
            //                   ...product.site,
            //                   image: product.site?.image ? product.site.image.toString('base64') : null
            //             }
            //       };
            // }



            console.log('2', product)
            return NextResponse.json({
                  data: product, message: 'Product data is being shown', success: true
            })
      } catch (error) {
            return NextResponse.json({
                  message: "Something went wrong, Server error", success: false
            })
      }
}