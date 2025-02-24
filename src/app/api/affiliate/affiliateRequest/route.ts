import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Order, User } from "@/models/userModel";
import { Password } from "@/models/userModel";
import getBalance from "@/lib/getBalance"
import mongoose from "mongoose";

Database()
export async function GET(req: NextRequest) {
      const searchParams = req.nextUrl.searchParams;
      const isApproved = searchParams.get('isApproved')
      const lastId = searchParams.get('lastId') || null; // Last seen _id (for pagination)
      const navigate = searchParams.get('navigate');

      let filter: Record<string, any> = {};
      if (lastId && navigate) {
            filter._id = { [`$${navigate}`]: new mongoose.Types.ObjectId(lastId) }; // Get only records with _id greater than last seen _id
      }
      try {
            const passwords = await Password.find();
            if (isApproved === 'approved') {
                  const users = await User.find(filter).sort({ _id: navigate == 'gt' ? 1 : -1 }).limit(10);
                  const balances = await Promise.all(users.map(user => getBalance(user._id)));
                  const totalPages = Math.ceil(await User.countDocuments() / 10)
                  const allRequest = users.map((user, index) => ({ user, balance: balances[index] }));
                  allRequest.sort((a, b) => b.balance - a.balance);
                  return NextResponse.json({
                        data: { allRequest, passwords, totalPages, lastId: users.length ? users[users.length - 1]._id : null, }, success: true, message: "All is well"
                  })
            } else {
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