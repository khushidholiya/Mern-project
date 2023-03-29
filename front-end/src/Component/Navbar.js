import React  from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Navbar = () => {
  const auth = localStorage.getItem('user');
  const navigate =useNavigate();
  const logOut =() =>{
    localStorage.clear();
    navigate('/signup')
  }
  
  return (
    <div>
      <img alt='logo' className='logo'src='https://www.nicepng.com/png/detail/247-2475175_ecommerce-e-commerce-website-logo.png' />
       {auth ? <ul className='nav-ul'>
     <li><Link to="/">Products</Link></li>
     <li><Link to="/add">Add Products</Link></li>
     <li><Link to="/update">Update Products</Link></li>
     <li><Link to="/profile">Profile</Link></li>
     <li><Link onClick={logOut} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
    

     
     </ul>
     :
     <ul className='nav-ul nav-right' >
      <li> <Link to="/signup">Sign Up</Link></li>
     <li><Link to="/login">LogIn</Link></li>
     </ul>
}
    </div>
  )
}

export default Navbar
