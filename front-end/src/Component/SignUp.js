import React, { useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate =useNavigate()
 
  useEffect(() =>{
    const auth = localStorage.getItem('user');
    if(auth) {
      navigate('/')
    } 
  })

  const collectdata = async () => {
    console.log(name);
    console.log(email);
    console.log(Password);
    let result =await  fetch('http://localhost:5000/register', {
      method: "POST",
      body: JSON.stringify({ name, email, Password }),
      headers: { "Content-Type": "application/json" },
     
       
      })
      
      result=await result.json()  
      console.log(result)
      localStorage.setItem("user",JSON.stringify(result.result))
      localStorage.setItem("token",JSON.stringify(result.auth))
      
        navigate('/')
      

      
 }
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputbox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Your Name"
      />
      <input
        className="inputbox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
      />
      <input
        className="inputbox"
        type="password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Your Password"
      />
      <button className="appbutton" type="button" onClick={collectdata}>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
