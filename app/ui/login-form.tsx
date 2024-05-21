'use client'
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { authenticate } from '../lib/actions';

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <fieldset className="container" style={{"width": "400px"}}>
      <input
          type="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="email"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />

        {errorMessage && 
            <div style={{"display": "flex", "alignItems": "flex-start", "gap": "5px"}}>
              <ExclamationCircleIcon style={{"width": "30px"}} />
              <p>{errorMessage}</p>
            </div>
        }

        <LoginButton />

        <div className="grid">
          <Link href="/forgetpassword">Forgot password</Link>
          <Link href="/register">Don&apos;t have account</Link>
        </div>

      </fieldset>
  </form>
  );
}

function LoginButton() {
  
  const { pending } = useFormStatus();
  
  return (
    <input
    type="submit"
    value="Log in"
    aria-disabled={pending}
    />
  ) 
}
