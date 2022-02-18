const express = require("express")
const chalk = require("chalk")
const Categories = require("../models/Categories")

const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
	try {
		const categoriesList = await Categories.find()
		
		res.status(200).send(categoriesList)
	} catch (err) {
		console.log(chalk.red.inverse("Проблемы с получением категорий"), err.message)
		res.status(500).json({
			message: "Ошибка сервера. Попробуйте обратиться позже."
		})
	}
})

module.exports = router
