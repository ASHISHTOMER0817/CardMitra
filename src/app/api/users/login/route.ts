import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs'
import Database from "@/database/database";
import { User } from "@/models/userModel";
import * as jose from 'jose'

Database()
export async function POST(request: NextRequest) {
    function capitalizeFirstLetter(string:string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      try {


          
        //   let str = "hello";
        //   let capitalizedStr = capitalizeFirstLetter(str);
        //   console.log(capitalizedStr); // Output: "Hello"
          
            const reqBody = await request.json();
            const { email, password, remember } = reqBody.user;
            const user = await User.findOne({ email:email.toLowerCase() });
            const uppercaseUser = await User.findOne({email:capitalizeFirstLetter(email)})
        
            // If user doesn't exist
            if (!user && !uppercaseUser) {
                return NextResponse.json({
                    message: 'Email or password is wrong!',
                    success: false,
                    data: null
                });
            }
        
            const existingPassword = user.password;
        
            // Compare password
            const verifyPassword = await bcrypt.compare(password, existingPassword);
        
            // If password is incorrect
            if (!verifyPassword) {
                return NextResponse.json({
                    message: 'Email or password is wrong!',
                    success: false,
                    data: null
                });
            }
        
            // If user exists and password is correct
            const tokenData = { email, _id: user._id, role: user.role };
            console.log(tokenData, 'and', remember);
            console.log('Password verified:', verifyPassword);
        
            const secret = new TextEncoder().encode(process.env.TOKEN_SECRET_KEY);
            const expirationTime = remember ? '7 days' : '1h';
            const alg = 'HS256';
        
            const joseToken = await new jose.SignJWT(tokenData)
                .setProtectedHeader({ alg })
                .setIssuedAt()
                .setIssuer('Guru')
                .setAudience('Orderee')
                .setExpirationTime(expirationTime)
                .sign(secret);
        
            console.log(joseToken);
        
            let time = remember ? 7 * 24 * 60 * 60 * 1000 : 60 * 60 * 1000;
            cookies().set('joseToken', joseToken, { expires: new Date(Date.now() + time) });
        
            return NextResponse.json({
                message: 'Login successful',
                success: true,
                data: user.role
            });
        } catch (error) {
            console.error('Error:', error);
            return NextResponse.json({
                message: "Server error",
                success: false
            });
        }
        


}