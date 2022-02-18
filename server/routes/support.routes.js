const express = require("express")
const chalk = require("chalk")
const Support = require("../models/Support")
const authMiddleware = require("../middleware/auth.middleware")
const User = require("../models/User")
const mongoose = require("mongoose")
const { check, validationResult } = require("express-validator")

const router = express.Router({ mergeParams: true })

// /api/support

router
	.route("/")
		.post(authMiddleware, [
			check("email", "Поле email обязательно для заполнения").exists(),
			check("email", "Поле email должно быть валидным").isEmail(),
			check("message", "Поле message должно быть заполнено").exists(),
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
					if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
						return res.status(400).send({
							error: {
								message: "Такой ресурс пользователя не существует",
								code: 400
							}
						})
					}
					const existingUser = await User.findById(req.user._id)
					if (!existingUser || existingUser.isAdmin) {
						return res.status(401).send({
							error: {
								message: "Unauthorized",
								code: 401
							}
						})
					}
					await Support.create({
						...req.body
					})

					res.status(201).send(null)
				} catch (err) {
					console.log(chalk.red.inverse("Ошибка при создании ресурса."), err.message)
					res.status(500).json({
						message: "Ошибка сервера. Обратитесь позже.",
						code: 500
					})
				}
			}
		])
		.get(authMiddleware, async (req, res) => {
			try {
				if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
					return res.status(400).send({
						error: {
							message: "Пользователя с таким Token не существует",
							code: 400
						}
					})
				}
				const existingUser = await User.findById(req.user._id)
				if (!existingUser || !existingUser.isAdmin) {
					return res.status(401).send({
						error: {
							message: "Unauthorized",
							code: 401
						}
					})
				}
				const supportMessagesList = await Support.find()

				res.status(200).send(supportMessagesList)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка при получении обращений."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь позже."
				})
			}
		})

router.delete("/:id", authMiddleware, async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
			return res.status(400).send({
				error: {
					message: "Пользователя с таким Token не существует",
					code: 400
				}
			})
		}
		const existingUserDb = await User.findById(req.user._id)
		if (!existingUserDb || !existingUserDb.isAdmin) {
			return res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).send({
				error: {
					message: "Такой ресурс не существует",
					code: 400
				}
			})
		}
		const existingSupportMessage = await Support.findById(id)
		await existingSupportMessage.remove()
		
		res.status(200).send(null)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при удалении обращения-русурса."), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
