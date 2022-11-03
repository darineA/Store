const mongoose = require("mongoose")
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    info: {
        type: String,
        maxLength: 50,
        required: true,
    },
})



module.exports = mongoose.model("PRODUCT", ProductSchema)