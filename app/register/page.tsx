'use client'
import { useState } from "react";
import axios from "axios";
import { RegisterData } from "../lib/definitions";
import Link from "next/link";

export default function Register() {

  const [registerData, setRegisterData] = useState<RegisterData>({userName: "", email: "", company: "", occupation: ""})

  const [message, setMessage] = useState("")

  const [pending, setPending] = useState(false)

  function handleChange(event: { target: { name: string; value: string; }; }) {
    const {name, value} = event.target

    setRegisterData( prev => {
      return {
        ...prev,
        [name]: value
      }
    })  
  }

  function handleSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault()
    setPending(true)

    axios.post('/api/register', registerData)
    .then(function (response) {
      console.log(response);
      setMessage(response.data.message)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  return (
    <>
    {message
    ?
    <div className="container" style={{"display":"flex","alignItems":"center","flexDirection": "column"}}>
      <h1>{message}</h1>

        <Link href="/login">
          <input
            type="submit"
            value="Go to Log in"
            />
        </Link>
    </div>
    :
    <form onSubmit={handleSubmit}>
      <fieldset className="container" style={{"width": "355px"}}>
        <input
          type="text"
          name="userName"
          value={registerData.userName}
          placeholder="Enter your name"
          aria-label="Text"
          required
          onChange={handleChange}
          />
      
        <input
          type="email"
          name="email"
          value={registerData.email}
          placeholder="Enter your email"
          autoComplete="email"
          required
          onChange={handleChange}
          />
    
        <input
          type="text"
          name="company"
          value={registerData.company}
          placeholder="Enter your company (optional)"
          aria-label="Text"
          onChange={handleChange}
          />

        <input
          type="text"
          name="occupation"
          value={registerData.occupation}
          placeholder="Enter your occupation (optional)"
          aria-label="Text"
          onChange={handleChange}
          />
        
        <input
            type="submit"
            value="Register"
            aria-disabled={pending}
            />
      </fieldset>
    </form>
    }
    </>

  );
}
