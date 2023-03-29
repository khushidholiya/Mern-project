const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/E-commerces').then((result)=>{
    console.log("database is connected.")
})

mongoose.set('strictQuery',true)
