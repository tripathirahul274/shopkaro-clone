

const express=require("express")
const {connection}=require("./config/db")
const {UserRoute}=require("./routes/User.routes")
const {ProductRoutes}=require("./routes/product.routes")
const {AdminRoute} =require("./routes/Admin.routes")
const app=express()
 app.use(express.json())



app.use("/user",UserRoute)
app.use("/admin",AdminRoute)
app.use("/product",ProductRoutes)


app.listen(4500,async()=>{
    try{
        await connection
        console.log('connect to db')
    }
    catch(err){
        console.log(err)
        console.log("something is worng")
    }
    console.log( "running  at 4500")
})