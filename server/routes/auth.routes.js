const express = require("express")
const chalk = require("chalk")
const { check, validationResult } = require("express-validator")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const accessTokenService = require("../services/accessToken.service")

const router = express.Router({ mergeParams: true })

router.post("/signUp", [
	check("email", "Email обязательно должен существовать.").exists(),
	check("email", `Ошибка валидации "email".`).isEmail(),
	check("password", `Пароль обязательно должен существовать.`).exists(),
	check("password", `Ошибка валидации "password". Минимальная длина 8 символов.`).isLength({ min: 8 }),
	check("password", `"password" должен содержать хотя бы одну цифру.`).custom((value) => {
		const statusValidate = /\d+/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	check("password", `"password" должен содержать хотя бы одну букву в верхнем регистре.`).custom((value) => {
		const statusValidate = /[A-Z]+/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	check("password", `"password" должен содержать хотя бы один специальный символ.`).custom((value) => {
		const statusValidate = /(?=.*[!@#$%&^*?])/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).send({
					error: {
						message: "INVALID_DATA",
						code: 400
					}
				})
			}
			
			const { email, password } = req.body
			const existingUser = await User.findOne({ email: email })
			if (existingUser) {
				return res.status(400).send({
					error: {
						message: "EMAIL_EXISTS",
						code: 400
					}
				})
			}
			const hashPassword = await bcrypt.hash(password, 12)
			const isAdmin = (email === "wellfitness.project159@yandex.ru") ? true : false
			const newUser = await User.create({
				...req.body,
				isAdmin: isAdmin,
				password: hashPassword
			})
			const tokens = accessTokenService.generateTokens({ _id: newUser._id.toString() })
			await accessTokenService.saveRefreshToken(tokens.refreshToken, newUser._id.toString())

			res.status(201).send({
				...tokens,
				userId: newUser._id.toString()
			})
		} catch (err) {
			console.log(chalk.red.inverse("Ошибка регистрации.", err.message))
			res.status(500).json({
				message: "Произошла ошибка на сервере. Обратитесь позже."
			})
		}
	}
])

router.post("/signInWithPassword", [
	check("email", "Email обязательно должен существовать.").exists(),
	check("email", `Ошибка валидации "email".`).isEmail(),
	check("password", `Пароль обязательно должен существовать.`).exists(),
	check("password", `Ошибка валидации "password". Минимальная длина 8 символов.`).isLength({ min: 8 }),
	check("password", `"password" должен содержать хотя бы одну цифру.`).custom((value) => {
		const statusValidate = /\d+/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	check("password", `"password" должен содержать хотя бы одну букву в верхнем регистре.`).custom((value) => {
		const statusValidate = /[A-Z]+/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	check("password", `"password" должен содержать хотя бы один специальный символ.`).custom((value) => {
		const statusValidate = /(?=.*[!@#$%&^*?])/g.test(value)
		if (!statusValidate) return false
		return true
	}),
	async (req, res) => {
		try {
			const { email, password } = req.body
			const existingUser = await User.findOne({ email: email })
			if (!existingUser) {
				return res.status(400).send({
					error: {
						message: "EMAIL_NOT_FOUND",
						code: 400
					}
				})
			}
			const isPasswordEqual = await bcrypt.compare(password, existingUser.password)
			if (!isPasswordEqual) {
				return res.status(400).send({
					error: {
						message: "INVALID_PASSWORD",
						code: 400
					}
				})
			}
			const tokens = accessTokenService.generateTokens({ _id: existingUser._id })
			await accessTokenService.saveRefreshToken(tokens.refreshToken, existingUser._id)

			res.status(201).send({
				...tokens,
				userId: existingUser._id
			})
		} catch (err) {
			console.log(chalk.red.inverse("Ошибка сервера при авторизации. Обратитесь позже.", err.message))
			res.status(500).json({
				message: "Ошибка сервера. Обратитесь позже."
			})
		}
	}
])

router.post("/token", async (req, res) => {
	try {
		const { refresh_token: refreshToken } = req.body
		const data = accessTokenService.validateRefresh(refreshToken)
		const dbRefresh = await accessTokenService.findRefreshInCollection(refreshToken)
		if (!data || !dbRefresh || (data._id.toString() !== dbRefresh?.userId?.toString())) {
			return res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
		const tokens = accessTokenService.generateTokens({ _id: data._id.toString() })
		await accessTokenService.saveRefreshToken(tokens.refreshToken, data._id.toString())

		res.status(201).send({
			...tokens,
			userId: data._id.toString()
		})
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка сервера. При рефрешинге токена.", err.message))
		res.status(500).json({
			message: "Обратитесь позже. Ошибка на сервере."
		})
	}
})

module.exports = router
