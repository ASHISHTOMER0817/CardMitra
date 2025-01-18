import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";


Database()

export async function GET(request: NextRequest) {
      try {
            const searchParams = request.nextUrl.searchParams
            const choice = searchParams.get('choice')
            const _id = searchParams.get('objectId')
            // console.log('1st console', choice, _id)
            if (choice == "true") {
                  const updatedUser = await User.findOneAndUpdate({ _id: _id }, { $set: { isApprove: true } })
                  // console.log('update', updatedUser)
                  return NextResponse.json({
                        message: 'Request accepted', success: true, status:200
                  })
            } else if (choice == "false") {
                  const deletedUser = await User.findOneAndDelete({ _id:_id })
                  // console.log('delete', deletedUser)
                  return NextResponse.json({
                        message: 'Request rejected', success: true, status:400
                  })
            }
      } catch {
            return NextResponse.json({
                  message: 'something went wrong, please refresh the page', success: false, status: 500
            })
      }

}