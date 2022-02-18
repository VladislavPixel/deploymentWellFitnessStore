function sortData(data, config) {
	if (data.length > 1) {
		const isObject = (typeof data[0][config.path] === "object" && true) || false
		switch (config.order) {
		case "asc":
			data.sort(function (a, b) {
				if (
					((isObject && a[config.path].name) || a[config.path]) <
					((isObject && b[config.path].name) || b[config.path])
				) {
					return -1
				}
				if (
					((isObject && a[config.path].name) || a[config.path]) >
					((isObject && b[config.path].name) || b[config.path])
				) {
					return 1
				}
				return 0
			})
			break
		case "desc":
			data.sort(function (a, b) {
				if (
					((isObject && a[config.path].name) || a[config.path]) >
					((isObject && b[config.path].name) || b[config.path])
				) {
					return -1
				}
				if (
					((isObject && a[config.path].name) || a[config.path]) <
					((isObject && b[config.path].name) || b[config.path])
				) {
					return 1
				}
				return 0
			})
			break
		default:
			break
		}
	}
}

export default sortData
