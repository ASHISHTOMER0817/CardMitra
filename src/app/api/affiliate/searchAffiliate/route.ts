import Database from "@/database/database";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

Database()
export async function GET(){
      try{
            const user = await User.find({},"name email contact").lean();
            return NextResponse.json({user, message:'retrieved successfully'})
      }catch(error){
            console.log(error)
            return NextResponse.json({ message:'something went wrong' })
      }
}