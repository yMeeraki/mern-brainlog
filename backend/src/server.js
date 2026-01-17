// package imports
import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// routes imports
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"


dotenv.config()

const app = express()
const PORT = process.env.PORT

// Middleware - Function runs in the middle of request and response

app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json()) //  This middleware will parse JSON bodies: req.body
app.use(rateLimiter)    //  This middleware is use for Rate limiting

app.use("/api/notes",notesRoutes)

connectDB().then(() => {app.listen(PORT, () => {
    console.log(`Server Connected successfully to ${PORT}`)
})})


