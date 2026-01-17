import rateLimit from "../config/upstash.js"

const  rateLimiter = async (req,res,next) => {
    try {
        const key = req.ip ?? "anonymous" // Use IP-based limiting
        const {success} = await rateLimit.limit(key)
        if(!success){
            console.log("Rate Limit: ",key)
            return res.status(429).json({message:"Too many Requests, please try again later"})
        }
        next()
    } catch (error) {
        console.log("Rate Limit Error: ",error)
        next(error)
    }
}

export default rateLimiter