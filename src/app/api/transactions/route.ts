import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { Transactions } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            // const user = request.nextUrl.searchParams.get('userPage')
            const _id = request.nextUrl.searchParams.get('_id')
            // console.log(_id)
            // console.log(_id)
            if (!_id) {
                  // console.log('if condition running')
                  const transactions = await Transactions.find({}).sort({ dateOfPayment: -1 }).populate('user')
                  // console.log(transactions)
                  return NextResponse.json({
                        message: 'You are being shown all the transactions', success: true, data: transactions
                  })
            }
           
            const userTransactions = await Transactions.find({ user: _id }).sort({ dateOfPayment: -1 })
           
            return NextResponse.json({
                  message: 'You are being shown all the transactions', success: true, data: userTransactions
            })

      } catch {
            return NextResponse.json({
                  message: 'server error, refresh the page', success: false
            })
      }
}