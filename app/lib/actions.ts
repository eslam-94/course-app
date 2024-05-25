'use server'

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const { db } = require('@vercel/postgres');

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

export async function updateUserPass(email: string, password: string) {
  const client = await db.connect();
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // update password into the "users" table
    const result = await client.sql`
    UPDATE users
    SET password = ${hashedPassword}
    WHERE email= ${email};`;

    return true
  
  } catch (error) {

    console.error('Error updating password user');

    return false
    
  } finally {   
    await client.end()
  }
}
/*
export async function registerUser(user: User) {
  const client = await db.connect();
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    // Insert data into the "users" table
    const result = await client.sql`
    INSERT INTO users (name, email, password)
    VALUES (${user.name}, ${user.email}, ${hashedPassword})
    ON CONFLICT (id) DO NOTHING;`;

    return true
  
  } catch (error) {

    console.error('Error register user');

    return false
    
  } finally {   
    await client.end()
  }
}
*/
export async function generateToken(userEmail: string) {

  const payload = { userEmail }; // Add user ID or other relevant data

  const secret = process.env.AUTH_SECRET!!// Store your secret key securely

  const token = jwt.sign(payload, secret, { expiresIn: '1h' }); // Set expiration time (optional)

  return token;
}


export const getAccessToken = async (token: string) => {
  cookies().set("access-token", token); // Expires in 1 hour
};