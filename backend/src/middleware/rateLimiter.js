import ratelimit from "../config/rateLimit.js";

/** One bucket per client, so a single busy visitor cannot block everyone else. */
const clientKey = (req) => req.ip || req.socket?.remoteAddress || "unknown";

const rateLimiter = async (req, res, next) => {
    // No Upstash credentials configured — skip limiting entirely.
    if (!ratelimit) return next();

    try {
        const { success, limit, remaining, reset } = await ratelimit.limit(clientKey(req));

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
        // Fail OPEN: if Redis is unreachable the API keeps working rather than
        // returning 500 for every request.
        console.error("Rate limiter unavailable, allowing request:", error.message);
        next();
    }
}

export default rateLimiter
