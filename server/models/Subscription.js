const { Schema, model } = require("mongoose")

const schema = new Schema({
	email: {
		type: String,
		required: true
	},
	images: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("Subscription", schema)
