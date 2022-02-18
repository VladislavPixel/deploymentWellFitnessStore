const { Schema, model } = require("mongoose")

const schema = new Schema({
	imagesPath: {
		type: String,
		required: true
	},
	categoryHead: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	categorySubject: String,
	additionalPage: Schema.Types.Mixed
}, {
	timestamps: true
})

module.exports = model("Brands", schema)
