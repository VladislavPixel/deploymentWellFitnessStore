import React from "react"
import PropTypes from "prop-types"

const BrandContent = ({ imagesPath, message, prefix }) => {
	return (
		<div className="brand__content content-brand">
			<div className="content-brand__column">
				<div className="content-brand__images">
					<img src={prefix + imagesPath} alt="Картинка оборудования в зале" />
				</div>
			</div>
			<div className="content-brand__column">
				<div className="content-brand__block">
					{message.map((element, index) => (
						<div key={index} className="content-brand__el">
							{element}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

BrandContent.propTypes = {
	imagesPath: PropTypes.string,
	message: PropTypes.array,
	prefix: PropTypes.string
}

export default BrandContent
