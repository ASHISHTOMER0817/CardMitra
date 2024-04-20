import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";
import GetToken from "@/app/components/getToken";


Database()

export async function POST(request: NextRequest) {
      try {

            const choice = await request.json()
            console.log(choice)
            const userObjectId = GetToken()
            console.log(userObjectId)
            if (choice) {
                  const updatedUser = await User.findByIdAndUpdate(userObjectId, { $set: { isApprove: true } })
                  console.log('update',updatedUser)
                  return NextResponse.json({
                        message: 'Request has been accepted', status: true
                  })
            } else if (!choice) {
                  const deletedUser = await User.findByIdAndDelete(userObjectId)
                  console.log('delete',deletedUser)
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