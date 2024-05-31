import type { NextAuthConfig } from 'next-auth';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/course');
      const isOnLogIn = nextUrl.pathname.startsWith('/login');
      if (isOnDashboard) {
        if (isLoggedIn) return true
        
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn && isOnLogIn) {
        return Response.redirect(new URL('/course', nextUrl));
      }    
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;