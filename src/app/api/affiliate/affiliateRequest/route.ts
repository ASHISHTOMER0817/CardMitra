import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import { Password } from "@/models/userModel";
import  getBalance  from "@/lib/getBalance"

Database()
export async function GET(request: NextRequest) {
      const isApproved = request.nextUrl.searchParams.get('isApproved')
      try {
            const passwords = await Password.find();
            if (isApproved === 'approved') {
                  const users = await User.find().sort({ isApprove: 1 });

                  const balances = await Promise.all(users.map(user => getBalance(user._id)));

                  const allRequest = users.map((user, index) => ({ user, balance: balances[index] }));
                  return NextResponse.json({
                        data: { allRequest, passwords }, success: true, message: "All is well"
                  })
            } else if (!isApproved) {
                  const allRequest = await User.find({ isApprove: false })

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