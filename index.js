const express = require("express")

const cors = require("cors")
const { connection } = require("./connection/db")
const router = require("./routes/jobs.routes")
const app = express()
app.use(express.json())
app.use(cors())
app.use("/api",router)

app.listen(9009,async()=>{
    try{
        await connection
        console.log("Server mongoose started");
    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 9009");
})