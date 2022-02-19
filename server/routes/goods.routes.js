const express = require("express")
const chalk = require("chalk")
const Goods = require("../models/Goods")
const User = require("../models/User")
const authMiddleware = require("../middleware/auth.middleware")
const { check, validationResult } = require("express-validator")
const mongoose = require("mongoose")
const fs = require("fs")
const path = require("path")

const router = express.Router({ mergeParams: true })

router
	.route("/")
		.get(async (req, res) => {
			try {
				const goodsList = await Goods.find()

				res.status(200).send(goodsList)
			} catch (err) {
				console.log(chalk.red.inverse("Ошибка получения goods."), err.message)
				res.status(500).json({
					message: "Проблемы с сервером. Обратитесь позже."
				})
			}
		})
		.post(authMiddleware, [
			check("name", "Поле name должно быть заполнено").exists(),
			check("price", `Поле "Цена" должно быть обязательно заполнено...`).exists(),
			check("price", `Поле "Цена" должно состоять только из цифр...`).custom(value => {
				const statusValidate = /^\d+$/g.test(value)
				if(!statusValidate) return false
				return true
			}),
			check("price", `Поле "Цена" должно быть больше 0 и целым числом...`).custom(value => {
				const statusValidate = /^[1-9][0-9]*$/g.test(value)
				if (!statusValidate) return false
				return true
			}),
			check("description", `Поле "Описание" должно быть обязательно заполнено...`).exists(),
			check("imagesPath", `Поле "Путь для изображения" обязательно для заполнения...`).exists(),
			check("imagesPath", "Введенная строчка не является форматом изображения. Допустимые (.png .svg .jpg .jpeg)").custom(value => {
				const statusValidate = /\.(png|svg|jpe?g)$/g.test(value)
				if (!statusValidate) return false
				return true
			}),
			check("category", `Поле "Категория" обязательно для заполнения...`).exists(),
			check("totalInStock", `Поле "Количество на складе" обязательно для заполнения...`).exists(),
			check("totalInStock", `Поле "Количество на складе" должно состоять только из цифр...`).custom(value => {
				const statusValidate = /^\d+$/g.test(value)
				if(!statusValidate) return false
				return true
			}),
			check("totalInStock", `Нет смысла добавлять товар в БД, если его нет на складе...`).custom(value => {
				const statusValidate = /^[1-9][0-9]*$/g.test(value)
				if (!statusValidate) return false
				return true
			}),
			async (req, res) => {
				try {
					if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
						return res.status(400).send({
							error: {
								message: "Пользователь по такому Token не найден",
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
					const error = validationResult(req)
					if (!error.isEmpty()) {
						return res.status(400).send({
							error: {
								message: "INVALID_DATA",
								code: 400
							}
						})
					}
					const existingGoodByName = await Goods.findOne({ name: req.body.name })
					if (existingGoodByName) {
						return res.status(400).send({
							error: {
								message: "COINCIDENT_NAME",
								code: 400
							}
						})
					}
					const existingGoodByImagesPath = await Goods.findOne({ imagesPath: req.body.imagesPath })
					if (existingGoodByImagesPath) {
						return res.status(400).send({
							error: {
								message: "COINCIDENT_IMAGESPATH",
								code: 400
							}
						})
					}
					delete req.body.imageFile
					const newGood = await Goods.create({
						...req.body
					})

					res.status(201).send(newGood)
				} catch (err) {
					console.log(chalk.red.inverse("Произошла ошибка при создании товара."), err.message)
					res.status(500).send({
						error: {
							message: "Проблемы с сервером. Обратитесь позже.",
							code: 500
						}
					})
				}
			}
		])

router
	.route("/:id")
		.patch(authMiddleware, [
			check("name", "Поле name должно быть заполнено").exists(),
			check("price", `Поле "Цена" должно быть обязательно заполнено...`).exists(),
			check("price", `Поле "Цена" должно состоять только из цифр...`).custom(value => {
				const statusValidate = /^\d+$/g.test(value)
				if(!statusValidate) return false
				return true
			}),
			check("price", `Поле "Цена" должно быть больше 0 и целым числом...`).custom(value => {
				const statusValidate = /^[1-9][0-9]*$/g.test(value)
				if (!statusValidate) return false
				return true
			}),
			check("description", `Поле "Описание" должно быть обязательно заполнено...`).exists(),
			check("imagesPath", `Поле "Путь для изображения" обязательно для заполнения...`).exists(),
			check("imagesPath", "Введенная строчка не является форматом изображения. Допустимые (.png .svg .jpg .jpeg)").custom(value => {
				const statusValidate = /\.(png|svg|jpe?g)$/g.test(value)
				if (!statusValidate) return false
				return true
			}),
			check("category", `Поле "Категория" обязательно для заполнения...`).exists(),
			check("totalInStock", `Поле "Количество на складе" должно состоять только из цифр...`).custom(value => {
				const statusValidate = /^\d+$/g.test(value)
				if(!statusValidate) return false
				return true
			}),
			async (req, res) => {
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
					if (!mongoose.Types.ObjectId.isValid(id)) {
						return res.status(400).send({
							error: {
								message: "Единица не найдена",
								code: 400
							}
						})
					}
					const existingGood = await Goods.findById(id)
					if (!existingGood || (id !== req.body._id)) {
						return res.status(400).send({
							error: {
								message: "Товар с таким id не найден",
								code: 400
							}
						})
					}
					const existingUser = await User.findById(req.user._id)
					if (!existingUser) {
						return res.status(401).send({
							error: {
								message: "Unauthorized",
								code: 401
							}
						})
					}
					if (existingUser.isAdmin) {
						const existingGoodByName = await Goods.findOne({ name: req.body.name })
						const existingGoodByImagesPath = await Goods.findOne({ imagesPath: req.body.imagesPath})
						if (existingGoodByName || existingGoodByImagesPath) {
							if (existingGoodByName && existingGoodByName._id.toString() !== existingGood._id.toString()) {
								return res.status(400).send({
									error: {
										message: "COINCIDENT_NAME",
										code: 400
									}
								})
							}
							if (existingGoodByImagesPath && existingGoodByImagesPath._id.toString() !== existingGood._id.toString()) {
								return res.status(400).send({
									error: {
										message: "COINCIDENT_IMAGESPATH",
										code: 400
									}
								})
							}
						}
						const updatedGood = await Goods.findByIdAndUpdate(id, req.body, {new: true})

						res.status(200).send(updatedGood)
					} else {
						const updatedGood = await Goods.findByIdAndUpdate(id, { totalInStock: req.body.totalInStock }, { new: true })
						
						res.status(200).send(updatedGood)
					}
				} catch (err) {
					console.log(chalk.red.inverse("Проблемы с обновление данных товара"), err.message)
					res.status(500).json({
						message: "Проблемы с сервером. Обратитесь позже."
					})
				}
			}
		])
		.delete(authMiddleware, async (req, res) => {
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
				if (!existingUser && !existingUser.isAdmin) {
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
							message: "Товар по такому id не существует",
							code: 400
						}
					})
				}
				const existingGood = await Goods.findById(id)
				if (!existingGood) {
					return res.status(400).send({
						error: {
							message: "Товар не был найден",
							code: 400
						}
					})
				}
				fs.unlink(path.join(__dirname, "..", existingGood.pathServerImage), (err) => {
					if (err) {
						console.log(chalk.red.inverse(`Возникла ошибка при удалении изображения. Путь до нее: ${existingGood.pathServerImage}`), err)
						return res.status(500).send({
							error: {
								message: "Ошибка при удалении изображения. Что-то пошло не так.",
								code: 500
							}
						})
					}
				})
				await existingGood.remove()

				res.status(200).send(null)
			} catch (err) {
				console.log(chalk.red.inverse("Проблемы с удалением товара."), err.message)
				res.status(500).json({
					message: "Проблемы с сервером. Обратитесь позже."
				})
			}
		})

module.exports = router
