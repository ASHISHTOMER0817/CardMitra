import { NextRequest, NextResponse } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";

Database()

export async function DELETE(request:NextRequest){

      try{

            const searchParams = request.nextUrl.searchParams
            const _id = searchParams.get("objectId")
            const deletedUser = await User.findOneAndDelete({_id:_id})
            console.log(deletedUser)
            return NextResponse.json({
                  message:"Successfully deleted", success: true
            })
      }catch {
            return NextResponse.json({
                  message:"Something went wrong, server error, call Ashish, just joking", success: false
            })
      }
}