// import GetToken from '@/app/components/getToken'
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
      const userCookies = request.cookies.get('token')?.value || ''
      const adminCookies = request.cookies.get(process.env.ADMIN_TOKEN!)?.value || ''
      if (!userCookies && !adminCookies ) { return NextResponse.redirect(new URL('/Auth/login', request.url)) }
      else {
            const path = request.nextUrl.pathname
            const authPath = path === '/Auth/login' || path === '/Auth/signup'
            const adminPath = path === '/adminAddProduct/' || path === `/adminAddProduct${'/'}` || path === '/adminBookers' || path === '/adminDashboard' || path === '/orders' || path === '/otpList' || path === '/transactions' || path === '/Auth'
            const userPath = path === '/dashboard' || path === '/deals' || path === '/odrHistory' || path === '/userProfile' || authPath
            console.log(userCookies)
            if (userCookies && adminPath  ) {
                  return NextResponse.redirect(new URL('/error', request.url))
            }
            else if (adminCookies && userPath) {
                  return NextResponse.redirect(new URL('/error', request.url))
            }
      }
}

// See "Matching Paths" below to learn more
export const config = {
      matcher: ['/dashboard', '/deals/:path*', '/odrHistory/:path*', '/userProfile',  '/adminAddProduct:path*', '/adminBookers', '/adminDashboard', '/orders', '/otpList', '/transactions', '/Auth/login']
}




