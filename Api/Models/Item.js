const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    categoryId:{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true,
        },
    title: {
        type: String,
        required: true,
        },
    price: {
        type: String,
        required: true,
        },
    image:{
        type:String,
        required: true,
        },
    description: {
        type: String,
        default:"",
        },
    calories:{
        type: Number,
        default:"",
        },
    status:{
        type: String,
        required: true,
        default:"active",
    }
    },
    { versionKey: false}
);

module.exports = mongoose.model("ItemCollection", ItemSchema);