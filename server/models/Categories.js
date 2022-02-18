const { Schema, model } = require("mongoose")

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	position: {
		type: Number,
		required: true
	},
	customId: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("Categories", schema)
