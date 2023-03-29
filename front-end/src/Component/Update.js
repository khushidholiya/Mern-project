import React,{useState,useEffect}from 'react'
import { useParams,useNavigate } from 'react-router-dom';

const Update = () => {

        const [name, setName] = useState("");
        const [price, setPrice] = useState("");
        const [category, setCategory] = useState("");
        const [company, setComapny] = useState("");
        const params =useParams()
        const navigate=useNavigate()

        useEffect(() => {
        
        getProductsDetails();
        },[])
       
        const getProductsDetails=async()=>{
            console.log(params)
            let result=await fetch(`http://localhost:5000/product/${params.id}`)
           
            result = await result.json()
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setComapny(result.company)
           
        }
      
     const update =async ()=>{
console.log(name,price,category,company)
let result=await fetch(`http://localhost:5000/product/${params.id}`,{
method:"put",
body:JSON.stringify({name,price,category,company }),
headers:{
    "Content-type":"application/json"
}

})
result =await result.json()
console.log(result)
navigate("/")
     }   

  return (
    <div>
      <div className="product-listing ">
      <h3>Update Product</h3>
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Price "
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
     
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
       
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => {
          setComapny(e.target.value);
        }}
      />
      
      <button className="appbutton" onClick={update}>
        Update Product
      </button>
    </div>


    </div>
  )
}

export default Update
