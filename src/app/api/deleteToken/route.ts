import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function DELETE() {
      try {
            const token = cookies().delete('joseToken')
            // console.log(token)
            return NextResponse.json({
                  message: 'Logged Out', success: true
            })
      } catch {
            return NextResponse.json({
                  message: 'Something went wrong', success: false
            })
      }
}