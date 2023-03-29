import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteproduct = async (id) => {
    console.log(id)
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
     result = await result.json();
     console.log("result-->", result);
     if(result)
     {
        getProducts()
     } 

}
const search=async(event)=>{
  let key =event.target.value
  if(key){
    let result =await fetch(` http://localhost:5000/search/${key}`)
    result=await result.json()
   if(result){
 setProducts(result)
   }else{
    getProducts()
   }
  }
 
 
  
  }

 
  return (
    <div className="product-list">
      <h3>Product List</h3>
       <input className="searchbox" type="text" placeholder="Search Product" onChange={search}  
    /> 


      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
     
     {
     products.length>0 ? products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
            <button onClick={() => deleteproduct(item.userId)}>Delete</button>
            <Link to={"/update/"+item._id}>Update</Link>
          </li>
        </ul>
      ))
      :<h3>No data found</h3>
    }
    </div>
  );
};


export default ProductList
