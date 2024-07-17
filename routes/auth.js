const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { loginUser, registerUser, authMiddleware } = require("../controller/auth")

// Register a New User
router.post('/register', registerUser)

// Login User
router.post('/login', loginUser)


// Protected route Example
router.get('/admin', authMiddleware('admin'), (req, res) => {
    res.send('Admin Content')
})


module.exports = router