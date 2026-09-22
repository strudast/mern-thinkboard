import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
	try {
		const { success } = await ratelimit.limit("my-limit-key"); // usually instead of my-limit-key , here we have user.id so every user gets limited separately or per IP address

		if (!success) {
			return res.status(429).json({
				message: "Too many requests please try again later",
			});
		}
		next();
	} catch (error) {
		console.log("Rate limit error", error);
		next(error);
	}
};

export default rateLimiter;
