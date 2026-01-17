import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"
import dotenv from "dotenv"

dotenv.config()

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN
})

// Create a ratelimiter that allows 100 request per 60 s
const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100,"60 s")
})

export default rateLimit