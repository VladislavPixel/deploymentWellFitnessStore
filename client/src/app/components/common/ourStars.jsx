import React, { useEffect } from "react"
import PropTypes from "prop-types"
import initializationStarsBlock from "../../utils/starsBlock"

const OurStars = ({ prePath, data, title }) => {
	useEffect(() => {
		initializationStarsBlock()
	}, [])
	return (
		<div className="our-stars">
			{title && <h2 className="chief-sub-title our-stars__title">{title}</h2>}
			<div className="our-stars__container">
				{data.map((item, index) => {
					return (
						<div key={index} className="our-stars__column">
							<img src={`${prePath}${item.path}`} alt={item.title} />
							<div className="our-stars__text">{item.title}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

OurStars.propTypes = {
	prePath: PropTypes.string,
	data: PropTypes.array,
	title: PropTypes.string
}

export default OurStars
