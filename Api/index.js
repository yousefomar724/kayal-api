const express = require('express');
const app = express();
const port= process.env.port||8000;
const cors = require('cors');
const adminRoute = require("./Api/Routes/Auth");
const storeRoute = require("./Api/Routes/Store");
const mongo = require("./Config/mongose");
//////////////////////////////////////
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/image',express.static('./image'));
/////////////////////////////////////
app.use('/admin',adminRoute);
app.use('/store',storeRoute);
//////////////////////////////////////////////
app.listen(port,function(){console.log("I'm listening!")});
////////////////
module.exports = app;