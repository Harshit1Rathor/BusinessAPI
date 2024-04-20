const { query } = require("express");
const Product = require("../DB/models/product");

const getAllProducts = async(req, res) => {

    const {company, name, featured, sort, select, quantity} = req.query;
    const queryObject = {};

    if(company){
        queryObject.company = company;
        console.log(queryObject);
    }
    if(quantity){
        queryObject.quantity = quantity;
        console.log(queryObject);
    }
    if(featured){
        queryObject.featured = featured;
    }
    if(name){
        queryObject.name = {$regex: name, $options: "i"};
    }
    let apiData = Product.find(queryObject);
    if(sort){
        let sortFix = sort.replace(","," ");
        apiData = apiData.sort(sortFix);
    }
    if(select){
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 4;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);


    const myData = await apiData;    
    res.status(200).json({myData, nbHits: myData.length});
};
const getAllProductsTesting = async(req, res) => {
    res.status(200).json({msg: "Get all Products For testing"});
};

module.exports = {getAllProducts, getAllProductsTesting};