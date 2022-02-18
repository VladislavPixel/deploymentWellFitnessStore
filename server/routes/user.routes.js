const express = require("express")
const chalk = require("chalk")
const User = require("../models/User")
const authMiddleware = require("../middleware/auth.middleware")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")

const router = express.Router({ mergeParams: true })

router
	.route("/:id")
		.get(authMiddleware, async (req, res) => {
			try {
				if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
					return res.status(400).send({
						error: {
							message: "Пользователь с таким Token не существует",
							code: 400
						}
					})
				}
				const { id } = req.params
				if (!(id === req.user._id)) {
					return res.status(401).send({
						error: {
							message: "Unauthorized",
							code: 401
						}
					})
				}
				const existingUser = await User.findById(id)
				
				res.status(200).send(existingUser)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка при получении данных о currentUser."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь позже."
				})
			}
		})
		.patch(authMiddleware, async (req, res) => {
			try {
				if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
					return res.status(400).send({
						error: {
							message: "Пользователь с таким Token не существует",
							code: 400
						}
					})
				}
				const { id } = req.params
				const user = await User.findById(id)
				if(user.isAdmin || (id !== req.user._id.toString())) {
					return res.status(401).send({
						error: {
							message: "Unauthorized",
							code: 401
						}
					})
				}
				const { numberOfPurchases } = req.body
				if (user.numberOfPurchases) {
					user.numberOfPurchases += numberOfPurchases
				} else {
					user.numberOfPurchases = numberOfPurchases
				}
				await user.save()

				res.status(200).send(null)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка при обновлении user."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь позже."
				})
			}
		})

router.post("/", [
	check("login", "Поле login должно быть заполнено.").exists(),
	check("email", "Поле email обязательно должно быть заполнено.").exists(),
	check("email", "Почта должна удовлетворять общим требованиям.").isEmail(),
	check("keyPhrase", "Ключевая фраза обязательна. Основная сверка по ней.").exists(),
	check("surName", "Фамилия должна быть заполнена.").exists(),
	check("password", "Пароль должен быть обязательно заполнен.").exists(),
	check("password", "Пароль должен содержать хотя бы одну цифру.").custom(value => {
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
	check("password", `Ошибка валидации "password". Минимальная длина 8 символов.`).isLength({ min: 8 }),
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).send({
					error: {
						code: 400,
						message: "INVALID_DATA"
					}
				})
			}
			const data = req.body
			const existingUser = await User.findOne({ email: data.email })
			if (!existingUser) {
				return res.status(400).send({
					error: {
						code: 400,
						message: "EMAIL_NOT_FOUND"
					}
				})
			}
			const isValid = (existingUser.login === data.login) && (existingUser.keyPhrase === data.keyPhrase) && (existingUser.surName === data.surName)
			if (!isValid) {
				return res.status(401).send({
					error: {
						code: 401,
						message: "INVALID_DATA"
					}
				})
			}
			const hashNewPassword = await bcrypt.hash(data.password, 12)
			existingUser.password = hashNewPassword
			await existingUser.save()
			
			res.status(201).send(null)
		} catch (err) {
			console.log(chalk.red.inverse("Возникла ошибка при восстановлении пароля."), err.message)
			res.status(500).json({
				message: "Ошибка сервера. Обратитесь позже."
			})
		}
	}
])

module.exports = router
