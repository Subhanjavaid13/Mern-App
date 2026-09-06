import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import './env.js'

/**
 * Shared limiter. `limit(identifier)` is called per client (see rateLimiter middleware),
 * so one busy visitor cannot use up everyone else's quota.
 *
 * Disabled automatically when the Upstash variables are missing, so the app still
 * runs locally without Redis credentials.
 */
const isConfigured =
    Boolean(process.env.UPSTASH_REDIS_REST_URL) && Boolean(process.env.UPSTASH_REDIS_REST_TOKEN)

const ratelimit = isConfigured
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(100, "60 s"),
        prefix: "cocoa-notes",
    })
    : null

if (!isConfigured) {
    console.warn("Upstash credentials missing — rate limiting is disabled.")
}

export default ratelimit;
