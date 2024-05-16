import { cookies } from 'next/headers'
import * as jose from 'jose'

export default async function GetToken() {

      // console.log('getToken running')
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

      const { email, _id, role } = payload
      // console.log(email, _id, role)
      return { email, _id, role }
}