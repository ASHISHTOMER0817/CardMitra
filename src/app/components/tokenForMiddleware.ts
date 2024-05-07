'use server'
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export default async function tokenForMiddleware(){
      const cookie = cookies().get('token')?.value!
      console.log(cookie)
      const decodedToken: any = jwt.verify(cookie, process.env.TOKEN_SECRET_KEY!)
      console.log(decodedToken)
      const { role } = decodedToken;
      return role;
}