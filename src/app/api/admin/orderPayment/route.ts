import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";


Database()

export async function GET(){

      try{

            const  
      }catch{
            return NextResponse.json({
                  message: "something went wrong, please try again later", success: false, status: 500
            })
      }
}