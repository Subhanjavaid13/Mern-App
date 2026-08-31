import ratelimit from "../config/rateLimit.js";


const rateLimiter = async(req,res,next) =>{
    try {
        const {success} = await ratelimit.limit("my-limit-key")
        if(!success){
            return res.status(429).json({
                message:"Too many request ,Please try later.Thanks!"
            })
        }

        next(); 
    } catch (error) {
        console.log("Error in ratelimit ", error)
        next(error);
    }

}

export default rateLimiter