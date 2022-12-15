const express = require('express');
const app = express();
const port= process.env.port||4000;
const cors = require('cors');
const adminRoute = require("./Api/Routes/Auth");
const menuRoute = require("./Api/Routes/Menu");
const controlboardRoute = require("./Api/Routes/ControlBoard");
const mongo = require("./Config/mongose");
/////////////////////////////////////////////
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use('/image',express.static('./image'));
//////////////////////////////////////////////
app.use('/admin',adminRoute);
app.use('/menu',menuRoute);
app.use('/controlboard',controlboardRoute);
//////////////////////////////////////////////
app.listen(port,function(){console.log("I'm listening!")});
////////////////
module.exports = app;