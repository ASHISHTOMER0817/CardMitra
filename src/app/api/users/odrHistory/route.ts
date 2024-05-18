import { NextRequest, NextResponse } from "next/server";
import { Order, Otp, Product, User } from "@/models/userModel";
import Database from "@/database/database";
import getToken from "@/app/components/getToken"
import mongoose from "mongoose";



Database()
export async function GET(request:NextRequest) {

      try {
            const { _id } = await getToken()

            // SearchParams
            // console.log('this is listytpe',listType)
            const orderList = await Order.find({ user: _id,}).populate('product')
            return NextResponse.json({ data: orderList, message: 'User data successfully retrieved', success: true });
            

      } catch (error) {
            return NextResponse.json({ message: 'operation failed, try again', success: false });
      }
}