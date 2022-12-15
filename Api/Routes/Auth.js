const express = require("express");
const router = express.Router();
const Admin = require("../Models/Admin");
const crypto = require("crypto");
/////////////////////////////////////////////
router.post("/SignUp",async (req,res) =>{
    try{
        let cipher = crypto.createCipher("aes-256-ctr", req.body.password);
        let crypted = cipher.update(req.body.password, "utf-8", "hex");
            crypted += cipher.final("hex");
        req.body.password = crypted;
        await Admin.create(req.body, function (err, data) {
            if (err) {
                if (err.keyPattern["email"] == 1) {
                res.send({ massge: "This email is already exist" });
                }
            } else {
                res.send({ success: true , Data : data })
            }
        });
    }catch (err){
        res.send(err)
    }
});
//////////////////////////////////////////
router.post("/SignIn", async (req, res) => {
    try {
        let decipher = crypto.createDecipher("aes-256-ctr", req.body.password);
        let decrypted = decipher.update(req.body.password, "utf-8", "hex");
        decrypted += decipher.final("hex");
        req.body.password = decrypted;
        let result = await Admin.findOne({
            $and: [{ email: req.body.email }, { password: req.body.password }],
        });
        if (result) {
            res.send({ Data: result, success: true });
        }else {
            res.send({ message: "not found this admin", success: false });
            }
        } catch (err) {
        res.send("yyyyyy");
        }
    });
/////////////////////////////////
module.exports = router;