const jwt = require("jsonwebtoken")
const config = require("config")
const Token = require("../models/Token")
const chalk = require("chalk")

class AccessTokenService{
	generateTokens(controlData) {
		const accessToken = jwt.sign(controlData, config.get("accessTokenSecret"), {
			expiresIn: "1h"
		})
		const refreshToken = jwt.sign(controlData, config.get("refreshTokenSecret"))
		return {
			accessToken,
			refreshToken,
			expiresIn: 3600
		}
	}
	async saveRefreshToken(refreshToken, userId) {
		try {
			const existingRefreshToken = await Token.findOne({ userId: userId })
			if (existingRefreshToken) {
				existingRefreshToken.refreshToken = refreshToken
				return existingRefreshToken.save()
			}
			const newRefreshTokenEssence = await Token.create({ userId, refreshToken })
			return newRefreshTokenEssence
		} catch (err) {
			console.log(chalk.red.inverse("Что-то пошло не так при сохранении refreshToken. Попробуйте позже.", err.message))
		}
	}
	validateRefresh(refreshToken) {
		try {
			return jwt.verify(refreshToken, config.get("refreshTokenSecret"))
		} catch (err) {
			console.log(err.message, "Ошибка в сервисе токена. validateRefresh")
			return null
		}
	}
	validateAccessToken(accessToken) {
		try {
			return jwt.verify(accessToken, config.get("accessTokenSecret"))
		} catch (err) {
			console.log(err.message, "Ошибка в сервисе токена. validateAccessToken")
			return null
		}
	}
	async findRefreshInCollection(refreshToken) {
		try {
			return await Token.findOne({ refreshToken: refreshToken })
		} catch (err) {
			console.log(err.message, "Ошибка в поиске рефреш токена. findRefreshInCollection")
			return null
		}
	}
}

module.exports = new AccessTokenService()
