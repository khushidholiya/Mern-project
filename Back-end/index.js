const express = require("express");
const cors = require("cors");
require("./DB/config");
const User = require("./DB/User");
const Product=require("./DB/Product")
const Jwt =require("jsonwebtoken")
const jwtKey ='e-comm'
const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
    if(err){
      resp.send({ result: "Something went Wrong,Please Try after Some time..." });
    }
    resp.send({result,auth:token}); 
});
})

app.post("/login", async (req, resp) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
          resp.send({ result: "Something went Wrong,Please Try after Some time..." });
        }
        resp.send({user,auth:token}); 
      })
      
    } else {
      resp.send({ result: "No User Found" });
    }
  }
});

app.post("/add-product",async(req,resp)=>{
  let product =new Product(req.body)
  let result = await product.save()
  resp.send(result)
})

app.get("/products",async(req,resp)=>{
  let products =await Product.find()
  if(products.length>0){
    resp.send(products)
  }else{
    resp.send({result :"No products Found"})
  }
})

 app.delete("/product/:id",async(req,resp)=>{
  console.log(req.params.id)
  const result =await Product.deleteOne({userId:req.params.id})
  resp.send(result)
 })

 app.get("/product/:id",async(req,resp)=>{
   let result=await Product.findOne({_id:req.params.id})
  if(result){
    resp.send(result)}
   else{
   resp.send({result:"No record Found"})
   }
  })
  app.put("/product/:id",async(req,resp)=>{
let result=await Product.updateOne({_id:req.params.id},{
  $set:req.body
})
resp.send(result) 
  })

  app.get("/search/:key",async(req,resp)=>{
    let result=await Product.find({
      "$or":[
        {name:{$regex:req.params.key}},
         {price:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
         {category:{$regex:req.params.key}},
       
      ]
    })
    resp.send(result)
  })
  function verifyToken(req,resp,next){
    let token= req.headers['authorization']
    if(token){
      token=token.split('')
      console.log("Middleware called if",token )
      Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err){
          resp.send("Please add  valid token ")
        }else{
next()
        }
      })  
    }else{
      resp.send("Please add token with header")
    }
    
  }


app.listen(5000);


// headers:{
//   authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
// }