import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import { Transactions, User } from "@/models/userModel";


Database()

export async function GET(req:NextRequest){

      const params = req.nextUrl.searchParams;
      const amt = params.get('paid');
      const _id = params.get('query');
      try{
            if(!amt || !_id) {return NextResponse.json({message:'failed to pay', success:false});}
            await Transactions.create({
                  user:_id,
                  amount:Number(amt),
                  dateOfPayment:new Date()
            })
            return NextResponse.json({message:'payment successfully', success:true})
      }catch{
            return NextResponse.json({message:'failed to pay', success:false})
      }
}