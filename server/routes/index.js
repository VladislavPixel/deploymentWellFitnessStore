const express = require("express")
const router = express.Router({ mergeParams: true })

router.use("/auth", require("./auth.routes"))
router.use("/brand", require("./brands.routes"))
router.use("/brandCategory", require("./brandsCategory.routes"))
router.use("/brandSubject", require("./brandsSubject.routes"))
router.use("/car", require("./car.routes"))
router.use("/category", require("./category.routes"))
router.use("/good", require("./goods.routes"))
router.use("/good/upload", require("./good.upload.routes"))
router.use("/purchaseBox", require("./purchaseBox.routes"))
router.use("/subscription", require("./subscription.routes"))
router.use("/support", require("./support.routes"))
router.use("/user", require("./user.routes"))

module.exports = router
