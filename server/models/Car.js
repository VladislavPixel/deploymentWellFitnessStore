const { Schema, model } = require("mongoose")

const schema = new Schema({
	category: {
		type: String,
		required: true
	},
	count: {
		type: Number,
		required: true
	},
	currentUser: {
		type: String,
		required: true
	},
	pathServerImage: String,
	description: {
		type: String,
		required: true
	},
	imagesPath: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	totalInStock: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("Car", schema)
