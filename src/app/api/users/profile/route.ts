import Database from "@/database/database";
import { NextResponse, NextRequest } from "next/server";
import GetToken from "@/app/components/getToken";
import { Order, User } from "@/models/userModel";
import getBalance from "@/lib/getBalance";
import mongoose from "mongoose";
// import { getBalance } from "../details/route";
Database()

export async function GET() {
      try {
            const { _id } = await GetToken()
            const user = await User.findOne({ _id })
            // const userId = new mongoose.Types.ObjectId(_id)
            const balance = await getBalance(new mongoose.Types.ObjectId(_id))
            
            return NextResponse.json({ message: 'user profile data', success: true, data: {balance , user } })
      } catch (error) { return NextResponse.json({ message: error, success: false }) }
}