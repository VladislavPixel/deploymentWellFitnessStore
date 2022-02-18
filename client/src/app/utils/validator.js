function validator(data, config) {
	const errors = {}
	function validation(value, method, objectMethod) {
		let statusValidate
		switch (method) {
		case "countElements":
			statusValidate = (value.length === 0 && true) || false
			break
		case "isRequired":
			if (typeof value === "boolean") {
				statusValidate = !value
			} else if (typeof value === "number") {
				statusValidate = !value
			} else {
				statusValidate = value.trim() === ""
			}
			break
		case "isEmail":
			statusValidate = !(/^\S+@\S+\.\S+$/g.test(value))
			break
		case "num":
			statusValidate = !(/\d+/g.test(value))
			break
		case "upperEl":
			statusValidate = !(/[A-Z]+/g.test(value))
			break
		case "specialCharacter":
			statusValidate = !(/(?=.*[!@#$%&^*?])/g.test(value))
			break
		case "minElements":
			statusValidate = value.trim().length < objectMethod.value
			break
		case "isImageFormat":
			statusValidate = !(/\.(png|svg|jpe?g)$/g.test(value))
			break
		case "isPhone":
			statusValidate = !(/^8\d+$/g.test(value))
			break
		case "specificAmountElements":
			statusValidate =
				value.trim().length > objectMethod.score ||
				value.trim().length < objectMethod.score
			break
		case "isNumber":
			statusValidate = !(/^\d+$/g.test(value))
			break
		case "moreZiro":
			statusValidate = !(/^[1-9][0-9]*$/g.test(value))
			break
		default:
			break
		}
		if (statusValidate) return objectMethod.message
	}
	for (const textField in data) {
		for (const methodValidate in config[textField]) {
			const error = validation(
				data[textField],
				methodValidate,
				config[textField][methodValidate]
			)
			if (error && !errors[textField]) {
				errors[textField] = error
			}
		}
	}
	return errors
}

export default validator
