'use server'
import { cookies } from 'next/headers'
// import jwt from "jsonwebtoken"
import * as jose from 'jose'

export default async function GetToken() {
      //       const cookieStore = cookies()
      //       const cookie = cookieStore.get('token')?.value!
      //       const decodedToken:any = jwt.verify(cookie, process.env.TOKEN_SECRET_KEY!)
      //       // console.log(decodedToken)
      //      const {email, _id,role } = decodedToken;


      const value = cookies().get('joseToken')?.value!
      // Jose token
      const secret = new TextEncoder().encode(
            process.env.TOKEN_SECRET_KEY!,
      )
      const joseToken = value

      const { payload }:any = await jose.jwtVerify(joseToken, secret, {
            issuer: 'Guru',
            audience: 'Orderee',
      })

      // console.log(payload)
      // console.log('struggling to work')
      // console.log('getToken',payload._id)
      const { email, _id, role } = payload
      console.log(email, _id, role)
      return { email, _id, role }
}