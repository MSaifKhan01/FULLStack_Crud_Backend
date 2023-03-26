
const express = require('express');
const jwt = require('jsonwebtoken');
const { userModel } = require('../Models/user.model');
const bcrypt = require("bcrypt")
const userRouter = express.Router()

userRouter.get("/homepage", async (req, res) => {

    res.status(200).send({ "msg": "HOME Page" })
})

userRouter.post("/register", async (req, res) => {
    const { name, email, password, location, age } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new userModel({ name, email, password: hash, location, age })
            await user.save()
            res.status(200).send({ "msg": "registration done succesfully" })
        })

    } catch (err) {
        res.status(400).send({ "msg": "registration failed" })
    }

})
userRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        const user = await userModel.findOne({email})
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "login succesfully", "token": jwt.sign({ "userID":user._id }, "jammi", { expiresIn: '3h' }) })
                } else {
                    res.status(400).send({ "msg": "login failed" })
                }
            })

        }

    } catch (err) {
        res.status(400).send({ "msg": err.massage })
    }

})

// userRouter.get("/products", async (req, res) => {
//     let token = req.headers.authorization
//     // .split(" ")[1] for converting in array
//     try {
//         let data = await userModel.find()
//         jwt.verify(token, 'jammi', (err, decoded) => {

//             decoded ? res.status(200).send(data) : res.status(400).send({ "msg": "products not getting" })
//         });
//     } catch (error) {
//         res.send({ "error": "some error occured while updating" })
//         console.log(error)
//     }
// })

module.exports = { userRouter }