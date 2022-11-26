const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { versionKey: false}
);

module.exports = mongoose.model("AdminCollection", AdminSchema);