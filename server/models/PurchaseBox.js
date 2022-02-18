const { Schema, model } = require("mongoose")

const schema = new Schema({
	carState: [
		// {
		// type: Schema.Types.ObjectId,
		// ref: "Car",
		// required: true
		// }
		Schema.Types.Mixed
	],
	guarantee: [{ name: String, warrantyPrice: Number, years: Number }],
	stateDelivery: {
		city: {
			type: String,
			required: true
		},
		date: {
			type: String,
			required: true
		},
		home: {
			type: String,
			required: true
		},
		housing: {
			type: String,
			required: true
		},
		phone: {
			type: String,
			required: true
		},
		road: {
			type: String,
			required: true
		},
		room: {
			type: String,
			required: true
		},
		time: {
			type: String,
			required: true
		},
	}
}, {
	timestamps: true
})

module.exports = model("PurchaseBox", schema)
