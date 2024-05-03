import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import GetToken from "@/app/components/getToken";
import { User } from "@/models/userModel";

Database()

export async function POST(request:NextRequest){

      try{
            const {nfsc, upi, accountNo} = await request.json() 
            const _id = GetToken()
            const user = await User.updateOne({ _id: _id }, { $set: { nfsc, upi, accountNo } });
            if(!user){
                  return NextResponse.json({
                        message: "Server error, please refresh the page", success:false
                  })
            }
            else{
                  return NextResponse.json({
                        message: "Bank details has been saved", success:false
                  })
            }
      }catch{
            return NextResponse.json({
                  message: "Something went wrong", success:false
            })
      }
}