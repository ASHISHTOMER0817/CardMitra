import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Review } from "@/models/userModel";
import GetToken from "@/app/components/getToken";
// import { ObjectId } from "mongodb";
import mongoose from "mongoose";

Database()
export async function GET(request: NextRequest) {
      try {
            const { _id } = await GetToken()
            const objectId = new mongoose.Types.ObjectId(_id)
            // const reqBody = request.json()
            const review = request.nextUrl.searchParams.get('review')
            if (review === 'receive') {
                  const newReview = await Review.create({ user: objectId, review: review })
                  // console.log(newReview)
                  return NextResponse.json({
                        message: 'Thanks for the review', success: true, status: 200
                  })
            }
            if (review === 'show') {
                  const allReviews = await Review.find({}).populate('user')
                  // console.log(allReviews)
                  return NextResponse.json({
                        message: 'Thanks for the review', success: true, status: 200, data: allReviews
                  })
            }
      } catch {
            return NextResponse.json({
                  message: 'Something went wrong', success: false, status: 400
            })
      }
}