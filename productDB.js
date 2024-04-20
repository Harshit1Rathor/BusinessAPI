require("dotenv").config();
const connectDB = require("./DB/connect");
const Product = require("./DB/models/product");
const ProductJson = require("./products.json");

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();
        await Product.create(ProductJson);
        console.log("success");
    } catch (error) {
        console.log(error);
    }
};

start();