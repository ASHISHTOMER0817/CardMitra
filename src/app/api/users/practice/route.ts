import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Product } from "@/models/userModel";
import productList from "@/interface/productList";

Database()

export async function GET() {
      try {
            const product = await Product.findOne({ _id: '667d593ed0c9dbc192925ec4' })
            console.log(product, 'this is product')
            if (product && product.image) {
                  const base64Image = product.image.toString('base64');
                  return NextResponse.json({
                        message: 'skfhgli',
                        data: {
                              ...product.toObject(), // Convert Mongoose document to plain JavaScript object
                              image: base64Image // Replace buffer with base64 string
                        }
                  });
            }
      } catch {
            return NextResponse.json({
                  message: 'skfhgli'
            })
      }
}