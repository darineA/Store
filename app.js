require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 7000;

const routerProducts = require("./routes/product");
const routerUsers = require("./routes/user");
const connectDB = require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

app.get("/", (req, res) => {
    res.send(`<h1>STORE ,,,</h1>`)
});

app.use("/api/products", routerProducts);
app.use("/api/user", routerUsers);

const run = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`running on port: ${port}`)
        });
    } catch (error) {
        console.log(error.message)
    }
};

run()