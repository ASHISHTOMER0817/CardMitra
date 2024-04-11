// import { NextResponse, NextRequest } from "next/server";
// import Product from "@/models/productModel";
// import Database from "@/database/database";

// Database()
// export async function POST(request: NextRequest) {
//       try{
//             const productId = await request.json()

//                   await Product.findOneAndUpdate({_id:productId},{$set:{requirement:   }})
//                   return NextResponse.json(
//                         {
//                               success: true, status: 200
//                         }
//                   ) 
//       }catch(error){
//             return NextResponse.json({
//                   message: 'Something went wrong, Please try again later', success: false, status: 500
//             })
//       }
// }