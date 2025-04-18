import { NextResponse, NextRequest } from "next/server";
import { Password, User } from "@/models/userModel";
import bcryptjs from 'bcryptjs'
import Database from "@/database/database";


Database()
export async function POST(request: NextRequest) {
      try {
            // console.log('sarva startin bro')
            const reqBody = await request.json()
            const { name, email, password, contact } = reqBody.user;
            // console.log('1st', reqBody)
            const user = await User.findOne({
                  $or: [
                        { email },
                        { contact },
                  ]
            });

            // console.log("2nd", user)
            if (user) {
                  return NextResponse.json({
                        message: "User associated with these details already exist!", success: false
                  })
            }
            else if (!user) {

                  // Instance of password
                  const newPassword = Password.create({
                        user: email.toLowerCase(),
                        password
                  })
                  // console.log(newPassword)

                  //hash Password
                  const salt = await bcryptjs.genSalt(10)
                  const hashedPassword = await bcryptjs.hash(password, salt);
                  // console.log('2.5th', hashedPassword)

                  //save new user
                  const savedUser = await User.create({ name, email:email.toLowerCase(), contact, password: hashedPassword });
                  // console.log("4th", savedUser)
                  return NextResponse.json({
                        message: "Logged In successfully", success: true
                  })
            }
      } catch (error) {
            // console.log(error)
            return NextResponse.json({
                  message: "Something went wrong; Please try again later", success: false
            })
      }


}