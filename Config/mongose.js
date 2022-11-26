const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://abdelrahman:qL2k1kv3ZFcc3u0D@cluster0.kpcj9of.mongodb.net/?retryWrites=true&w=majority').then((x)=>
{
    console.log("connection is open");
});