import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getFireUser } from './app/lib/firestoredb';
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
            if (parsedCredentials.success) {

              const { email, password } = parsedCredentials.data;
              const user = await getFireUser(email);

              if (!user) return null;

              const passwordsMatch = await bcrypt.compare(password, user.password);
 
              if (passwordsMatch) {

                const payload = { email }; // Add user ID or other relevant data

                const secret = process.env.AUTH_SECRET!!// Store your secret key securely
              
                const token = jwt.sign(payload, secret); // Set expiration time (optional)

                cookies().set("user-token", token)
                
                return user;
              }
            }

            console.log('Invalid credentials');       
            return null;
        },
      }),
    ],
});