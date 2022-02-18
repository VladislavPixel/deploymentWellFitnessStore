import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

const MenuNav = ({ config }) => {
	return (
		<nav className={config.classesNav}>
			<ul className={config.classesList}>
				{config.data.map((item, index) => (
					<li key={index}>
						<Link to={item.path} className={config.classesLink}>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

MenuNav.propTypes = {
	config: PropTypes.object
}

export default MenuNav
