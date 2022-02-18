const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const User = require("../models/User")
const { check, validationResult } = require("express-validator")
const mongoose = require("mongoose")
const chalk = require("chalk")
const PurchaseBox = require("../models/PurchaseBox")

const router = express.Router({ mergeParams: true })

router
	.route("/")
		.post(authMiddleware, [
			check("carState", "Корзина не должна быть пустой").custom((value) => {
				if (value.length > 0) return true
				return false
			}),
			check("stateDelivery", "Информация о месте доставки и дате должна быть обязательно заполнена").custom((value) => {
				let errors = 0
				Object.keys(value).forEach(item => {
					if (!value[item]) {
						errors++
					}
				})
				if (errors === 0) return true
				return false
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
								message: "Пользователя с таким Token не существует",
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
					await PurchaseBox.create({
						...req.body
					})

					res.status(201).send(null)
				} catch (err) {
					console.log(chalk.red.inverse("Произошла ошибка при создании заказа."), err.message)
					res.status(500).json({
						message: "Ошибка сервера. Обратитесь позже."
					})
				}
			}
		])
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
				const existingUser = await User.findById(req.user._id)
				if (!existingUser || !existingUser.isAdmin) {
					return res.status(401).send({
						error: {
							message: "Unauthorized",
							code: 401
						}
					})
				}
				const purchaseBoxList = await PurchaseBox.find()

				res.status(200).send(purchaseBoxList)
			} catch (err) {
				console.log(chalk.red.inverse("Произошла ошибка при получении заказов."), err.message)
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
					message: "Пользователь с таким Token не существует",
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
					message: "Ресурс с таким id не найден",
					code: 400
				}
			})
		}
		const existingPurchaseBoxElement = await PurchaseBox.findById(id)
		await existingPurchaseBoxElement.remove()

		res.status(200).send(null)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при удалении заказа"), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь к ресурсу позднее."
		})
	}
})

module.exports = router
