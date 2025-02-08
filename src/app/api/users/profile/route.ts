import Database from "@/database/database";
import { NextResponse, NextRequest } from "next/server";
import GetToken from "@/app/components/getToken";
import { Order, Transactions, User } from "@/models/userModel";
import getBalance from "@/lib/getBalance";
import mongoose from "mongoose";
// import { getBalance } from "../details/route";
Database()

export async function GET() {
      try {
            const { _id } = await GetToken()
            const user = await User.findOne({ _id })
            const userId = new mongoose.Types.ObjectId(_id)
            const balance = await getBalance(userId)
            const totalEarning = await Transactions.aggregate([
                  { $match: { user: userId } }, // Match transactions for the given user ID
                  { $group: { _id: null, totalAmount: { $sum: "$amount" } } } // Sum the "amount" field
                ]);
                
                const earning = totalEarning.length > 0 ? totalEarning[0].totalAmount : 0;
                console.log(totalEarning);
                
            return NextResponse.json({ message: 'user profile data', success: true, data: {balance, earning , user } })
      } catch (error) { return NextResponse.json({ message: error, success: false }) }
}