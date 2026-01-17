// package imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

// routes imports
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT
const __dirname = path.resolve()

// Middleware - Function runs in the middle of request and response

if(process.env.NODE_ENV !== "production"){
app.use(cors({
    origin:"http://localhost:5173"
}))
}
app.use(express.json()) //  This middleware will parse JSON bodies: req.body
app.use(rateLimiter)    //  This middleware is use for Rate limiting

app.use("/api/notes",notesRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
})
}

connectDB().then(() => {app.listen(PORT, () => {
    console.log(`Server Connected successfully to ${PORT}`)
})})


