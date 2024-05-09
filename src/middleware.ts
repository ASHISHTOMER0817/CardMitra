import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import * as jose from 'jose'



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
      const value = request.cookies.get('joseToken')?.value!

      const path = request.nextUrl.pathname
      const authPath = path === '/Auth/login' || path === '/Auth/signup'

      if (!value && !authPath) { return NextResponse.redirect(new URL('/Auth/login', request.url)) }
      else if (value) {
            // Jose token
            const secret = new TextEncoder().encode(
                  process.env.TOKEN_SECRET_KEY!,
            )
            const jwt = value

            const { payload } = await jose.jwtVerify(jwt, secret, {
                  issuer: 'Guru',
                  audience: 'Orderee',
            })

            const adminPath = path === '/adminAddProduct' || path === '/adminBookers' || path === '/adminDashboard' || path === '/orders' || path === '/otpList' || path === '/transactions'|| path === '/' || authPath
            const userPath = path === '/dashboard' || path === '/deals' || path === '/odrHistory' || path === '/userProfile' || authPath || path === '/'
            // Admin Dynamic paths
            const adminDynamicPath = path.startsWith('/adminAddProduct/') || path.startsWith('/adminBookers/') || path.startsWith('/orders/')
            const userDynamicPath = path.startsWith('/odrHistory/') || path.startsWith('/deals/')
            if (payload.role === 'user' && (adminPath || adminDynamicPath)) {
                  return NextResponse.redirect(new URL('/error', request.url))
            }
            else if (payload.role === 'admin' && (userPath || userDynamicPath)) {
                  return NextResponse.redirect(new URL('/error', request.url))
            }
      }
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: ['/dashboard', '/deals/:path*', '/odrHistory/:path*', '/userProfile', '/adminAddProduct/:path*', '/adminBookers/:path*', '/adminDashboard', '/orders/:path*', '/otpList', '/transactions'
            , '/Auth/:path*', '/'
      ]
}




