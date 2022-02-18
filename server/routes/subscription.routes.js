const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const chalk = require("chalk")
const User = require("../models/User")
const Subscription = require("../models/Subscription")
const mongoose = require("mongoose")
const { check, validationResult } = require("express-validator")

const router = express.Router({ mergeParams: true })

router
	.route("/")
		.post(authMiddleware, [
			check("email", "Поле email должно быть обязательно заполнено").exists(),
			check("email", "Поле email должно быть валидным").isEmail(),
			check("phone", "Поле phone должно содержать 11 цифр").isLength({ min: 11, max: 11 }),
			check("phone", "Поле phone должно состоять только из цифр").custom((value) => {
				const statusValidate = /^\d+$/g.test(value)
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
					const existingSubscriptionByEmail = await Subscription.findOne({ email: req.body.email })
					if (existingSubscriptionByEmail) {
						return res.status(400).send({
							error: {
								message: "EMAIL_EXISTS",
								code: 400
							}
						})
					}
					await Subscription.create({
						...req.body
					})
					
					res.status(201).send(null)
				} catch (err) {
					console.log(chalk.red.inverse("Произошла ошибка при создании ресурса подписки."), err.message)
					res.status(500).json({
						message: "Ошибка сервера. Обратитесь к системе позже."
					})
				}
			}
		])
		.get(authMiddleware, async (req, res) => {
			try {
				if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
					return res.status(400).send({
						error: {
							message: "Такой ресурс пользователя не существует",
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
				const subscriptionsList = await Subscription.find()

				res.status(200).send(subscriptionsList)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка в получении подписок."), err.message)
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
					message: "Пользватель с таким Token не существует",
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
		const { id } = req.params
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).send({
				error: {
					message: "Такого ресурса на удаление подписки не существует",
					code: 400
				}
			})
		}
		const existingSubscriptionEssence = await Subscription.findById(id)
		existingSubscriptionEssence.remove()

		res.status(200).send(null)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка в удалении русурса подписки."), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
