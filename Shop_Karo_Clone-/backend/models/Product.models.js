const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, required: true},
    catagory: {type: String, required: true},
    rating: {type: Number, required: true}
});
const ProductModule =mongoose.model("product", movieSchema);

module.exports = {
    ProductModule
}