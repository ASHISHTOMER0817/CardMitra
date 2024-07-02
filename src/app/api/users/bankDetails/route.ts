import { NextResponse, NextRequest } from "next/server";
import Database from "@/database/database";
import GetToken from "@/app/components/getToken";
import { User } from "@/models/userModel";

Database()

export async function POST(request: NextRequest) {

      try {
            const { name, email, contact, ifsc, accountNo, upi } = await (await request.json()).bankDetails
            // console.log(name, email, contact, ifsc, accountNo, upi)


            const { _id } = await GetToken()
            const arr = [name, email, contact, ifsc, accountNo, upi]
            const existingUser = await User.findOne({
                  $or: [
                        { email },
                        { contact }
                  ],_id:{$ne: _id}
            });
            if (existingUser) {
                  return NextResponse.json({
                        message: 'Email or Contact already exist', success: false
                  })
            }
            // const user = await User.updateOne({ _id: _id }, { $set: { ifsc, upi, accountNo, name, email, contact } });
            const user = await User.findOne({ _id: _id })
            console.log('this user', user)
            const fieldNames = ['name', 'email', 'contact', 'ifsc', 'accountNo', 'upi'];

            for (let i = 0; i < arr.length; i++) {
                  if (arr[i]) {
                        user[fieldNames[i]] = arr[i];
                        // console.log(arr[i])
                  }
            }

            await user.save();
            if (!user) {
                  return NextResponse.json({
                        message: "Server error, please refresh the page", success: false
                  })
            }
            else {
                  return NextResponse.json({
                        message: "Profile update successful", success: true
                  })
            }
      } catch {
            return NextResponse.json({
                  message: "Something went wrong", success: false
            })
      }
}