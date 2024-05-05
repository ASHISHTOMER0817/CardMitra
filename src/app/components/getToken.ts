'use server'
import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"

export default async function GetToken() {
      
      const cookieStore = cookies()
      const cookie = cookieStore.get('token')?.value!
      const decodedToken: any = jwt.verify(cookie, process.env.TOKEN_SECRET_KEY!)
      // console.log(decodedToken)
     const {email, _id,role } = decodedToken;
      return {email,_id, role}
}