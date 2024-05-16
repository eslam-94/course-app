'use client'
import { Suspense, useState } from "react";
import { PasswordCheck } from "../lib/definitions";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';

function Changepassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Access query parameters (assuming the token is in a query parameter named "token")
  const token = searchParams.get('token');

  const [pass, setPass] = useState<PasswordCheck>({
    password1: "",
    password2: "" ,
    token: token
  })

  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")

  function handleChange(event: { target: { name: any; value: any; }; }) {
    const {name, value} = event.target
    
    setPass( prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault()

    if (pass.password1 === pass.password2) {

      if (pass.password1.length < 6) {
        setMessage("password length should 6 characters or more")
        setPending(false)
        return
      }
      
      setPending(true)
      
      axios.put('/api/resetpass', pass)
      .then(function (response) {
        console.log(response);
        setMessage(response.data.message)
        
        if (response.data.status) {

          setTimeout( () => router.push('/login') , 2000);

        }
      })
      .catch(function (error) {
        console.log(error);
      });

    } else {
      
      setMessage("password doesn't match")
      setPending(false)

    }
    
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="container" style={{"width": "355px"}}>

        <input
          type="password"
          name="password1"
          value={pass.password1}
          onChange={handleChange}
          placeholder="New Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        
        <input
          type="password"
          name="password2"
          value={pass.password2}
          onChange={handleChange}
          placeholder="Repeat Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />

        {
          message && <p>{message}</p>
        }

        <input
          type="submit"
          value="Change Password"
          aria-disabled={pending}
        />

      </fieldset>
  </form>
  );
}

export default function ChangepasswordWrapped() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Changepassword />
    </Suspense>
  )
}