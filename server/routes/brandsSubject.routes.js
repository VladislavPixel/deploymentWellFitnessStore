const express = require("express")
const BrandsSubjectCategories = require("../models/BrandsSubjectCategories")
const chalk = require("chalk")
const router = express.Router({ mergeParams: true })

router.get("/", async (req, res) => {
	try {
		const brandsSubjectCategoriesList = await BrandsSubjectCategories.find()
		
		res.status(200).send(brandsSubjectCategoriesList)
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при получении brandsSubject.", err.message))
		res.status(500).json({
			message: "Ошибка сервера. Обратитесь позже."
		})
	}
})

module.exports = router
