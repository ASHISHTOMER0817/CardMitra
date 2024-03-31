import { cookies } from 'next/headers'
import jwt from "jsonwebtoken"

export default function Page() {
      const cookieStore = cookies()
      const cookie = cookieStore.get('token')?.value!
      const decodedToken: any = jwt.verify(cookie, process.env.SECRET_KEY!)
      console.log(decodedToken)
      const { email } = decodedToken;
      return email;
}