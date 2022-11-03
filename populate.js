require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/Product");
const addProducts = require("./PRODUCTS.json")
const run = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(addProducts);
        console.log("sucsess")
        process.exit(0);
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}
run()