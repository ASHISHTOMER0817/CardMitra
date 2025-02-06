import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import { Password } from "@/models/userModel";
import { getBalance } from "../../users/details/route";

Database()
export async function GET(request: NextRequest) {
      const isApproved = request.nextUrl.searchParams.get('isApproved')
      try {
            const passwords = await Password.find();
            if (isApproved === 'approved') {
                  // const allRequest = []
                  const users = await User.find().sort({ isApprove: 1 });

                  const balances = await Promise.all(users.map(user => getBalance(user._id)));

                  const allRequest = users.map((user, index) => ({ user, balance: balances[index] }));
                  console.log(allRequest[0].user, 'so this is user')
                  // console.log(allRequest)
                  return NextResponse.json({
                        data: { allRequest, passwords }, success: true, message: "All is well"
                  })
            } else if (!isApproved) {
                  const allRequest = await User.find({ isApprove: false })
                  // const order = await Order.find({}).populate('product').populate('user')

                  return NextResponse.json({
                        data: { allRequest, passwords }, success: true, message: "All is well"
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }
}