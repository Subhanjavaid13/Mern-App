import ratelimit from "../config/rateLimit.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success, limit, remaining, reset } = await ratelimit.limit("my-limit-key");

        // Seconds until the current window resets (never less than 1)
        const retryAfter = Math.max(1, Math.ceil((reset - Date.now()) / 1000));

        res.set({
            "X-RateLimit-Limit": String(limit),
            "X-RateLimit-Remaining": String(Math.max(0, remaining)),
            "X-RateLimit-Reset": String(reset),
        });

        if (!success) {
            res.set("Retry-After", String(retryAfter));
            return res.status(429).json({
                message: "Too many requests. Please try again later.",
                retryAfter,
            });
        }

        next();
    } catch (error) {
        console.log("Error in ratelimit ", error)
        next(error);
    }
}

export default rateLimiter
