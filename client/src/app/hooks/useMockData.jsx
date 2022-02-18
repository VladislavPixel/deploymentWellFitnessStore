import { useState, useEffect } from "react"
import httpService from "../services/http.service"
import categories from "../mockData/categories.json"
import goods from "../mockData/goods.json"
import brandsCategories from "../mockData/brandsCategories.json"
import brands from "../mockData/brands.json"
import brandsSubjectCategories from "../mockData/brandsSubjectCategories.json"

const useMockData = () => {
	const statusObject = {
		noStart: "Didn't start",
		inProcess: "Pending",
		success: "Success",
		error: "Error process"
	}
	const [process, setProcess] = useState(0)
	const [status, setStatus] = useState(statusObject.noStart)
	const [count, setCount] = useState(0)
	const [error, setError] = useState(null)
	const maxNumberCount =
		categories.length +
		goods.length +
		brandsCategories.length +
		brands.length +
		brandsSubjectCategories.length
	const updateCount = () => {
		setCount((prevState) => prevState + 1)
	}
	async function initialization() {
		try {
			for (const category of categories) {
				await httpService.put(`category/${category._id}`, category)
				updateCount()
			}
			for (const good of goods) {
				await httpService.put(`good/${good._id}`, good)
				updateCount()
			}
			for (const brandCategory of brandsCategories) {
				await httpService.put(
					`brandCategory/${brandCategory._id}`,
					brandCategory
				)
				updateCount()
			}
			for (const brand of brands) {
				await httpService.put(`brand/${brand._id}`, brand)
				updateCount()
			}
			for (const brandsSubject of brandsSubjectCategories) {
				await httpService.put(
					`brandSubject/${brandsSubject._id}`,
					brandsSubject
				)
				updateCount()
			}
		} catch (error) {
			const { message } = error
			setError(message)
			setStatus(statusObject.error)
		}
	}
	useEffect(() => {
		const handlerUpdateProcessDownloads = () => {
			if (count !== 0 && status === "Didn't start") {
				setStatus(() => statusObject.inProcess)
			}
			const newProcess = Math.floor((count / maxNumberCount) * 100)
			if (process < newProcess) {
				setProcess(() => newProcess)
			}
			if (count === maxNumberCount) {
				setStatus(() => statusObject.success)
			}
		}
		handlerUpdateProcessDownloads()
	}, [
		count,
		maxNumberCount,
		process,
		status,
		statusObject.success,
		statusObject.inProcess
	])
	return { initialization, error, status, process }
}

export default useMockData
