import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import GetToken from "@/app/components/getToken";
import { User } from "@/models/userModel";

Database()

export async function POST(request: NextRequest) {

      try {
            const { ifsc, upi, accountNo } = await(await request.json()).bankDetails
            const {_id} = await GetToken()
            const user = await User.updateOne({ _id: _id }, { $set: { ifsc, upi, accountNo } });
            if (!user) {
                  return NextResponse.json({
                        message: "Server error, please refresh the page", success: false
                  })
            }
            else {
                  return NextResponse.json({
                        message: "Bank details saved", success: true
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong", success: false
            })
      }
}