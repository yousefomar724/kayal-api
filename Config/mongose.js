const mongoose = require("mongoose");
mongoose.connect('mongodb://0.0.0.0:27017/kayalalshbab').then((x)=>
{
    console.log("connection is open");
});