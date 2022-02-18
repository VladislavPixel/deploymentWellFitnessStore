const chalk = require("chalk")
const brands = require("../mock/brands.json")
const brandsCategories = require("../mock/brandsCategories.json")
const brandsSubjectCategories = require("../mock/brandsSubjectCategories.json")
const categories = require("../mock/categories.json")
const goods = require("../mock/goods.json")
const Goods = require("../models/Goods")
const Categories = require("../models/Categories")
const BrandsSubjectCategories = require("../models/BrandsSubjectCategories")
const BrandsCategories = require("../models/brandsCategories")
const Brands = require("../models/Brands")

module.exports = async function () {
	try {
		const goodsList = await Goods.find()
		if (goodsList.length < goods.length) {
			await createInitialEntity(Goods, goods)
		}
		const categoriesList = await Categories.find()
		if (categoriesList.length !== categories.length) {
			await createInitialEntity(Categories, categories)
		}
		const brandsSubjectCategoriesList = await BrandsSubjectCategories.find()
		if (brandsSubjectCategoriesList.length !== brandsSubjectCategories.length) {
			await createInitialEntity(BrandsSubjectCategories, brandsSubjectCategories)
		}
		const brandsCategoriesList = await BrandsCategories.find()
		if (brandsCategoriesList.length !== brandsCategories.length) {
			await createInitialEntity(BrandsCategories, brandsCategories)
		}
		const brandsList = await Brands.find()
		if (brandsList.length !== brands.length) {
			await createInitialEntity(Brands, brands)
		}
	} catch (err) {
		console.log(chalk.red.inverse("Ошибка с инициализацией данных."))
	}
}

async function createInitialEntity(Model, data) {
	await Model.collection.drop()
	return Promise.all(
		data.map(async (item) => {
			try {
				delete item._id
				const newItemModel = new Model(item)
				await newItemModel.save()
				return newItemModel
			} catch (err) {
				return err
			}
		})
	)
}