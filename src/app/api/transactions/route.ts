import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Transactions } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            const user = request.nextUrl.searchParams.get('userPage')
            const _id = request.nextUrl.searchParams.get('_id')
            // console.log(_id)
            console.log(user)
            if (user === 'false') {
                  console.log('if condition running')
                  const transactions = await Transactions.find({}).sort({ dateOfPayment: -1 }).populate('user')
                  console.log(transactions)
                  return NextResponse.json({
                        message: 'You are being shown all the transactions', success: true, data: transactions
                  })
            } else {
                  console.log('else condition')
                  const userTransactions = await Transactions.find({ user: _id })
                  console.log(userTransactions)

                  return NextResponse.json({
                        message: 'You are being shown all the transactions', success: true, data: userTransactions
                  })
            }

      } catch {
            return NextResponse.json({
                  message: 'server error, refresh the page', success: false
            })
      }
}