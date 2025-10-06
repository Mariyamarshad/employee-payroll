const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: String,
    role: {
        type: String,
        enum: ["user" ,"admin"],
        default: "user",
    }
},
{
    timestamps: true,
})

const User= mongoose.model("User", userSchema);
module.exports = User;