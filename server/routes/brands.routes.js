const express = require("express")
const chalk = require("chalk")
const Brands = require("../models/Brands")
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
	try {
		const brandsList = await Brands.find()
		
		res.status(200).send(brandsList)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка получения brands.", err.message))
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
