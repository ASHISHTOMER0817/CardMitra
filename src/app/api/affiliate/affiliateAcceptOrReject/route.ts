import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";


Database()

export async function POST(request: NextRequest) {
      try {
            const searchParams = request.nextUrl.searchParams
            const choice = searchParams.get('query')
            const email = searchParams.get('anotherQuery')
            console.log('1st console', choice, email)
            if (choice) {
                  const updatedUser = await User.findOneAndUpdate({ email }, { $set: { isApprove: true } })
                  console.log('update', updatedUser)
                  return NextResponse.json({
                        message: 'Request has been accepted', status: true
                  })
            } else if (!choice) {
                  const deletedUser = await User.findOneAndDelete({ email })
                  console.log('delete', deletedUser)
                  return NextResponse.json({
                        message: 'User has been successfully deleted', status: true
                  })
            }
      } catch {
            return NextResponse.json({
                  message: 'something went wrong, please refresh the page', status: false
            })
      }

}