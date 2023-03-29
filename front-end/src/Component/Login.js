import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email,setEmail]=React.useState('')
  const[password,setPassword ]=React.useState('')
  const navigate = useNavigate()
  useEffect(() => {
  const auth =localStorage.getItem('user');
  if(auth)
  {
    navigate("/")
  }

  }, [])
  const handleLogin=async () =>{ 
console.log(email,password)
let result= await fetch("http://localhost:5000/login",{
 method:"POST",
 body:JSON.stringify({email,password}),
  headers: { "Content-Type": "application/json" }
 
})
result=await result.json()
console.log(result)
if(result.auth){
localStorage.setItem("user",JSON.stringify(result.user))
localStorage.setItem("token",JSON.stringify(result.auth))
 navigate("/")
}else{
  alert("please enter correct details")
}
  }
  return (
    <div className='login'>
     <input className='inputbox' type="text" placeholder='Enter Email' value={email}
     onChange={(e) => setEmail(e.target.value)} />
     <input type="password" className='inputbox' placeholder='Enter Your Password' value={password}
     onChange={(e)=>setPassword(e.target.value)} />
     <button onClick={handleLogin} className="appbutton" type="button" >
       Log In
      </button>
    </div>
  )
}

export default Login
