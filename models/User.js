const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true,
        unique: true
    }
})

User.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 10)
})

User.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

module.exports = mongoose.model("USER", User)