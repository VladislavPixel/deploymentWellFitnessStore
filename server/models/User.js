const { Schema, model } = require("mongoose")

const schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	keyPhrase: {
		type: String,
		required: true
	},
	numberOfPurchases: Number,
	login: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	privacyPolicy: {
		type: Boolean,
		required: true
	},
	sex: {
		type: String,
		required: true,
		enum: ["famele", "male", "other"]
	},
	surName: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
}, {
	timestamps: true
})

module.exports = model("User", schema)
