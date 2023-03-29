import React, { useState } from "react";

const AddProduct = () => {
  const [name, setname] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setComapny] = useState("");
  const [error, setError] = useState(false);

  const productList = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
  };
  const userId = JSON.parse(localStorage.getItem("user"))._id;

  return (
    <div className="product-listing ">
      <h3>Add Product</h3>
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Name"
        value={name}
        onChange={(e) => {
          setname(e.target.value);
        }}
      />
      {error && !name &&<span>Enter valid Name..</span> }
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Price "
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && <span>Enter valid Price..</span>}
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Category"
        value={category}
        onChange={(e) => {
          setcategory(e.target.value);
        }}
      />
       {error && !category&&<span>Enter valid Category..</span> }
      <input
        type="text"
        className="inputbox"
        placeholder="Enter Product Company"
        value={company}
        onChange={(e) => {
          setComapny(e.target.value);
        }}
      />
     {error && !company && <span>Enter valid Company..</span> }
      <button className="appbutton" onClick={productList}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
