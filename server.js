const express =require("express")
const cors = require("cors")

const {Pool} =require("pg")
const app=express()


require("dotenv").config()


app.use(cors())
app.use(express.json())


const pool =new Pool ({connectionString:process.env.DATABASE_URL})

const initiallizerDbAndServer = async()=>{
    try{
            await pool.query("SELECT 1")
            console.log("postgresql connected successfully")

        app.listen(5000,()=>{
            console.log("server is running at http://localhost:5000/")
        })
    }catch(error){
        console.log("Database Error:", error.message);
    }
}
initiallizerDbAndServer()

app.get('/', async(request,response)=>{
    const getDetails = await `SELECT * FROM fooditems`
    const result =await pool.query(getDetails)
    response.send(result.rows)
})

app.post('/addItem', async(request,response)=>{
    const {id,foodItemName,cost} =request.body
    const query =`INSERT INTO fooditems (item_id,food_item_name,cost) VALUES ($1,$2,$3)` 
    const data = await pool.query(query,[id,foodItemName,cost])
    response.send(data)
})

