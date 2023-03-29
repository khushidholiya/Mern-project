import React from 'react'
import Navbar from './Component/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './Component/Footer';
import SignUp from './Component/SignUp';
import PrivateComponent from './Component/PrivateComponent';
import Login from './Component/Login';
import AddProduct from './Component/AddProduct';
// import ProductList from './Component/ProductList';
// import Update from './Component/Update';
import ProductList from './Component/ProductList';
import Update from './Component/Update';
import './App.css';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
    <Navbar />
    <Routes>
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<ProductList/>}></Route>
      <Route path="/add" element={<h1>{<AddProduct/> }</h1>}></Route>
      <Route path="/update/:id" element={<h1>{<Update/>} </h1>}></Route>
      <Route path="/logout" element={<h1>Logout component</h1>}></Route>
      <Route path="/profile" element={<h1>Profile component</h1>}></Route>
      </Route>
      <Route path="/signup" element={ <SignUp />}></Route>
      <Route path='/login' element={<Login />} />
    </Routes>
     </BrowserRouter>
    
     <Footer />
    </div>
    </>
  );
}

export default App;
