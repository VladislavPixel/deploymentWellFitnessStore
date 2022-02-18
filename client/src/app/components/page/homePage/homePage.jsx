import React, { useState } from "react"
import Header from "../../ui/header"
import SidebarCatalog from "../../ui/sidebarCatalog"
import GroupBodyGoods from "../../ui/groupBodyGoods"
import Footer from "../../ui/footer"

const HomePage = () => {
	const [stateButtonCatalog, setStateButtonCatalog] = useState(false) // State BUTTON Catalog
	const [selectedCategory, setSelectedCategory] = useState(null) // Selected Category
	const [searchInput, setSearchInput] = useState(null) // State Search

	const [sortedState, setSortedState] = useState({
		path: "price",
		order: "asc"
	}) // State Sort
	const handlerUpdateSorted = (order, path) => {
		if (order === "asc") {
			setSortedState({ path: path, order: "desc" })
		} else if (order === "desc") {
			setSortedState({ path: path, order: "asc" })
		}
	}
	const handlerChangeSearch = (data) => {
		setSearchInput(data.value)
		setSelectedCategory(null)
	}
	const handlerUpdateStateCatalog = () => {
		if (stateButtonCatalog) {
			setStateButtonCatalog(false)
		} else {
			setStateButtonCatalog(true)
		}
	}
	const handlerSelectedCategory = (categoryObject) => {
		setSelectedCategory(categoryObject)
		setSearchInput(null)
	}
	return (
		<React.Fragment>
			<Header
				onUpdateCatalog={handlerUpdateStateCatalog}
				onChange={handlerChangeSearch}
			/>
			<div className="container-page">
				<React.Fragment>
					<SidebarCatalog
						selectedCategory={selectedCategory}
						onSelectedCategory={handlerSelectedCategory}
						stateCatalog={stateButtonCatalog}
					/>
					<GroupBodyGoods
						sortedState={sortedState}
						selectedFilter={selectedCategory}
						searchInput={searchInput}
						onUpdateSorted={handlerUpdateSorted}
					/>
				</React.Fragment>
			</div>
			<Footer />
		</React.Fragment>
	)
}

export default HomePage
