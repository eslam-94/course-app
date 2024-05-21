'use client'
import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Forgotpassword() {
  
  const [email, setEmail] = useState("")
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState("")



  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault()
    setPending(true)

    axios.post('/api/resetpass', {email: email})
    .then(function (response) {
      console.log(response);
      setResult(response.data.message)
      setPending(false)

    })
    .catch(function (error) {
      console.log(error);
      setResult("error please try again!")
      setPending(false)
    });
    
  }




  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="container" style={{"width": "355px"}}>
        <input
            type="email"
            name="email"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
            placeholder="Enter your email"
            autoComplete="email"
            required
        />

        {result && <p>{result}</p> }
      
        <input
            type="submit"
            value="Reset password"
            aria-disabled={pending}
        />
        
        <div className="grid">
          <Link href="/login">Try to Login</Link>
          <Link href="/register">Try to Register</Link>
        </div>


      </fieldset>
  </form>
  );
}
  