const express = require("express")
const router = express.Router()
const { getAllProducts, getOne } = require("../controllers/product")


router.route("/").get(getAllProducts)
router.route("/:id").get(getOne)

module.exports = router