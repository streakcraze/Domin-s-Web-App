const jwt = require("jsonwebtoken");

function auth(req, res, next) {
	const token = req.header("x-auth-token");

	if (!token) return res.status(401).json({ msg: "No token" });

	try {
		const decodedToken = jwt.verify(token, "domin");
		req.user = decodedToken;
		next();
	} catch (e) {
		res.status(400).json({ msg: "Invalid token" });
	}
}

module.exports = auth;
