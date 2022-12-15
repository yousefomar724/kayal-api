const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://abdelrahman:mVOSes850ZJFl95R@cluster0.kpcj9of.mongodb.net/?retryWrites=true&w=majority').then((x)=>
{
    console.log("connection is open");
});