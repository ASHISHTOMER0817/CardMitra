import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"

export default function GetToken() {
      const cookieStore = cookies()
      const cookie = cookieStore.get('MyToken')?.value!
      const decodedToken: any = jwt.verify(cookie, process.env.TOKEN_SECRET_KEY!)
      // console.log(decodedToken)
      const { userId } = decodedToken;
      return userId;
}