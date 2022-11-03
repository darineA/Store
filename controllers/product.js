const PRODUCT = require("../models/Product")

const getAllProducts = async(req, res) => {
    try {
        const { name, brand, fields, sort, numeric } = req.query
        const queryObject = {}
        if (name) {
            queryObject.name = { $regex: name, $options: "i" }
        }
        if (brand) {
            queryObject.brand = { $regex: brand, $options: "i" }
        }
        if (numeric) {
            const operatorSymbol = {
                ">": "$gt",
                ">=": "$gte",
                "=": "$eq",
                "<": "$lt",
                "<=": "$lte",
            }
            const regExx = /\b(>|>=|<|<=|=)\b/g;
            let filter = numeric.replace(regExx, (symbol) => `-${operatorSymbol[symbol]}-`);
            const options = ["price", "rate"];
            const [field, operator, value] = filter.split(",").forEach((item) => {
                item.split("-")
            });
            if (options.includes(field)) {
                queryObject[field] = {
                    [operator]: Number(value)
                }
            }
        }


        let result = PRODUCT.find(queryObject)

        if (fields) {
            const fieldList = fields.split(",").join()
            result = result.select(fieldList)

        }
        if (sort) {
            const sortList = sort.split(",").join()
            result = result.sort(sortList)
        } else {
            result = result.sort("name")
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit)


        const products = await result
        res.status(201).json({ products })

    } catch (error) {
        console.log(error.message)
    }
}


const getOne = async(req, res) => {
    try {
        const { params: { id: productId } } = req;
        const product = await PRODUCT.findOne({ _id: productId })
        console.log(req.params, product)
        res.status(200).json({ product })
    } catch (error) {
        console.log(error.message)
    }
}



module.exports = { getAllProducts, getOne }