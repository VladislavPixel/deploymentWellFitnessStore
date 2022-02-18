const express = require("express")
const chalk = require("chalk")
const authMiddleware = require("../middleware/auth.middleware")
const { check, validationResult } = require("express-validator")
const mongoose = require("mongoose")
const User = require("../models/User")
const Car = require("../models/Car")
const router = express.Router({ mergeParams: true })

router
	.route("/")
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
				const { orderBy, equalTo } = req.query
				if (!existingUser) {
					return res.status(400).send({
						error: {
							message: "Пользователь не найден",
							code: 400
						}
					})
				}
				if (existingUser.isAdmin || (req.user._id !== equalTo)) {
					return res.status(401).send({
						error: {
							message: "Unauthorized",
							code: 401
						}
					})
				}
				const carList = await Car.find({ [orderBy]: equalTo })

				res.status(200).send(carList)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка получения данных карзины."), err.message)
				res.status(500).json({
					message: "Ошибка сервера. Обратитесь на ресурс позже."
				})
			}
		})
		.post(authMiddleware, [
			check().custom((value) => {
				if (value.count === 0 || value.count === "0") return false
				let countError = 0
				Object.keys(value).forEach(key => {
					if (key !== "__v") {
						if (!value[key]) {
							countError++
						}
					}
				})
				if (countError === 0) return true
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
					if (!existingUser) {
						return res.status(400).send({
							error: {
								message: "Пользователь не найден в БД",
								code: 400
							}
						})
					}
					if (existingUser.isAdmin) {
						return res.status(401).send({
							error: {
								message: "Unauthorized",
								code: 401
							}
						})
					}
					const existingGood = await Car.findOne({ name: req.body.name })
					if (existingGood) {
						existingGood.count = req.body.count
						existingGood.totalInStock = req.body.totalInStock
						await existingGood.save()

						res.status(201).send(null)
					} else {
						await Car.create({
							...req.body
						})

						res.status(201).send(null)
					}
				} catch (err) {
					console.log(chalk.red.inverse("Ошибка в процессе помещения элемента в коризну."), err.message)
					res.status(500).json({
						message: "Ошибка сервера. Обратитесь к ресурсу немного позже."
					})
				}
			}
		])

router.delete("/:id?", authMiddleware, async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
			return res.status(400).send({
				error: {
					message: "Пользователь с таким Token не найден",
					code: 400
				}
			})
		}
		const existingUser = await User.findById(req.user._id)
		if (!existingUser) {
			return res.status(400).send({
				error: {
					message: "Пользователь не найден",
					code: 400
				}
			})
		}
		if (existingUser.isAdmin) {
			return res.status(401).send({
				error: {
					message: "Unauthorized",
					code: 401
				}
			})
		}
		const { id } = req.params
		if (id) {
			if (!mongoose.Types.ObjectId.isValid(id)) {
				return res.status(400).send({
					error: {
						message: "Ресурс с таким передаваемым параметром не найден",
						code: 400
					}
				})
			}
			const existingCarElement = await Car.findById(id)
			if (!existingCarElement) {
				return res.status(400).send({
					error: {
						message: "Элемент не найден",
						code: 400
					}
				})
			}
			if (existingCarElement.currentUser !== req.user._id) {
				return res.status(401).send({
					error: {
						message: "Unauthorized",
						code: 401
					}
				})
			}
			await existingCarElement.remove()
		} else {
			await Car.deleteMany({ currentUser: req.user._id })
		}

		res.status(200).send(null)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка в процессе удаления элемента из корзины."), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
