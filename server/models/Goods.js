const { Schema, model } = require("mongoose")

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	},
	imagesPath: {
		type: String,
		required: true
	},
	totalInStock: {
		type: Number,
		required: true
	},
	pathServerImage: String
}, {
	timestamps: true
})

module.exports = model("Goods", schema)
