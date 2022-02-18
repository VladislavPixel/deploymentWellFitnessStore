import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Spinner from "../common/spinner"
import { useSelector, useDispatch } from "react-redux"
import {
	fatchAllCategoryData,
	getStatusLoaderCategory,
	getCategoryData
} from "../../store/category"

const SidebarCatalog = ({
	stateCatalog,
	onSelectedCategory,
	selectedCategory
}) => {
	const dispatch = useDispatch()
	let classesCatalog = "sidebar-catalog"
	const isLoading = useSelector(getStatusLoaderCategory())
	const category = useSelector(getCategoryData())
	useEffect(() => {
		if (isLoading) {
			dispatch(fatchAllCategoryData())
		}
	}, [dispatch, isLoading])
	return (
		<aside className={(classesCatalog += stateCatalog ? " active" : "")}>
			<div className="sidebar-catalog__content">
				<nav className="sidebar-catalog__menu menu-sidebar-catalog">
					{!isLoading ? (
						<ul className="menu-sidebar-catalog__list">
							{Object.keys(category).map((key) => {
								return (
									<li key={category[key]._id}>
										<a
											onClick={(event) => {
												event.preventDefault()
												onSelectedCategory(category[key])
											}}
											href="/"
											className={
												"menu-sidebar-catalog__link" +
												(selectedCategory?._id === category[key]._id
													? " active"
													: "")
											}
										>
											{category[key].name}
										</a>
									</li>
								)
							})}
						</ul>
					) : (
						<Spinner />
					)}
				</nav>
			</div>
			<div className="sidebar-catalog__footer"></div>
		</aside>
	)
}

SidebarCatalog.propTypes = {
	stateCatalog: PropTypes.bool,
	onSelectedCategory: PropTypes.func,
	selectedCategory: PropTypes.object
}

export default SidebarCatalog
