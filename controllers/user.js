const USER = require("../models/User")
const bcrypt = require('bcryptjs')

const register = async(req, res) => {
    try {
        const user = await USER.create({...req.body })
        res.status(201).json({ user: { name: user.name, email: user.email } })

    } catch (error) {
        console.log(error.message)
    }
}
const login = async(req, res) => {
    try {
        const { password, email } = req.body
        if (!password || !email) {
            res.status(404).json({ error: `wrong email or password!!` })
        }
        const user = await USER.findOne({ email })
        if (!user) {
            res.status(404).json({ error: `there is no user by name` })
        }
        const isTrue = await user.comparePassword(password)
        if (!isTrue) {
            res.status(404).json({ error: `wrong password, try again..` })
        }
        res.status(200).json({ user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
    }
}



module.exports = { register, login }