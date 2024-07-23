import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import { Password } from "@/models/userModel";

Database()
export async function GET(request: NextRequest) {
      const isApproved = request.nextUrl.searchParams.get('isApproved')
      try {
            if (isApproved === 'approved') {

                  const allRequest = await User.find().sort({ isApprove: 1 });
                  const order = await Order.find({}).populate('product').populate('user');
                  const passwords = await Password.find();
                  // console.log(passwords)
                  return NextResponse.json({
                        data: { allRequest, order, passwords }, success: true, message: "All is well"
                  })


            } else if (!isApproved) {

                  const allRequest = await User.find({ isApprove: false })
                  const order = await Order.find({}).populate('product').populate('user')

                  return NextResponse.json({
                        data: { allRequest, order }, success: true, message: "All is well"
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }
}