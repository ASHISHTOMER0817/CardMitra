import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Review } from "@/models/userModel";
import GetToken from "@/app/components/getToken";

Database()
export async function POST(request: NextRequest) {
      try {
            console.log("reached server")
            const { review } = await request.json()
            const { _id } = await GetToken()
            console.log(review, _id)
            if (review) {

                  const newReview = await Review.updateOne({ user: _id }, { $set: { review } }, { upsert: true })
                  console.log(newReview)
                  return NextResponse.json({
                        message: 'review added', success: true
                  })
            }
      } catch {
            return NextResponse.json({
                  message: 'failed to add review', success: false
            })
      }

}