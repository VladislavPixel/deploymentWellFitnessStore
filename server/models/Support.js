const { Schema, model } = require("mongoose")

const schema = new Schema({
	email: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("Support", schema)
