const catalogCategories = {
	all: { _id: "42q", name: "Все товары ///" },
	forHome: { _id: "42w", name: "Для дома" },
	fitnessAndEquipment: { _id: "42e", name: "Тренажеры и фитнес" },
	run: { _id: "42r", name: "Бег" },
	swimmingBeachWaterSports: {
		_id: "42t",
		name: "Плавание, пляж, водный спорт"
	},
	tourismActiveRest: { _id: "42y", name: "Туризм, активный отдых" },
	singleCombats: { _id: "42u", name: "Единоборства" }
}

export { catalogCategories }

export default function getCategory() {
	return new Promise((resolve) => {
		window.setTimeout(() => {
			resolve(catalogCategories)
		}, 3000)
	})
}
