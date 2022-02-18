const chalk = require("chalk")
const accessTokenService = require("../services/accessToken.service")

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next()
	}
	try {
		const token = req.headers.authorization.split(" ")[1]
		if (!token) {
			return res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
		const dataDecodeToken = accessTokenService.validateAccessToken(token)
		req.user = dataDecodeToken
		next()
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при декодировании токена."), err.message)
		res.status(401).json({
			error: {
				message: "Unauthorized",
				code: 401
			}
		})
	}
}