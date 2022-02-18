import React from "react"
import PropTypes from "prop-types"

const BrandHeadBlock = ({
	brandSite,
	imagesPath,
	message,
	brandLogo,
	link,
	prefix
}) => {
	return (
		<div className="brand__head-row head-brand">
			<div className="head-brand__column">
				<div className="head-brand__block">
					<img src={`/img/brands/${brandLogo}`} alt="Логотип Бренда" />
					<h2 className="head-brand__title">{message}</h2>
					<a
						href={link}
						rel="noreferrer"
						target="_blank"
						className="head-brand__link"
					>
						{brandSite}
					</a>
				</div>
			</div>
			<div className="head-brand__column">
				<div className="head-brand__images">
					<img src={prefix + imagesPath} alt="Спорт" />
				</div>
			</div>
		</div>
	)
}

BrandHeadBlock.propTypes = {
	brandSite: PropTypes.string,
	imagesPath: PropTypes.string,
	message: PropTypes.string,
	brandLogo: PropTypes.string,
	link: PropTypes.string,
	prefix: PropTypes.string
}

export default BrandHeadBlock
