import { NextResponse } from "next/server";
import Database from "@/database/database";
import { User } from "@/models/userModel";

Database()
export async function GET(){
      
      try{
            const allRequest = await User.find().sort({isApprove: 1})
            if(allRequest){
                  return NextResponse.json({
                        data:allRequest, success: true, message:"All is well"
                  })
            }
      }catch{
            return NextResponse.json({
                  message:"Something went wrong; Please try again later", success: false
            })
      }
}