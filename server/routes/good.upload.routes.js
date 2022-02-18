const express = require("express")
const chalk = require("chalk")
const uploadImageMiddleware = require("../middleware/uploadImages.middleware")

const router = express.Router({ mergeParams: true })

router.post("/", uploadImageMiddleware.single("imageFile"), async(req, res) => {
	try {
		if (req.file) {
			return res.status(201).json(req.file)
		}
		res.status(400).send({
			error: {
				code: 400,
				message: "Что-то пошло не так..."
			}
		})
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка при сохранении картинки"), err.message)
		res.status(500).json({
			message: "Ошибка сервера"
		})
	}
})

module.exports = router
