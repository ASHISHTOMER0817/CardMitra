import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";

Database()

export async function GET(request: NextRequest) {
      try {
            const searchparams = request.nextUrl.searchParams
            const _id = searchparams.get('query')
            console.log( _id)
            const user = await User.findOne({ _id })
            console.log(user)
            return NextResponse.json({
                  message: "User details is being shown", data: user, success: true
            })
      } catch {
            return NextResponse.json({
                  message: "Something went wrong, please try again later", success: false
            })
      }

}