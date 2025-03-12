import express from  "express"
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import productRouts from './routes/productRouts.js'
import pool from "./config/db.js"
dotenv.config();



const app = express();




const PORT = process.env.PORT;



app.use(express.json());
app.use(cors());
app.use(helmet()); // helmat is a security midleware that helps you to protect your app by setting various headers
app.use(morgan("dev")); // log the request
app.use("/api/products",productRouts)
async function initDb(){
    try{
await pool.query(`
CREATE TABLE IF NOT EXISTS products(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
image VARCHAR(255) NOT NULL,
price DECIMAL(10,2) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`);
console.log("✅ Database initialized");

    }
    catch(e){
        console.log("error init db", e);

    }
}
initDb().then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running on port " + PORT)
    })
}
    
)