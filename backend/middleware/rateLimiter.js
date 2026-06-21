const ipRequestTimes = new Map();

/**
 * Custom lightweight in-memory rate limiter middleware.
 * Prevents spamming generation routes from the same IP.
 */
function rateLimiter(req, res, next) {
  const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const now = Date.now();
  const LIMIT_MS = 5000; // 5 seconds window

  if (ipRequestTimes.has(ip)) {
    const lastRequestTime = ipRequestTimes.get(ip);
    const timePassed = now - lastRequestTime;
    
    if (timePassed < LIMIT_MS) {
      const waitTimeSec = Math.ceil((LIMIT_MS - timePassed) / 1000);
      return res.status(429).json({
        success: false,
        error: `Too many requests. Please wait ${waitTimeSec} second(s) before trying again.`,
        message: `Too many requests. Please wait ${waitTimeSec} second(s) before trying again.`,
      });
    }
  }

  // Record the timestamp of this request
  ipRequestTimes.set(ip, now);
  next();
}

module.exports = rateLimiter;
