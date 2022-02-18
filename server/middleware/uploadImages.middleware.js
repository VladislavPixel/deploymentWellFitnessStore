const multer = require("multer")

const typesImages = ["image/jpeg", "image/png", "image/jpg", "image/svg"]
// Сохранение картинки в папке сервера за счет multer
const storage = multer.diskStorage({ // create store для картинок
	destination(req, file, cb) {
		cb(null, "imagesGoods/") // папка, куда сохраняются картинки
	},
	filename(req, file, cb) {
		cb(null, `${Date.now()}-${file.originalname}`) // имя под которым сохранится картинка
	}
})
const fileFilter = (req, file, cb) => { // Проверка на корректность формата
	if (typesImages.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}

module.exports = multer({
	storage,
	fileFilter
})
