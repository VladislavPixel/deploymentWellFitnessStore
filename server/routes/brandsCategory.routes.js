const express = require("express")
const chalk = require("chalk")
const BrandsCategories = require("../models/brandsCategories")
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
	try {
		const brandsCategoriesList = await BrandsCategories.find()
		
		res.status(200).send(brandsCategoriesList)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка получени brandsCategories.", err.message))
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
