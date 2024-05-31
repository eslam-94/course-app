'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    
    await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function generateToken(userEmail: string) {

  const payload = { userEmail }; // Add user ID or other relevant data

  const secret = process.env.AUTH_SECRET!!// Store your secret key securely

  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiration time (optional)

  return token;
}


export const getAccessToken = async (token: string) => {
  cookies().set("access-token", token); // Expires in 1 hour
};